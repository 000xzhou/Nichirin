const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the address schema
const addressSchema = new Schema({
  // in subdocuments, you have to explicitly define an _id if you want to reference it elsewhere.
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
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
});

module.exports = addressSchema;
