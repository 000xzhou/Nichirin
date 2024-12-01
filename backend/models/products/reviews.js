const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId, // This will store the ObjectID of the Product document
      ref: "products",
      required: true,
      immutable: true,
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId, // This will store the ObjectID of the Customer document
      ref: "customers",
      required: true,
      immutable: true,
    },
    reviewText: {
      type: String,
      required: true,
      trim: true, // Removes any unnecessary white space
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating of 1
      max: 5, // Maximum rating of 5
    },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Export the model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
