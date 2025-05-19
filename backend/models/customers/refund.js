const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundSchema = new Schema({
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
    required: true, // total refund amount for the request
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
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
});

const Refund = mongoose.model("RefundRequest", refundSchema);
module.exports = Refund;
