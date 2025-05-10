const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Address = require("../models/customers/address");
const Customers = require("../models/customers/customers");
const { ensureUser } = require("../middleware/auth");

/** Get /[Address] => { Address }
 * Get all Address by user id
 **/
router.get("/addresses/:userId/", ensureUser, async (req, res) => {
  try {
    const userId = req.params.userId;

    const addresses = await Address.find({ userId: userId });

    res.status(200).json({ addresses });
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

/** Get /[Address] => { Address }
 * Get Address by Id
 **/
router.get("/find/:id", ensureUser, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    res.status(200).json({ address });
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

/** POST /[Address] => { Address }
 *
 * Data: {userId,name. phone, line1, line2,city, state, postal_code,country}
 * Add new address
 *
 **/
router.post("/add-address", ensureUser, async (req, res) => {
  try {
    // const id = req.params.id;
    const newAddress = new Address(req.body);
    await newAddress.save();

    res.status(201).send({ Address: newAddress });
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

/** PATCH /[Addrerss] => { Addrerss }
 *
 * Data: address
 *
 * Edit address
 *
 **/
router.patch("/edit-address/:addressId", ensureUser, async (req, res) => {
  // const id = req.params.id;
  try {
    // Update only the address field
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: `Address not found` });
    }

    res.status(200).send(updatedAddress);
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

/** DELETE /[Address] => { Address }
 *
 * Delete/remove address from Address table
 *
 **/
router.delete("/remove-address/:addressId", ensureUser, async (req, res) => {
  const { addressId } = req.params;
  try {
    // remove address
    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
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

/** PATCH /[Address] => { Address }
 *
 * Update default address
 *
 **/
router.patch(
  "/default-address/:addressId/:userid",
  ensureUser,
  async (req, res) => {
    try {
      const updatedAddress = await Customers.findByIdAndUpdate(
        req.params.userid,
        {
          defaultAddressId: req.params.addressId,
        },
        { new: true }
      );

      if (!updatedAddress) {
        return res.status(404).json({ message: `User not found` });
      }
      res.status(200).json({ updatedAddress });
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

module.exports = router;
