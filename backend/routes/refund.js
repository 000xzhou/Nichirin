// routes/checkout.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { BadRequestError } = require("../expressError");
const Customer = require("../models/customers/customers");
const Product = require("../models/products/products");
const Order = require("../models/customers/order");
const Refund = require("../models/customers/refund");
require("dotenv").config();
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
} = require("../middleware/auth");

/**
 * POST. create refund for order
 req.body need :
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      reason: String,
    },
  ],
    amount: {
    type: Number,
    required: true, 
  },
 */
router.post("/create", ensureStaff, async (req, res) => {
  try {
    const tempBody = {
      customerId: "customerId",
      orderId: "orderId",
      items: [],
      amount: 1,
    };
    const refund = new Refund(tempBody);
    await refund.save();

    res.json(refund);
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
   status: {
     type: String,
     enum: ["pending", "approved", "rejected"],
     default: "pending",
   },
   reviewedAt: Date,
   processedBy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Employee",
   },
   notes: String,
 */
router.patch("/refundId", ensureStaff, async (req, res) => {
  try {
    const { refundId } = req.params;

    const tempBody = {
      status: "approved",
      reviewedAt: Date.now,
      processedBy: "empoloyeeId",
      notes: "optional",
    };

    const refund = await Refund.findByIdAndUpdate({
      refundId,
      tempBody,
    });

    res.json(refund);
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
