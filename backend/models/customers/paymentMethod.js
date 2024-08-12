const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema(
  {
    type: { type: String, required: true }, // e.g., "credit card", "paypal"
    details: {
      cardNumber: { type: String, required: true }, // need encryption for storage
      cardHolderName: { type: String, required: true },
      expirationDate: { type: String, required: true },
      cvv: { type: String, required: true }, // need encryption for storage
    },
    billingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { _id: false }
); // Disable _id for subdocument if not necessary

module.exports = paymentMethodSchema;
