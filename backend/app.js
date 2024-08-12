// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const customerRouter = require("./routes/customers");
const productRouter = require("./routes/products");
const employeeRouter = require("./routes/employee");

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

module.exports = app;