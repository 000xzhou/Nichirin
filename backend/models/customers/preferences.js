const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the preferences schema
const preferencesSchema = new Schema(
  {
    language: {
      type: String,
      default: "en",
    },
    marketingOptIn: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      default: "",
    },
  },
  { _id: false }
); // Use _id: false to prevent creating _id for each sub-document

module.exports = preferencesSchema;
