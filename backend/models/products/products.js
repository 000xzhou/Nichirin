// models/products.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const variationSchema = require("./variation");
const descriptionSchema = require("./description");

// Define the product schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: function () {
        return this.isNew;
      },
      unique: true,
    },
    price: {
      type: Number,
      required: function () {
        return this.isNew;
      },
    },
    currency: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    stock: {
      type: Number,
      required: function () {
        return this.isNew;
      },
    },
    active: {
      type: Boolean,
      required: function () {
        return this.isNew;
      },
    },
    description: {
      type: descriptionSchema,
      required: function () {
        return this.isNew;
      },
    },
    variations: {
      type: [variationSchema],
      required: false,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: "Images should be an array of strings",
      },
    },
    tags: {
      type: [String],
      default: [],
      required: false,
    },

    overallRating: { type: Number, default: 0 },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Create and export the model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
