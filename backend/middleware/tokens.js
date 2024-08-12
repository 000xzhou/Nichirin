const jwt = require("jsonwebtoken");
require("dotenv").config();

/** return signed JWT from user data. */

function createToken(user, isRole, res) {
  let role;
  if (isRole === "employee") {
    if (user.status === "active") {
      role = user.role;
    } else {
      throw new Error(
        "Access denied. You do not have permission to perform this action."
      );
    }
  } else {
    role = isRole;
  }
  const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

module.exports = { createToken };
