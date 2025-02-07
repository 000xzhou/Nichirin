// routes/customers.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = require("../models/customers/customers");
const { createToken } = require("../middleware/tokens");
const bcrypt = require("bcrypt");
const {
  ensureAdmin,
  ensureStaff,
  ensureCorrectUserOrStaff,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const jwt = require("jsonwebtoken");

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
      sameSite: "strict", // Mitigate CSRF attacks
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
 *  {token, customer: { _id, email, first_name, last_name, password, phone, address, birthday, preferences, createdAt, updatedAt } }
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
      sameSite: "strict", // Mitigate CSRF attacks
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
router.patch("/:id/password", ensureCorrectUserOrStaff, async (req, res) => {
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

/** PATCH /[customers] => { customers }
 *
 * Data: address
 *
 * Add new address
 *
 * Returns { _id, email, first_name, last_name, password, phone, ...  }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.patch("/:id/add-address", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;

    // Update only the address field
    const updatedcustomer = await Customer.findByIdAndUpdate(
      id,
      {
        $push: { addresses: req.body },
      },
      { new: true, runValidators: true }
    );

    if (!updatedcustomer) {
      return res.status(404).json({ message: `Customer id ${id} not found` });
    }

    // Check if there a default address
    const customer = await Customer.findById(id);

    if (customer.default_address_id === null) {
      // Get the last added address (_id is now generated)
      const newlyAddedAddress =
        updatedcustomer.addresses[updatedcustomer.addresses.length - 1];
      // Update default_address_id
      const finalCustomer = await Customer.findByIdAndUpdate(
        id,
        { default_address_id: newlyAddedAddress._id },
        { new: true }
      );

      //sent back
      return res.status(200).json(finalCustomer);
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

/** PATCH /[customers] => { customers }
 *
 * Data: address
 *
 * Edit address
 *
 * Returns { _id, email, first_name, last_name, password, phone, ...  }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.patch(
  "/:id/edit-address/:addressId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    // const id = req.params.id;
    const { id, addressId } = req.params;
    try {
      // Update only the address field
      const updatedcustomer = await Customer.findOneAndUpdate(
        { _id: id, "addresses._id": addressId },
        { $set: { "addresses.$": req.body } },
        { new: true, runValidators: true }
      );

      if (!updatedcustomer) {
        return res
          .status(404)
          .json({ message: `Customer or Address not found` });
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
  }
);

/** DELETE /[customers] => { customers }
 *
 * Delete/remove address from addresses
 *
 * Returns { _id, email, first_name, last_name, password, phone, ...  }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.delete(
  "/:id/remove-address/:addressId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    const { id, addressId } = req.params;
    try {
      // remove address
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { $pull: { addresses: { _id: addressId } } }, // Remove the address
        { new: true }
      );

      if (!updatedCustomer) {
        return res.status(404).json({ message: `Customer not found` });
      }

      // Check if the deleted address was set as default
      if (updatedCustomer.default_address_id?.toString() === addressId) {
        await Customer.findByIdAndUpdate(
          id,
          { default_address_id: null },
          { new: true }
        );
      }

      res
        .status(200)
        .json({ message: "Address deleted successfully", updatedCustomer });
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
  }
);

/** PATCH /[customers] => { customers }
 *
 * Update default address
 *
 * Returns { _id, email, first_name, last_name, password, phone, ...  }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.patch(
  "/:id/default-address/:addressId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    const { id, addressId } = req.params;

    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { default_address_id: addressId },
        { new: true }
      );

      if (!updatedCustomer) {
        return res.status(404).json({ message: `Customer not found` });
      }

      res.status(200).json({ updatedCustomer });
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
  }
);

/** PATCH /[customers] => { customers }
 *
 * Data: address, shipping
 *
 * Returns { _id, email, first_name, last_name, password, phone, ... }
 *
 * Authorization required: staff or same user-as-:id
 **/
router.patch("/:id/:type", ensureCorrectUserOrStaff, async (req, res) => {
  try {
    // const id = req.params.id;
    const { id, type } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Ensure the type is valid
    if (!["address", "shipping"].includes(type)) {
      return res.status(400).json({ message: "Invalid type parameter" });
    }

    // Update only the address field
    const updatedcustomer = await Customer.findByIdAndUpdate(id, {
      $set: { [type]: req.body.address },
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

router.get(
  "/:id/order/:sessionId",
  ensureCorrectUserOrStaff,
  async (req, res) => {
    try {
      const { id, sessionId } = req.params;

      const customer = await Customer.findOne({
        _id: id,
        "orders.sessionId": sessionId,
      });

      if (!customer) {
        return res.status(404).json({ error: "Customer or Order not found" });
      }

      const order = customer.orders.find((ord) => ord.sessionId === sessionId);

      res.json(order);
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
  }
);

// Export the router
module.exports = router;
