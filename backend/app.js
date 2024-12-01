// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const customerRouter = require("./routes/customers");
const productRouter = require("./routes/products");
const employeeRouter = require("./routes/employee");
const reviewRouter = require("./routes/reviews");

const jwt = require("jsonwebtoken");

const app = express();

// Allow requests from 'http://localhost:5173'
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB connection
if (process.env.NODE_ENV !== "test") {
  // Prevent connecting to the DB when running tests
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

// Use routers
app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/employee", employeeRouter);
app.use("/reviews", reviewRouter);

// auth login
app.get("/check-auth", (req, res) => {
  const token = req.cookies.token; // Get the token from the httpOnly cookie
  // console.log(token);
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    // Verify the token (assuming JWT is used)
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isAuthenticated: true, user: verified });
  } catch (err) {
    return res.json({ isAuthenticated: false });
  }
});

// logout for all
app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).send({ message: "Logged out" });
  // res.json({ message: "Logged out" });
});

module.exports = app;
