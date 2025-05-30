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
    // Fetch the original order
    const order = await Order.findById(req.body.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    // check order if it's not pending/ aka complete
    // if (order.status === "pending") {
    //   return res.status(409).json({ error: "Order is still pending" });
    // }

    // filter out the selected items
    const selectedItems = Object.entries(req.body.items)
      .filter(([_, item]) => item.selected && item.quantity > 0 && item.reason)
      .map(([productId, item]) => ({
        productId,
        quantity: item.quantity,
        reason: item.reason,
      }));

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

    // send email of refund details
    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_API_TOKEN,
        testInboxId: process.env.MAILTRAP_TEST_INBOX_ID,
      })
    );

    const sender = {
      address: "BusinessName@example.com",
      name: "Business Name",
    };
    const recipients = [email];

    // send email
    transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Your refund",
      html: `
     <div>
      <h2>Your Refund Details</h2>
      <p><strong>Order ID:</strong> ${body.orderId}</p>
      <h3>Refunded Items:</h3>
      <ul>
        ${body.items
          .map(
            (item) =>
              `<li><a href="${process.env.FRONTEND}/product/${item.itemId}">${
                item.name
              } - ${formatPrice(item.price)} x ${item.quantity}</a></li>`
          )
          .join("")}
      </ul>
    </div>
          `,
      category: "Integration Test",
      sandbox: true,
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

    // added stripe to refund if approved
    // edit order.status to refunded if approved
    // todo: stripe refund $$$ to user if approved

    // send email of refund if refund been approved or not
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
    const recipients = [email];

    transport.sendMail({
      from: sender,
      to: recipients,
      subject: `Your refund have been ${req.body.status}`,
      html: `
     <div>
      <h2>Your refund have been ${req.body.status}</h2>
      <p><strong>Order ID:</strong> ${body.orderId}</p>
      <h3>Refunded Items:</h3>
      <ul>
     list items here
      </ul>
    </div>
          `,
      category: "Integration Test",
      sandbox: true,
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
    const limit = parseInt(req.query.limit) || 0;

    const refunds = await Refund.find({
      customerId: req.params.customerId,
    })
      .sort({ requestedAt: -1 })
      .limit(limit)
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
 * GET search result base on query
 */
router.get("/findByQuery", ensureStaff, async (req, res) => {
  try {
    const { searchType, searchValue } = req.query;

    const queryField = searchType === "refundId" ? "_id" : searchType;

    // making sure no field that's not allow enter
    const allowedFields = ["refundId", "orderId", "customerId"];
    if (!allowedFields.includes(searchType)) {
      return res.status(400).json({ error: "Invalid search type" });
    }

    const refund = await Refund.find({ [queryField]: searchValue })
      .populate("customerId")
      .populate("orderId")
      .populate("items.productId")
      .populate("processedBy");

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
