// models/customers.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
      lowercase: true,
      trim: true,
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
    defaultAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    birthday: {
      type: String,
      required: false,
    },
    preferences: {
      type: preferencesSchema,
      required: false,
    },
    stripeCustomerId: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
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
