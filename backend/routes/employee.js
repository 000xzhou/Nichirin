const express = require("express");
const router = express.Router();
const Employee = require("../models/staff/employee");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/tokens");
const { ensureAdmin, ensureCorrectStaff } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

// auth login employee
router.get("/employee-auth", async (req, res) => {
  const token = req.cookies.token; // Get the token from the httpOnly cookie
  // console.log(token);
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    // Verify the token (assuming JWT is used)
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from the database
    const user = await Employee.findById(verified.id);

    if (!user) {
      return res.json({ isAuthenticated: false });
    }

    return res.json({ isAuthenticated: true, user: user });
  } catch (err) {
    return res.json({ isAuthenticated: false });
  }
});

/** GET / => { employee: [ { _id, email, first_name, last_name, ... }, ... ] }
 *
 * Returns list of all employee.
 *
 * Authorization required: admin
 **/
router.get("/", ensureAdmin, async (req, res) => {
  try {
    const employees = await Employee.find({});
    // .select('-password -phone -email');  // Excluding password, phone, and email
    res.status(200).json({ employees: employees });
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

/** POST / { employee }  => { employee, token }
 *
 * Adds a new employee. This is the login endpoint.
 * Required: email, password
 *
 * This returns the returning employee and an authentication token for them:
 *  {token, employee: { _id, email, first_name, last_name, password, status, phone, role, createdAt, updatedAt } }
 *
 * Authorization required: none
 **/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(employee, "employee");

    // Set the token as an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie against XSS
      secure: true, // Ensure the cookie is only sent over HTTPS (use only in production)
      sameSite: "strict", // Mitigate CSRF attacks
      maxAge: 3600000, // Align with the JWT's expiration time (1 hour)
      path: "/", // Make cookie available site-wide
    });
    // Send a response to the client
    // res.json({ message: "Login successful" });

    res.status(200).json({ token, employee: employee });
  } catch (err) {
    console.error("Error during employee login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/** POST / { employee }  => { employee, token }
 *
 * Adds a new employee. This is the registration endpoint.
 * Required: email, first_name, last_name, password, status, phone, role
 *
 * This returns the newly created employee and an authentication token for them:
 *  {token, employee: {  _id, email, first_name, last_name, password, status, phone, role, createdAt, updatedAt } }
 *
 * Authorization required: admin
 **/
router.post("/create", ensureAdmin, async (req, res) => {
  try {
    // default password that should be in env and change every month.
    // the employee have to login and change it themselve after account creation. Email will be send for reminder
    req.body.password = "password123";
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    const token = createToken(newEmployee, "employee");

    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie against XSS
      secure: true, // Ensure the cookie is only sent over HTTPS (use only in production)
      sameSite: "strict", // Mitigate CSRF attacks
      maxAge: 3600000, // Align with the JWT's expiration time (1 hour)
      path: "/", // Make cookie available site-wide
    });

    // sending email to remind them to change pw
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
    const recipients = [newEmployee.email];

    // send email
    transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Reminder to reset your password",
      html: ``,
      category: "Integration Test",
      sandbox: true,
    });

    res.status(201).json({ token, employee: newEmployee });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Invalid data format", details: err.errors });
    } else if (err.code && err.code === 11000) {
      return res
        .status(409)
        .json({ error: "Duplicate data error", details: err.message });
    } else {
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  }
});

/** GET / => { employee: [ { _id, email, first_name, last_name, status: "active" ... }, ... ] }
 *
 * Returns list of all employee that's active.
 *
 * Authorization required: admin
 **/
router.get("/active", ensureAdmin, async (req, res) => {
  try {
    // Find all employees where status is 'active'
    const activeEmployees = await Employee.find({ status: "active" });

    // Check if any active employees were found
    if (activeEmployees.length === 0) {
      return res.status(404).json({ message: "No active employees found." });
    }

    // Send the list of active employees
    res.status(200).json({ employees: activeEmployees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** GET / => { employee: [ { _id, email, first_name, last_name, status: "inactive" ... }, ... ] }
 *
 * Returns list of all employee that's inactive.
 *
 * Authorization required: admin
 **/
router.get("/inactive", ensureAdmin, async (req, res) => {
  try {
    // Find all employees where status is 'inactive'
    const inactiveEmployees = await Employee.find({ status: "inactive" });

    // Check if any active employees were found
    if (inactiveEmployees.length === 0) {
      return res.status(404).json({ message: "No inactive employees found." });
    }

    // Send the list of active employees
    res.status(200).json({ employees: inactiveEmployees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** GET / => { employee: [ { _id, email, first_name, last_name, ... }, ... ] }
 *
 * Find employee base on email
 *
 * Authorization required: admin
 **/
router.get("/search", ensureAdmin, async (req, res) => {
  try {
    // Extract email from query parameters
    const { email } = req.query;

    // Validate the presence of the email query parameter
    if (!email) {
      return res.status(400).json({ message: "Email parameter is required." });
    }

    const employee = await Employee.findOne({ email: email });

    if (!employee) {
      return res
        .status(404)
        .json({ message: "No employee found with that email." });
    }

    // Send the found employee
    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** GET / => { employee: [ { _id, email, first_name, last_name, ... }, ... ] }
 *
 * Find employee base on id
 *
 * Authorization required: admin
 **/
router.get("/:id", ensureCorrectStaff, async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Use findById with the correct method name and usage
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: `Employee id ${id} not found` });
    }
    res.status(200).json(employee);
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

/** PATCH / => { employee: [ { _id, email, first_name, last_name, ... }, ... ] }
 *
 * Edit employee
 *
 * Authorization required: admin or same employee-as-:id
 **/
router.patch("/:id", ensureCorrectStaff, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: `Employee id ${id} not found` });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** DELETE /[id]
 *
 * Delete employee
 * Should't never be use but is here
 *
 * Authorization required: admin
 **/
router.delete("/:id", ensureAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: `Employee id ${id} not found` });
    }

    res.status(204).send(); // No content to send back
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** POST /[Employee]
 * User submits email to receive reset link
 **/
router.post("/forget-password", async (req, res) => {
  try {
    // 	Sends email, creates token
    const { email } = req.body;
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No Employee with that email" });
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

    const resetUrl = `http://localhost:5173/employee/reset-password?token=${rawToken}`;

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

/** POST /[Employee]
 * Finalizes password update with token
 **/
router.post("/reset-password", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const user = await Employee.findOne({
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

module.exports = router;
