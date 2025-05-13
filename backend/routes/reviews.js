// routes/products.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products/products");
const Reviews = require("../models/products/reviews");
const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
  ensureAuthenticated,
} = require("../middleware/auth");

/**
 * GET /reviews/12345/all
 * GET /reviews/12345/all?limit=4
 */
router.get("/:product_id/all", async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const limit = parseInt(req.query.limit) || 0;

    const reviews = await Reviews.find({ productID: product_id })
      .sort({ updatedAt: -1 })
      .limit(limit);

    res.status(200).send({ reviews });
  } catch (err) {
    console.error("Error occurred:", {
      name: err.name, // Type of the error
      message: err.message, // General message about the error
      code: err.code, // MongoDB error code if available
      path: err.path, // Path to the field that caused the error
      value: err.value, // The value that caused the error
    });
    res.status(500).json({ error: err.message });
  }
});

// Create new review
/** input: {
 *  title,
    post,
    productID, 
    customerID }
 */
router.post("/create", ensureAuthenticated, async (req, res) => {
  try {
    const newReview = new Reviews(req.body);
    await newReview.save();

    let productRatingUpdate = null;
    // update overall rating
    const product = await Product.findById(req.body.productID);
    if (!product) {
      return res.status(404).json({ error: "No product found" });
    }

    if (!product.overallRating) {
      // add rating if no rating
      productRatingUpdate = await Product.findByIdAndUpdate(
        req.body.productID,
        {
          overallRating: req.body.rating,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      // update new medium rating
      const newRating = (product.overallRating + req.body.rating) / 2;
      productRatingUpdate = await Product.findByIdAndUpdate(
        req.body.productID,
        {
          overallRating: newRating,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(201).json({ newReview, updatedProduct: productRatingUpdate });
  } catch (err) {
    console.error("Error occurred:", {
      name: err.name, // Type of the error
      message: err.message, // General message about the error
      code: err.code, // MongoDB error code if available
      path: err.path, // Path to the field that caused the error
      value: err.value, // The value that caused the error
    });
    res.status(500).json({ error: err.message });
  }
});

// Update a review by id
// id : customer id
// review id : review id
router.patch("/:id/:review_id", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    const id = req.params.review_id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { reviewText, rating } = req.body;
    const updatedReview = await Reviews.findByIdAndUpdate(
      id,
      { reviewText, rating },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: `User id ${id} not found` });
    }

    res.status(200).send(updatedReview);
  } catch (err) {
    console.error("Error occurred:", {
      name: err.name, // Type of the error
      message: err.message, // General message about the error
      code: err.code, // MongoDB error code if available
      path: err.path, // Path to the field that caused the error
      value: err.value, // The value that caused the error
    });
    res.status(500).json({ error: err.message });
  }
});

// Delete a review by id
router.delete("/:id/:review_id", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    const id = req.params.review_id;
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(204).send(); // No content to send back
  } catch (err) {
    console.error("Error occurred:", {
      name: err.name, // Type of the error
      message: err.message, // General message about the error
      code: err.code, // MongoDB error code if available
      path: err.path, // Path to the field that caused the error
      value: err.value, // The value that caused the error
    });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
