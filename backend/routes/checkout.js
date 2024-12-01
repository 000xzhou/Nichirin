// routes/checkout.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Customer = require("../models/customers/customers");

const stripe = require("stripe")("sk_test_51JdHnKSF8____");

app.post("/create-checkout-session", async (req, res) => {
  const { userId, items, prices } = req.body;

  // Find the customer in your database (replace with your own logic)
  const customer = Customer.find(userId);
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  // Build the line_items array by mapping over the items and prices arrays
  const lineItems = items.map((item, index) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name, // Use the item name from your items array
        },
        unit_amount: prices[index] * 100, // Convert price to cents for Stripe
      },
      quantity: item.quantity, // Use the quantity from your items array
    };
  });

  // Create Checkout Session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems, // Use the constructed line_items array
      customer_email: customer.email, // Use your customer email but no Stripe Customer ID
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});
