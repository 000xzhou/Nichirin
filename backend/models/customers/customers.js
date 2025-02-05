// models/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = require("./address");
const preferencesSchema = require("./preferences");
const bcrypt = require("bcrypt");

// Define the customer schema
const customerSchema = new Schema(
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
        return this.isNew;
      },
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: addressSchema,
      required: false,
    },
    shipping: {
      type: addressSchema,
      required: false,
    },
    addresses: { type: [addressSchema], default: [] },
    default_address_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    birthday: {
      type: String,
      required: false,
    },
    preferences: {
      type: preferencesSchema,
      required: false,
    },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Hash password middleware
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

customerSchema.pre("findOneAndUpdate", async function (next) {
  let update = { ...this.getUpdate() };
  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 8);
    update.password = hashed;
    this.setUpdate(update);
  }
  next();
});

// Create and export the model
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
