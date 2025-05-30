// routes/checkout.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { BadRequestError } = require("../expressError");
const Customer = require("../models/customers/customers");
const Product = require("../models/products/products");
const Order = require("../models/customers/order");
require("dotenv").config();
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
require("dotenv").config();

const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
} = require("../middleware/auth");

/**
 * Finds checkout session by id
 */
router.get(
  "/:id/find/:sessionId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    try {
      const { id, sessionId } = req.params;

      const order = await Order.findOne({
        customerId: id,
        sessionId: sessionId,
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
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
 * Finds checkout order by id
 */
router.get(
  "/:id/findOrder/:orderId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    try {
      const { orderId } = req.params;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
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
 * get all orders
 * id = user id
 */
router.get("/:id/allorders", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    const { id } = req.params;

    const limit = parseInt(req.query.limit) || 0;

    const customer = await Order.find({
      customerId: id,
    })
      .sort({ created_at: -1 })
      .limit(limit)
      .populate("shipping");

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

/**
 * create checkout session
 */
router.post("/create", async (req, res) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const { cart, customerID, shipping, totalAmount } = req.body;
  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // Check if customer exist
  const customer = await Customer.findById(customerID);
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  // check if they got stripe id, if not create one and save to db
  if (!customer.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: customer.email,
      name: customer.first_name + " " + customer.last_name,
    });

    customer.stripeCustomerId = stripeCustomer.id;
    await customer.save();
  }

  // Build the line_items array by mapping over the items and prices arrays
  const lineItems = cart.map((item, index) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // 5000 = $50.00
      },
      quantity: item.quantity,
    };
  });

  // Create Checkout Session
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeCustomerId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      // customer_email: customer.email,
      success_url: `${process.env.FRONTEND}/customers/orders/order-confirmation?session_id=${CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND}/cart`,
    });

    // send email and save to user db
    if (session) {
      const transport = Nodemailer.createTransport(
        MailtrapTransport({
          token: process.env.MAILTRAP_API_TOKEN,
          testInboxId: 3449602,
        })
      );

      const sender = {
        address: "BusinessName@example.com",
        name: "Business Name",
      };
      const recipients = [customer.email];

      transport.sendMail({
        from: sender,
        to: recipients,
        subject: "Your Receipt - Thank You for Your Order!",
        html: `<h1>Order Confirmation</h1>
           <p>Thank you for your order!</p>
           <h2>Order Details:</h2>
           <ul>${cart
             .map(
               (item) =>
                 `<li a href="${process.env.FRONTEND}/product/${item.itemId}">${
                   item.name
                 } - ${formatPrice(item.price)} x ${item.quantity}</li>`
             )
             .join("")}</ul>
           <p><strong>Total Paid:</strong> ${formatPrice(totalAmount)}</p>`,
        category: "Integration Test",
        sandbox: true,
      });
    }
    // save to db
    const formattedCart = cart.map((item) => ({
      itemId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    //     const formattedCart = await Promise.all(
    //   cart.map(async (item) => {
    //     const product = await Product.findById(item.id);
    //     return {
    //       itemId: product._id,
    //       name: item.name,
    //       image: item.image,
    //       price: item.price,
    //       quantity: item.quantity,
    //     };
    //   })
    // );

    const newOrder = new Order({
      customerId: customer._id,
      sessionId: session.id,
      items: formattedCart,
      shipping: shipping,
      status: "pending",
      totalAmount: totalAmount,
    });
    await newOrder.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
