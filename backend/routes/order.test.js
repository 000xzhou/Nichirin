jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    customers: {
      retrieve: jest
        .fn()
        .mockResolvedValue({ id: "!23", email: "email@email.com" }),
    },
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({
          id: "test_session_123",
          url: "https://mocked-checkout-session-url.com",
        }),
      },
    },
  }));
});

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
  savedAddress,
  savedOrder,
  savedOrder2,
  testproduct;

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

  savedOrder = testData.savedOrder;
  savedOrder2 = testData.savedOrder2;

  testproduct = testData.testproduct;
});

afterEach(async () => {
  await clearTestData();
});

describe("Order Route", () => {
  it("should let customer view all orders they made", async () => {
    const res = await request(app)
      .get(`/order/${testCustomer._id}/allorders`)
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
  });
  it("should NOT let other customer view all orders they made", async () => {
    const res = await request(app)
      .get(`/order/${testCustomer2._id}/allorders`)
      .set("Cookie", [`token=${testCustomerToken}`]);
    expect(res.statusCode).toEqual(403);
  });
  it("should let customer get their orders by order id", async () => {
    const res = await request(app)
      .get(`/order/${testCustomer._id}/findOrder/${savedOrder._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "customerId",
      savedOrder.customerId.toString()
    );
    expect(res.body).toHaveProperty("status", savedOrder.status);
    expect(res.body).toHaveProperty("totalAmount", savedOrder.totalAmount);
    expect(res.body).toHaveProperty("items", expect.any(Array));
  });
  it("should NOT let other customer view all orders they made", async () => {
    const res = await request(app)
      .get(`/order/${testCustomer2._id}/findOrder/${savedOrder2._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);
    expect(res.statusCode).toEqual(403);
  });
  it("should let customers create new order", async () => {
    const res = await request(app)
      .post(`/order/create`)
      .set("Cookie", [`token=${testCustomerToken}`])
      .send({
        customerID: testCustomer._id,
        shipping: savedAddress._id,
        cart: [
          {
            id: testproduct._id,
            image: "image",
            quantity: 1,
            name: "name",
            price: testproduct.price,
          },
        ],
        totalAmount: testproduct.price,
      });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "url",
      "https://mocked-checkout-session-url.com"
    );
  });
});
