// routes/customers.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = require("../models/customers/customers");
const { createToken } = require("../middleware/tokens");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
  ensureUser,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const jwt = require("jsonwebtoken");
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

/** GET /
 *
 * Authorization required: none
 **/
router.get("/user-auth", async (req, res) => {
  const token = req.cookies.token; // Get the token from the httpOnly cookie
  // console.log(token);
  if (!token) {
    return res.json({ error: "no token" });
  }
  try {
    // Verify the token (assuming JWT is used)
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from the database
    const user = await Customer.findById(verified.id);

    if (!user) {
      return res.json({ error: "user not found" });
    }

    return res.json({ user: user });
  } catch (err) {
    return res.json({ error: err });
  }
});

/** POST / { customer }  => { customer, token }
 *
 * Adds a new customer. This is the login endpoint.
 * Required: email, password
 *
 * This returns the returning customer and an authentication token for them:
 *  {token, customer: { _id, email, first_name, last_name, password, phone, address, birthday, preferences, createdAt, updatedAt } }
 *
 * Authorization required: none
 **/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Invaild email" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(customer, "customer");

    // Set the token as an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie against XSS
      secure: true, // Ensure the cookie is only sent over HTTPS (use only in production)
      sameSite: "none", // Mitigate CSRF attacks
      maxAge: 3600000, // Align with the JWT's expiration time (1 hour)
      path: "/", // Make cookie available site-wide
    });

    res.status(200).json({ token, customer: customer });
  } catch (err) {
    console.error("Error during customer login:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/** POST / { customer }  => { customer, token }
 *
 * Adds a new customer. This is the registration endpoint.
 * Required: email, first_name, last_name, password
 *
 * This returns the newly created customer and an authentication token for them:
 *  {token, customer: { _id, email, first_name, last_name, password, phone, birthday, preferences, createdAt, updatedAt } }
 *
 * Authorization required: none
 **/
router.post("/register", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    const token = createToken(newCustomer, "customer");

    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie against XSS
      secure: true, // Ensure the cookie is only sent over HTTPS (use only in production)
      sameSite: "none", // Mitigate CSRF attacks
      maxAge: 3600000, // Align with the JWT's expiration time (1 hour)
      path: "/", // Make cookie available site-wide
    });

    res.status(201).send({ token, customer: newCustomer });
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

/** GET / => { customers: [ { _id, email, first_name, last_name, password, phone, ... }, ... ] }
 *
 * Returns list of all Customers.
 *
 * Authorization required: staff
 **/
router.get("/", ensureStaff, async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).send({ customers: customers });
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

/** GET / => { customers: [ { _id, email, first_name, last_name, password, phone, ... }, ... ] }
 *
 * Search for customers profiles using one or more query filters.
 *
 * Authorization required: staff
 **/
router.get("/search", ensureStaff, async (req, res) => {
  try {
    // Extract query parameters
    const { email, phone, fname, lname } = req.query;
    // Build a query object to hold the search criteria
    let query = {};
    if (email) {
      query.email = email;
    }
    if (phone) {
      query.phone = phone;
    }
    if (fname) {
      query.first_name = fname;
    }
    if (lname) {
      query.last_name = lname;
    }

    // Perform the search only if there's at least one query parameter
    if (Object.keys(query).length) {
      const customers = await Customer.find(query);

      // Check if customers are found
      if (customers.length === 0) {
        return res
          .status(404)
          .json({ message: "No customers found matching the criteria." });
      }

      res.status(200).json({ customers: customers });
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

/** GET /[customers] => { customers }
 *
 * Returns { _id, email, first_name, last_name, password, phone, ... }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.get("/:id", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).send(customer);
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

/** PATCH /[customers] => { customers }
 *
 * Data can include: anything besides _id
 *
 * Returns { _id, email, first_name, last_name, password, phone, ... }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.patch("/:id", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedcustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedcustomer) {
      return res.status(404).json({ message: `Customer id ${id} not found` });
    }

    res.status(200).send(updatedcustomer);
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

/** PATCH /[customers]
 *
 * Data can include: anything besides _id
 *
 * Returns { message: Password been updated}
 *
 * Authorization required: staff or same user-as-:id
 **/
router.patch("/:id/password", ensureUser, async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const user = await Customer.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare old password with hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Current password is incorrect" });

    // change to new pw
    user.password = newPassword;
    await user.save();

    // res.status(200).send(updatedcustomer);
    res.status(200).send({ message: "Password been updated" });
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

/** DELETE /[id]
 *
 * Would not use but it's here
 * Authorization required: admin
 **/
router.delete("/:id", ensureAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: `Customer id ${id} not found` });
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

/** POST /[customers]
 * User submits email to receive reset link
 **/
router.post("/forget-password", async (req, res) => {
  try {
    // 	Sends email, creates token
    const { email } = req.body;
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No customer with that email" });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const tokenExpires = Date.now() + 3600000; // 1 hour

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = tokenExpires;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password?token=${rawToken}`;

    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_API_TOKEN,
        testInboxId: 3449602,
      })
    );

    const sender = {
      address: "BusinessName@example.com",
      name: "Business Name",
    };
    const recipients = [email];

    // send email
    transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Reset Your Password",
      html: `Reset your password. click on the link below.
      <div>${resetUrl}<div>
      `,
      category: "Integration Test",
      sandbox: true,
    });

    res
      .status(200)
      .send({ message: "Please check your email for a reset link." });
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

/** POST /[customers]
 * Finalizes password update with token
 **/
router.post("/reset-password", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const user = await Customer.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    // update new password
    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).send({ message: "Password reset successfully" });
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

// Export the router
module.exports = router;
