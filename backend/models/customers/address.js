const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the address schema
const addressSchema = new Schema(
  {
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
  { _id: false }
); // Use _id: false to prevent creating _id for each sub-document

module.exports = addressSchema;
