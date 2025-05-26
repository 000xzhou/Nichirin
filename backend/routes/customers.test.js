const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Customers = require("../models/customers/customers");
const {
  setupDatabase,
  teardownDatabase,
  createTestData,
  clearTestData,
  getTestData,
} = require("./_testCommon");

let testCustomer,
  testCustomer2,
  testemployee,
  testAdmin,
  testInEmployee,
  testStaffToken,
  testCustomerToken,
  testAdminToken;

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

beforeEach(async () => {
  await createTestData();
  const testData = getTestData();
  testAdminToken = testData.testAdminToken;
  testStaffToken = testData.testStaffToken;
  testCustomerToken = testData.testCustomerToken;
  testCustomer = testData.testCustomer;
  testCustomer2 = testData.testCustomer2;
  testemployee = testData.testemployee;
  testInEmployee = testData.testInEmployee;
  testAdmin = testData.testAdmin;
});

afterEach(async () => {
  await clearTestData();
});

describe("Customers Route - Only Empoyee can access", () => {
  it("staff should be able to see all customers", async () => {
    const res = await request(app)
      .get("/customers")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
        {
          _id: String(testCustomer2._id),
          email: String(testCustomer2.email),
          first_name: String(testCustomer2.first_name),
          last_name: String(testCustomer2.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer2.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
      ],
    });
  });
  it("admin should be able to see all customers", async () => {
    const res = await request(app)
      .get("/customers")
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
        {
          _id: String(testCustomer2._id),
          email: String(testCustomer2.email),
          first_name: String(testCustomer2.first_name),
          last_name: String(testCustomer2.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer2.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
      ],
    });
  });
  it("customers should NOT be able to see all customers", async () => {
    const res = await request(app)
      .get("/customers")
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      "message",
      "Access denied. You do not have permission to perform this action."
    );
  });
  it("customers should NOT be able to search for a customers", async () => {
    const res = await request(app)
      .get("/customers/search?email=email@email.com")
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      "message",
      "Access denied. You do not have permission to perform this action."
    );
  });
  it("employee should be able to search for a customer by email", async () => {
    const res = await request(app)
      .get("/customers/search?email=email@email.com")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
      ],
    });
  });
  it("employee should be able to search for a customer by name", async () => {
    const res = await request(app)
      .get("/customers/search?fname=fname")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
      ],
    });
  });
  it("employee should be able to search for a customer by phone", async () => {
    const res = await request(app)
      .get("/customers/search?phone=987123")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
        {
          _id: String(testCustomer2._id),
          email: String(testCustomer2.email),
          first_name: String(testCustomer2.first_name),
          last_name: String(testCustomer2.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer2.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
      ],
    });
  });
  it("employee should be able to search for a customer by email name and phone", async () => {
    const res = await request(app)
      .get("/customers/search?email=email@email.com&lname=lname&phone=987123")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
          defaultAddressId: null,
          password: expect.any(String),
          phone: String(testCustomer.phone),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          __v: 0,
        },
      ],
    });
  });
  //   it("404 if customer not found in search", async () => {});
  it("400 if parameters provided in search", async () => {
    const res = await request(app)
      .get("/customers/search?apple=email@email.com")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "Please provide at least one search parameter (email, phone, or name)."
    );
  });
  it("admin should be able to delete a customer by id.", async () => {
    const res = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(204);

    // check if customer still exist
    const check = await request(app)
      .get(`/customers/${testCustomer._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(check.statusCode).toEqual(404);
  });
  it("staff should NOT be able to delete a customer by id.", async () => {
    const res = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(403);
  });
  it("404 if customer not found during deletion", async () => {
    const res = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(204);

    const again = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(again.statusCode).toEqual(404);
  });
});
