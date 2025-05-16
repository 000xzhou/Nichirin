// routes/checkout.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Customer = require("../models/customers/customers");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/:id/create-checkout-session", async (req, res) => {
  const { cart, customerID, shipping, totalAmount } = req.body;
  const { id } = req.params;

  // Check if customer exist
  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }
  // check if they got stripe id, if not create one and save to db
  if (!customer.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: customer.email,
      name: customer.first_name + " " + customer.last_name,
    });

    customer.stripeCustomerId = stripeCustomer.id;
    await customer.save();
  }

  // Build the line_items array by mapping over the items and prices arrays
  const lineItems = cart.map((item, index) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // 5000 = $50.00
      },
      quantity: item.quantity,
    };
  });

  // Create Checkout Session
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeCustomerId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      // customer_email: customer.email,
      success_url:
        "http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
    });

    //save to user db
    const formattedCart = cart.map((item) => ({
      itemId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const newOrder = new Order({
      customerId: customer._id,
      sessionId: session.id,
      items: formattedCart,
      shipping:
        "where to get this? or can I upload it ot stripe so it have their default address pre-added",
      totalAmount: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      status: "pending",
    });
    await newOrder.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
