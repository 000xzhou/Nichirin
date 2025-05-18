const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundRequestSchema = new Schema({
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
  reason: {
    type: String,
    required: true,
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

const RefundRequest = mongoose.model("RefundRequest", refundRequestSchema);
module.exports = RefundRequest;
