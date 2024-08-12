const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
require("dotenv").config();

let SECRET_KEY = process.env.JWT_SECRET;

describe("createToken", function () {
  it("should create a token for an active employee", function () {
    const user = {
      _id: "123",
      username: "test",
      status: "active",
      role: "employee",
    };
    const isRole = "employee";
    const token = createToken(user, isRole);

    // check
    const outcome = jwt.verify(token, SECRET_KEY);
    expect(outcome).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      id: "123",
      role: "employee",
    });
  });

  it("should create a token for an active admin", function () {
    const user = {
      _id: "123",
      username: "test",
      status: "active",
      role: "admin",
    };
    const isRole = "employee";
    const token = createToken(user, isRole);

    // check
    const outcome = jwt.verify(token, SECRET_KEY);
    expect(outcome).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      id: "123",
      role: "admin",
    });
  });

  it("should create a token for a customer", function () {
    const user = {
      _id: "123",
      email: "test",
    };
    const isRole = "customer";
    const token = createToken(user, isRole);

    // check
    const outcome = jwt.verify(token, SECRET_KEY);
    expect(outcome).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      id: "123",
      role: "customer",
    });
  });

  it("should NOT create a token for a inactive employee", function () {
    const user = {
      _id: "123",
      username: "test",
      status: "inactive",
      role: "employee",
    };
    const isRole = "employee";

    expect(() => createToken(user, isRole)).toThrow(
      "Access denied. You do not have permission to perform this action."
    );
  });
});
