// models/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the break schema
const breakSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    wages_id: {
      type: Schema.Types.ObjectId,
      ref: "Wages",
      required: true,
    },
    shift_id: {
      type: Schema.Types.ObjectId,
      ref: "Break",
      required: true,
    },
    break_name: {
      type: String,
      required: true,
    },
    is_paid: {
      type: String,
      required: true,
    },
    expected_duration: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    start_at: {
      type: String,
      required: true,
    },
    end_at: {
      type: String,
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
const Break = mongoose.model("Break", breakSchema);
module.exports = Break;
