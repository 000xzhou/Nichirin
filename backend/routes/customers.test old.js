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
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
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
      .set("Authorization", `Bearer ${testAdminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
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
      .set("Authorization", `Bearer ${testCustomerToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      "message",
      "Access denied. You do not have permission to perform this action."
    );
  });
  it("customers should NOT be able to search for a customers", async () => {
    const res = await request(app)
      .get("/customers/search?email=email@email.com")
      .set("Authorization", `Bearer ${testCustomerToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      "message",
      "Access denied. You do not have permission to perform this action."
    );
  });
  it("employee should be able to search for a customer by email", async () => {
    const res = await request(app)
      .get("/customers/search?email=email@email.com")
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
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
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
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
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
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
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      customers: [
        {
          _id: String(testCustomer._id),
          email: String(testCustomer.email),
          first_name: String(testCustomer.first_name),
          last_name: String(testCustomer.last_name),
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
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "Please provide at least one search parameter (email, phone, or name)."
    );
  });
  it("admin should be able to delete a customer by id.", async () => {
    const res = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testAdminToken}`);

    expect(res.statusCode).toEqual(204);

    // check if customer still exist
    const check = await request(app)
      .get(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testAdminToken}`);
    expect(check.statusCode).toEqual(404);
  });
  it("staff should NOT be able to delete a customer by id.", async () => {
    const res = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testStaffToken}`);

    expect(res.statusCode).toEqual(403);
  });
  it("404 if customer not found during deletion", async () => {
    const res = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testAdminToken}`);

    expect(res.statusCode).toEqual(204);

    const again = await request(app)
      .delete(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testAdminToken}`);

    expect(again.statusCode).toEqual(404);
  });
});

describe("Customers Route - customer AND employee access", () => {
  it("customers should be able create an account", async () => {
    const user = {
      email: "user@email.com",
      first_name: "fname",
      last_name: "lname",
      password: 123,
      phone: 987123,
    };

    const res = await request(app).post("/customers/register").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.customer).toHaveProperty("email", "user@email.com");
  });
  it("customers should be able to login", async () => {
    const user = {
      email: "email@email.com",
      password: "123",
    };

    const res = await request(app).post("/customers/login").send(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.customer).toHaveProperty("email", "email@email.com");
  });
  it("404 customers should be NOT able to login with wrong pw", async () => {
    const user = {
      email: "email@email.com",
      password: "321",
    };

    const res = await request(app).post("/customers/login").send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });
  it("404 customers should be NOT able to login with wrong email", async () => {
    const user = {
      email: "abc@email.com",
      password: "123",
    };

    const res = await request(app).post("/customers/login").send(user);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Invaild email");
  });
  it("customers should be able to access their info", async () => {
    const res = await request(app)
      .get(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testCustomerToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "email@email.com");
  });
  it("other customers should NOT be able to access other customers info", async () => {
    const res = await request(app)
      .get(`/customers/${testCustomer2._id}`)
      .set("Authorization", `Bearer ${testCustomerToken}`);
    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual({
      message:
        "Access denied. You do not have permission to perform this action.",
    });
  });
  it("customers should be able to edit their info", async () => {
    const res = await request(app)
      .patch(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testCustomerToken}`)
      .send({ birthday: "1/2/3", first_name: "new name" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "email@email.com");
    expect(res.body).toHaveProperty("birthday", "1/2/3");
    expect(res.body).toHaveProperty("first_name", "new name");
  });
  it("employee should be able to edit customers info", async () => {
    const res = await request(app)
      .patch(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testStaffToken}`)
      .send({ birthday: "1/2/3", first_name: "new name" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "email@email.com");
    expect(res.body).toHaveProperty("birthday", "1/2/3");
    expect(res.body).toHaveProperty("first_name", "new name");
  });
  it("customers should be able to add their address", async () => {
    const add = {
      line1: "123",
      city: "NY",
      state: "NY",
      postal_code: "10001",
      country: "USA",
    };

    const res = await request(app)
      .patch(`/customers/${testCustomer._id}`)
      .set("Authorization", `Bearer ${testCustomerToken}`)
      .send({
        address: add,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "email@email.com");
    expect(res.body).toHaveProperty("address", add);
  });
});
