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

const { ensureAdmin, ensureStaff, ensureUser } = require("../middleware/auth");

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
router.post("/create", ensureUser, async (req, res) => {
  try {
    // filter out the selected items
    const selectedItems = Object.entries(req.body.items)
      .filter(([_, item]) => item.selected && item.quantity > 0 && item.reason)
      .map(([productId, item]) => ({
        productId,
        quantity: item.quantity,
        reason: item.reason,
      }));

    // Fetch the original order
    const order = await Order.findById(req.body.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Calculate total refund amount
    let totalRefund = 0;

    for (const selectedItem of selectedItems) {
      let matchingItem = null;

      for (const orderItem of order.items) {
        if (orderItem.itemId.toString() === selectedItem.productId.toString()) {
          matchingItem = orderItem;
          break;
        }
      }

      if (matchingItem) {
        totalRefund += matchingItem.price * selectedItem.quantity;
      } else {
        return res.status(400).json({
          error: `Item ${selectedItem.productId} not found in order`,
        });
      }
    }

    const body = {
      customerId: req.body.customerId,
      orderId: req.body.orderId,
      items: selectedItems,
      amount: totalRefund,
    };
    const refund = new Refund(body);

    await refund.save();

    // todo: send email of refund details

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
 * find refund by id then edit it
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
   note: String,
 */
router.patch("/:refundId", ensureStaff, async (req, res) => {
  try {
    const { refundId } = req.params;
    const updateBody = {
      status: req.body.status,
      note: req.body.note,
      processedBy: req.body.processedBy,
      reviewedAt: new Date(),
    };

    const refund = await Refund.findByIdAndUpdate(refundId, updateBody);

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

// find refund by order id
router.get("/findByOrder/:orderId", ensureUser, async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid orderId" });
    }

    // const refunds = await Refund.find({ orderId }).populate("items.productId");
    const refunds = await Refund.find({ orderId });

    res.json(refunds);
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
 * GET /refund/getAll → all refunds
 * GET /refund/getAll?status=pending → only pending refunds
 */
router.get("/getAll", ensureUser, async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status) {
      // if status isn't one of those 3 options
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status filter" });
      }
      query.status = status;
    }

    // do I need all those items? Don't know but it don't hurt to have them all for now
    const refunds = await Refund.find(query)
      .populate("customerId")
      .populate("orderId")
      .populate("items.productId")
      .populate("processedBy");

    res.json(refunds);
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
 * GET all refund by customer
 */
router.get("/findByCustomer/:customerId", ensureUser, async (req, res) => {
  try {
    const refunds = await Refund.find({ customerId: req.params.customerId })
      .sort({ requestedAt: -1 })
      .populate("customerId")
      .populate("orderId")
      .populate("items.productId")
      .populate("processedBy");

    res.json(refunds);
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
