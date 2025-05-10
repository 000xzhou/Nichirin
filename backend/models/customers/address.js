const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the address schema
const addressSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    phone: Number,
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
