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
    sessionId: String, // from stripe
    shipping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "returned"],
      default: "pending",
    },
    totalAmount: Number,
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
// Create and export the model
