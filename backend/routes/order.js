// routes/checkout.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Customer = require("../models/customers/customers");
const Order = require("../models/customers/order");
require("dotenv").config();
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
} = require("../middleware/auth");

/**
 * Sends email after checkout successful
 */
router.get(
  "/:id/find/:sessionId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    try {
      const { id, sessionId } = req.params;

      // ! Need checking to make sure it works
      const order = await Order.findOne({
        customerId: id,
        sessionId: sessionId,
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // const order = customer.orders.find((ord) => ord.sessionId === sessionId);

      // check if mail been send before
      if (order.emailSent) {
        // check if mail been send before return early
        return res.json(order);
      }

      if (order) {
        // send mail
        const transport = Nodemailer.createTransport(
          MailtrapTransport({
            token: process.env.MAILTRAP_API_TOKEN,
            testInboxId: 3449602,
          })
        );

        const sender = {
          address: "hello@example.com",
          name: "Business Name",
        };
        const recipients = ["xzhou92@gmail.com"];

        transport.sendMail({
          from: sender,
          to: recipients,
          subject: "Your Receipt - Thank You for Your Order!",
          html: `<h1>Order Confirmation</h1>
           <p>Thank you for your order!</p>
           <h2>Order Details:</h2>
           <ul>${order.items
             .map(
               (item) =>
                 // ! I don't know why it still show as text instead of link at mailtrap
                 `<li a href="https://yourstore.com/product/${item.itemId}">${item.name} - $${item.price} x ${item.quantity}</li>`
             )
             .join("")}</ul>
           <p><strong>Total Paid:</strong> $${order.totalAmount.toFixed(
             2
           )}</p>`,
          category: "Integration Test",
          sandbox: true,
        });
        // .then(console.log, console.error);

        // update db
        order.emailSent = true;
        order.status = "completed";
        await customer.save();
      }

      res.json(order);
    } catch (err) {
      console.error("Error occurred:", {
        name: err.name, // Type of the error
        message: err.message, // General message about the error
        code: err.code, // MongoDB error code if available
        path: err.path, // Path to the field that caused the error
        value: err.value, // The value that caused the error
      });
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * Sends email after checkout successful
 */
router.get("/:id/allorders", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Order.findById({
      _id: id,
    });
    res.json(customer);
  } catch (err) {
    console.error("Error occurred:", {
      name: err.name, // Type of the error
      message: err.message, // General message about the error
      code: err.code, // MongoDB error code if available
      path: err.path, // Path to the field that caused the error
      value: err.value, // The value that caused the error
    });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
