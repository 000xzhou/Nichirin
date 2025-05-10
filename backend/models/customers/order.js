// models/Order.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the customer schema
const orderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    sessionId: String,
    image: String,
    name: String,
    quantity: Number,
    shipping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    items: [
      {
        itemId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: { type: String, default: "pending" }, // pending, completed, failed
    emailSent: { type: Boolean, default: false },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
// Create and export the model
