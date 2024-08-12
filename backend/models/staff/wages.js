// models/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the wage schema
const wagesSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: Number,
      required: true,
    },
    pay_type: {
      type: Number,
      required: true,
    },
    hourly_rate: {
      type: Object,
      required: true,
    },
    weekly_hours: {
      type: Object,
      required: true,
    },
    annual_rate: {
      type: Object,
      required: true,
    },
    is_overtime_exempt: {
      type: Number,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    updated_at: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

// Create and export the model
const Wages = mongoose.model("Wages", wagesSchema);
module.exports = Wages;
