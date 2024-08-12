// models/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the shift schema
const shiftSchema = new Schema(
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
    break_id: {
      type: Schema.Types.ObjectId,
      ref: "Break",
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
const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;
