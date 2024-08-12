const mongoose = require("mongoose");
const { connect, closeDatabase, clearDatabase } = require("../db");
const { createToken } = require("../middleware/tokens");
const Customer = require("../models/customers/customers");
const Employee = require("../models/staff/employee");
const Product = require("../models/products/products");

let testCustomer, testCustomer2, testCustomerToken;
let testemployee,
  testAdmin,
  testAdminToken,
  testStaffToken,
  testStaffToken2,
  testInEmployee,
  testemployee2;
let testproduct, testproduct2, testproduct3;

const setupDatabase = async () => {
  await connect();
  await clearDatabase();
};

const teardownDatabase = async () => {
  await closeDatabase();
};

const createTestData = async () => {
  // Create test customers
  const customer = new Customer({
    email: "email@email.com",
    first_name: "fname",
    last_name: "lname",
    password: "123",
    phone: 987123,
  });
  testCustomer = await customer.save();

  const customer2 = new Customer({
    email: "email2@email.com",
    first_name: "fname2",
    last_name: "lname2",
    password: "123",
    phone: 987123,
  });
  testCustomer2 = await customer2.save();

  // Create test employee
  const employee = new Employee({
    email: "eemail@email.com",
    first_name: "efname2",
    last_name: "elname2",
    password: "123",
    status: "active",
    phone: 123456789,
    role: "employee",
  });
  testemployee = await employee.save();

  const employee2 = new Employee({
    email: "eemail22@email.com",
    first_name: "efname2",
    last_name: "elname2",
    password: "123",
    status: "active",
    phone: 123456789,
    role: "employee",
  });
  testemployee2 = await employee2.save();

  const admin = new Employee({
    email: "eemail2@email.com",
    first_name: "efname2",
    last_name: "elname2",
    password: "123",
    status: "active",
    phone: 123456789,
    role: "admin",
  });
  testAdmin = await admin.save();

  const inEmployee = new Employee({
    email: "inemail@email.com",
    first_name: "efname2",
    last_name: "elname2",
    password: "123",
    status: "inactive",
    phone: 123456789,
    role: "employee",
  });
  testInEmployee = await inEmployee.save();

  // Generate tokens
  testCustomerToken = createToken(testCustomer, "customer");
  testStaffToken = createToken(testemployee, "employee");
  testAdminToken = createToken(testAdmin, "employee");
  testStaffToken2 = createToken(testemployee2, "employee");

  // Create test products
  const product = new Product({
    name: "apple",
    price: 12,
    currency: "USD",
    stock: 10,
    active: true,
    description: "description",
    variations: [{ color: "blue", stock: 5, price: 11 }],
    images: ["one.jpg", "two.jpg"],
  });
  testproduct = await product.save();

  const product2 = new Product({
    name: "banana",
    price: 13,
    currency: "USD",
    stock: 0,
    active: true,
    description: "description",
  });
  testproduct2 = await product2.save();

  const product3 = new Product({
    name: "cherry",
    price: 14,
    currency: "USD",
    stock: 10,
    active: false,
    description: "description",
    variations: [
      { color: "round", stock: 5, price: 11 },
      { color: "square", stock: 3, price: 16 },
    ],
  });
  testproduct3 = await product3.save();
};

const clearTestData = async () => {
  await clearDatabase();
};

module.exports = {
  setupDatabase,
  teardownDatabase,
  createTestData,
  clearTestData,
  getTestData: () => ({
    testCustomer,
    testCustomer2,
    testCustomerToken,
    testemployee,
    testemployee2,
    testAdmin,
    testInEmployee,
    testStaffToken,
    testStaffToken2,
    testAdminToken,
    testproduct,
    testproduct2,
    testproduct3,
  }),
};
