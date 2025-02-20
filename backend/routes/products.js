// routes/products.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products/products");
const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
} = require("../middleware/auth");

// Get all Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ products: products });
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

// Search Products
router.get("/search", async (req, res) => {
  try {
    const { name, price, stock } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (price) {
      query.price = price;
    }
    // if stock = 1+ (everything that is in stock) if stock = 0 (everything that's not in stock)
    if (stock) {
      if (stock == 0) {
        query.stock = 0;
      } else {
        query.stock = { $gt: 0 }; // Find products with stock > 0
      }
    }

    if (Object.keys(query).length) {
      const product = await Product.find(query);

      // Check if product are found
      if (product.length === 0) {
        return res
          .status(404)
          .json({ message: "No product found matching the criteria." });
      }
      res.status(200).json({ products: product });
    } else {
      // If no query parameters provided, handle accordingly
      res.status(400).json({
        message:
          "Please provide at least one search parameter (email, phone, or name).",
      });
    }
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

// Show all active Products
router.get("/active", async (req, res) => {
  try {
    // Find all products where status is 'active'
    const activeProduct = await Product.find({ active: true });

    // Check if any active products were found
    if (activeProduct.length === 0) {
      return res.status(404).json({ message: "No active products found." });
    }

    // Send the list of active products
    res.status(200).json({ products: activeProduct });
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

// Show all inactive Products
router.get("/inactive", ensureStaff, async (req, res) => {
  try {
    // Find all products where status is 'active'
    const inactiveProduct = await Product.find({ active: false });

    // Check if any active products were found
    if (inactiveProduct.length === 0) {
      return res.status(404).json({ message: "No inactive products found." });
    }

    // Send the list of active products
    res.status(200).json({ products: inactiveProduct });
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

// Create new product
router.post("/create", ensureStaff, async (req, res) => {
  try {
    req.body.currency = "usd";

    req.body.description.features = Array.isArray(req.body.description.features)
      ? req.body.description.features.flat()
      : [];

    req.body.description.measurements = Array.isArray(
      req.body.description.measurements
    )
      ? req.body.description.measurements.flat()
      : [];

    req.body.images = Array.isArray(req.body.images)
      ? req.body.images.flat()
      : [];

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
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

// Find a product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const product = await Product.findById(id);

    // product not found
    if (!product) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(200).send(product);
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

// Update a product by id
router.patch("/:id", ensureStaff, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(200).send(updatedProduct);
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

// add a product variations by id
router.patch("/:id/variation", ensureStaff, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const newVariation = req.body;
    // Update the product by adding a new variation
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $push: { variations: newVariation } },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(200).send(updatedProduct);
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

// edit a product variations by id and product color
router.patch("/:id/variation/:color", ensureStaff, async (req, res) => {
  try {
    const id = req.params.id;
    const variationColor = req.params.color;
    const updatedVariation = req.body; // The fields to update

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    // Find the variation by color
    const variation = product.variations.find(
      (v) => v.color === variationColor
    );
    if (!variation) {
      return res
        .status(404)
        .json({ message: `Variation with color ${variationColor} not found` });
    }

    // Update the fields of the variation
    for (let key in updatedVariation) {
      variation[key] = updatedVariation[key];
    }

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).send(updatedProduct);
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

// delete a product variations by id and variation color
router.delete("/:id/variation/:color", ensureStaff, async (req, res) => {
  try {
    const productId = req.params.id;
    const variationColor = req.params.color;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product id ${productId} not found` });
    }

    // Find the index of the variation to be deleted
    const variationIndex = product.variations.findIndex(
      (v) => v.color === variationColor
    );
    if (variationIndex === -1) {
      return res
        .status(404)
        .json({ message: `Variation with color ${variationColor} not found` });
    }

    // Remove the variation from the array
    product.variations.splice(variationIndex, 1);

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error("Error deleting variation:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a product by id for images
/**
 * req.body be send like below
{
  "images": ["image1.jpg", "image2.jpg"]
}
{
  "images": ["image3.jpg"]
}

 */
router.patch("/:id/images", ensureStaff, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Ensure that the `images` field is an array
    if (!Array.isArray(req.body.images)) {
      return res
        .status(400)
        .json({ message: "Images must be an array of strings" });
    }

    const imagesToAdd = req.body.images;

    // Use $push with $each to add multiple items
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $push: { images: { $each: imagesToAdd } } },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(200).send(updatedProduct);
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

// Delete - Update a product by id for images
/**
 * req.body be send like below
{
  "image": "image3.jpg"
}

 */
router.delete("/:id/deleteImage", ensureStaff, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    // Ensure that the `image` field is provided and is a string
    if (!req.body.image || typeof req.body.image !== "string") {
      return res.status(400).json({
        message:
          "Image must be a string representing the image URL or identifier",
      });
    }

    const imageToDelete = req.body.image;

    // Use $pull to remove the specified image from the images array
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $pull: { images: imageToDelete } },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(200).send(updatedProduct);
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

// Delete a product by id
router.delete("/:id", ensureAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: `Product id ${id} not found` });
    }

    res.status(204).send();
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
