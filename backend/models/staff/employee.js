// models/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Define the employee schema
const employeeSchema = new Schema(
  {
    email: {
      type: String,
      required: function () {
        return this.isNew;
      },
      unique: true,
    },
    first_name: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    last_name: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    password: {
      type: String,
      required: function () {
        return this.isNew; // Only require a password when the document is new
      },
    },
    status: {
      type: String,
      required: function () {
        return this.isNew;
      }, //active / inactive
    },
    phone: {
      type: Number,
      required: function () {
        return this.isNew;
      },
    },
    role: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Hash password middleware
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

employeeSchema.pre("findOneAndUpdate", async function (next) {
  let update = { ...this.getUpdate() };
  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 8);
    update.password = hashed;
    this.setUpdate(update);
  }
  next();
});

// Create and export the model
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
