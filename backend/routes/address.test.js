const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/products/products");
const {
  setupDatabase,
  teardownDatabase,
  createTestData,
  clearTestData,
  getTestData,
} = require("./_testCommon");

let testStaffToken,
  testCustomerToken,
  testAdminToken,
  testCustomer,
  testCustomer2,
  savedAddress;

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

beforeEach(async () => {
  await createTestData();
  const testData = getTestData();
  // tokens
  testAdminToken = testData.testAdminToken;
  testStaffToken = testData.testStaffToken;
  testCustomerToken = testData.testCustomerToken;
  // customers
  testCustomer = testData.testCustomer;
  testCustomer2 = testData.testCustomer2;
  savedAddress = testData.savedAddress;
});

afterEach(async () => {
  await clearTestData();
});

describe("Address Route", () => {
  it("should let customer create a new address", async () => {
    const newAddress = {
      userId: testCustomer._id,
      name: testCustomer.first_name + testCustomer.last_name,
      line1: "line1",
      city: "city",
      state: "state",
      postal_code: "11111",
      country: "usa",
    };
    const res = await request(app)
      .post("/address/add-address")
      .set("Cookie", [`token=${testCustomerToken}`])
      .send(newAddress);
    // console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.Address).toHaveProperty("name", newAddress.name);
    expect(res.body.Address).toHaveProperty("line1", newAddress.line1);
    expect(res.body.Address).toHaveProperty("city", newAddress.city);
    expect(res.body.Address).toHaveProperty(
      "postal_code",
      newAddress.postal_code
    );
  });
  it("should let customer see all their address", async () => {
    const res = await request(app)
      .get(`/address/addresses/${testCustomer._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body.addresses[0]).toHaveProperty("name", savedAddress.name);
    expect(res.body.addresses[0]).toHaveProperty("line1", savedAddress.line1);
    expect(res.body.addresses[0]).toHaveProperty("city", savedAddress.city);
    expect(res.body.addresses[0]).toHaveProperty(
      "postal_code",
      savedAddress.postal_code
    );
  });
  it("should let customer find their default address", async () => {
    const res = await request(app)
      .get(`/address/default/${testCustomer._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);
    expect(res.statusCode).toEqual(200);
  });
  it("should let customer edit their address", async () => {
    const res = await request(app)
      .patch(`/address/edit-address/${savedAddress._id}`)
      .set("Cookie", [`token=${testCustomerToken}`])
      .send({ line1: "edited" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("line1", "edited");
  });
  it("should let customer delete their address", async () => {
    const res = await request(app)
      .delete(`/address/remove-address/${savedAddress._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Address deleted successfully");
  });
});
