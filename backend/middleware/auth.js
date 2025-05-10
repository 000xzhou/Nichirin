"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UnauthorizedError } = require("../expressError");
const { updateSearchIndex } = require("../models/products/products");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function ensureAuthenticated(req, res, next) {
  try {
    // const authHeader = req.header("Authorization");

    // if (!authHeader) {
    //   return res
    //     .status(401)
    //     .json({ message: "Access denied. No token provided." });
    // }
    // const token = authHeader.replace(/^[Bb]earer /, "").trim();
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(400).json({ message: "Invalid token." });
  }
}

// All employee
function ensureStaff(req, res, next) {
  ensureAuthenticated(req, res, function () {
    if (
      !req.user ||
      (req.user.role !== "employee" && req.user.role !== "admin")
    ) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  });
}

// All employee with right id
function ensureCorrectStaff(req, res, next) {
  ensureAuthenticated(req, res, function () {
    if (
      !req.user ||
      (req.user.role !== "admin" && // If the user is not an admin
        (req.user.role !== "employee" || req.user.id !== req.params.id)) // And if the user is not an employee with a matching id
    ) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  });
}

// Higher tier access
function ensureAdmin(req, res, next) {
  ensureAuthenticated(req, res, function () {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  });
}

// All employee and match user
function ensureCorrectUserOrStaff(req, res, next) {
  ensureAuthenticated(req, res, function () {
    if (
      !req.user ||
      !(
        req.user.role === "employee" ||
        req.user.role === "admin" ||
        req.user.id === req.params.id
      )
    ) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  });
}

// All employee and user
function ensureUser(req, res, next) {
  ensureAuthenticated(req, res, function () {
    if (!req.user) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  });
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  ensureStaff,
  ensureCorrectStaff,
  ensureCorrectUserOrStaff,
  ensureUser,
};
