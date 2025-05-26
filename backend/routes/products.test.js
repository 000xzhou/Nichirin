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

let testStaffToken, testCustomerToken, testAdminToken;
let testproduct, testproduct2, testproduct3;

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
  // products
  testproduct = testData.testproduct;
  testproduct2 = testData.testproduct2;
  testproduct3 = testData.testproduct3;
});

afterEach(async () => {
  await clearTestData();
});

describe("Product Route", () => {
  it("should let admin create a new product", async () => {
    const item = {
      name: "peaches",
      price: 13,
      currency: "USD",
      stock: 10,
      active: true,
      description: { basic: "description", features: [], measurements: [] },
    };
    const res = await request(app)
      .post("/products/create")
      .set("Cookie", [`token=${testAdminToken}`])
      .send(item);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "peaches");
  });
  it("should let staff create a new product", async () => {
    const item = {
      name: "peaches",
      price: 13,
      currency: "USD",
      stock: 10,
      active: true,
      description: { basic: "description", features: [], measurements: [] },
    };
    const res = await request(app)
      .post("/products/create")
      .set("Cookie", [`token=${testStaffToken}`])
      .send(item);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "peaches");
  });
  it("should NOT let admin create a dup new product", async () => {
    const item = {
      name: "apple",
      price: 13,
      currency: "USD",
      stock: 10,
      active: true,
      description: { basic: "description", features: [], measurements: [] },
      overallRating: 5,
    };
    const res = await request(app)
      .post("/products/create")
      .set("Cookie", [`token=${testAdminToken}`])
      .send(item);
    expect(res.body).toHaveProperty(
      "error",
      'E11000 duplicate key error collection: test.products index: name_1 dup key: { name: "apple" }'
    );
    expect(res.statusCode).toEqual(500);
  });
  it("should NOT let customer or no token create a new product", async () => {
    const item = {
      name: "peaches",
      price: 13,
      currency: "USD",
      stock: 10,
      active: true,
      description: { basic: "description", features: [], measurements: [] },
    };
    const res = await request(app)
      .post("/products/create")
      .set("Cookie", [`token=${testCustomerToken}`])
      .send(item);
    expect(res.statusCode).toEqual(403);
    const resE = await request(app).post("/products/create").send(item);
    expect(resE.statusCode).toEqual(401);
  });
  it("should let everyone see all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toEqual([
      {
        _id: String(testproduct._id),
        name: "apple",
        price: 12,
        currency: "USD",
        stock: testproduct.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: testproduct.overallRating,
        variations: [],
        tags: ["tag"],
        images: ["one.jpg", "two.jpg"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testproduct2._id),
        name: "banana",
        price: 13,
        currency: "USD",
        stock: testproduct2.stock,
        overallRating: testproduct2.overallRating,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        images: [],
        variations: [],
        tags: ["tag", "tag2"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testproduct3._id),
        name: "cherry",
        price: 14,
        currency: "USD",
        stock: testproduct3.stock,
        active: false,
        description: { basic: "description", features: [], measurements: [] },
        tags: ["tag", "tag3"],
        variations: [],
        images: [],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should let everyone search products by name", async () => {
    const res = await request(app).get("/products/search?name=banana");

    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toEqual([
      {
        _id: String(testproduct2._id),
        name: testproduct2.name,
        price: testproduct2.price,
        currency: "USD",
        stock: testproduct2.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        tags: ["tag", "tag2"],
        overallRating: testproduct2.overallRating,
        images: [],
        variations: [],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should let everyone search products with no case and not complete word", async () => {
    const res = await request(app).get("/products/search?name=a");

    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toEqual([
      {
        _id: String(testproduct._id),
        name: "apple",
        price: 12,
        currency: "USD",
        stock: testproduct.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: 5,
        tags: ["tag"],
        variations: [],
        images: ["one.jpg", "two.jpg"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testproduct2._id),
        name: "banana",
        price: 13,
        currency: "USD",
        stock: testproduct2.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: 3,
        images: [],
        tags: ["tag", "tag2"],
        variations: [],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should let everyone search products by stock", async () => {
    const res = await request(app).get("/products/search?stock=1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toEqual([
      {
        _id: String(testproduct._id),
        name: "apple",
        price: 12,
        currency: "USD",
        stock: testproduct.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: 5,
        variations: [],
        tags: ["tag"],
        images: ["one.jpg", "two.jpg"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testproduct3._id),
        name: "cherry",
        price: 14,
        currency: "USD",
        stock: testproduct3.stock,
        active: false,
        description: { basic: "description", features: [], measurements: [] },
        variations: [],
        tags: ["tag", "tag3"],
        images: [],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
    // no stock search
    const res0 = await request(app).get("/products/search?stock=0");
    expect(res0.statusCode).toEqual(200);
    expect(res0.body.products).toEqual([
      {
        _id: String(testproduct2._id),
        name: "banana",
        price: 13,
        currency: "USD",
        stock: testproduct2.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: testproduct2.overallRating,
        variations: [],
        images: [],
        variations: [],
        tags: ["tag", "tag2"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should let everyone see all active products", async () => {
    const res = await request(app).get("/products/active");
    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toEqual([
      {
        _id: String(testproduct._id),
        name: "apple",
        price: 12,
        currency: "USD",
        stock: testproduct.stock,
        variations: [],
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: testproduct.overallRating,
        tags: ["tag"],
        images: ["one.jpg", "two.jpg"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testproduct2._id),
        name: "banana",
        price: 13,
        currency: "USD",
        stock: testproduct2.stock,
        active: true,
        description: { basic: "description", features: [], measurements: [] },
        overallRating: testproduct2.overallRating,
        variations: [],
        images: [],
        tags: ["tag", "tag2"],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should let employee see all inactive products", async () => {
    const res = await request(app)
      .get("/products/inactive")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body.products).toEqual([
      {
        _id: String(testproduct3._id),
        name: "cherry",
        price: 14,
        currency: "USD",
        stock: testproduct3.stock,
        active: false,
        description: { basic: "description", features: [], measurements: [] },
        variations: [],
        tags: ["tag", "tag3"],
        images: [],
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should NOT let customers and no token see all inactive products", async () => {
    const res = await request(app)
      .get("/products/inactive")
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(403);

    const res0 = await request(app).get("/products/inactive");

    expect(res0.statusCode).toEqual(401);
  });
  it("should let everyone see products by id", async () => {
    const res = await request(app).get(`/products/${testproduct3._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testproduct3._id),
      name: "cherry",
      price: 14,
      currency: "USD",
      stock: testproduct3.stock,
      active: false,
      description: { basic: "description", features: [], measurements: [] },
      variations: [],
      tags: ["tag", "tag3"],
      images: [],
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should let employee edit products", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct3._id}`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({ price: 0 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testproduct3._id),
      name: "cherry",
      price: 0,
      currency: "USD",
      stock: testproduct3.stock,
      active: false,
      tags: ["tag", "tag3"],
      variations: [],
      description: { basic: "description", features: [], measurements: [] },
      images: [],
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should NOT let non-employee edit products", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct3._id}`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({ price: 0 });

    expect(res.statusCode).toEqual(403);

    const res0 = await request(app)
      .patch(`/products/${testproduct3._id}`)
      .send({ price: 0 });

    expect(res0.statusCode).toEqual(401);
  });

  it("should let employee add products variations", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/variation`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({ color: 0, stock: 1, price: 2 });

    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual({
      _id: String(testproduct2._id),
      name: "banana",
      price: 13,
      currency: "USD",
      stock: testproduct2.stock,
      active: true,
      description: { basic: "description", features: [], measurements: [] },
      overallRating: testproduct2.overallRating,
      tags: ["tag", "tag2"],
      variations: expect.arrayContaining([
        expect.objectContaining({
          color: expect.any(String),
          price: expect.any(Number),
          stock: expect.any(Number),
        }),
      ]),
      images: [],
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should NOT let non-employee add products variations", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/variation`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({ color: 0, stock: 1, price: 2 });

    expect(res.statusCode).toEqual(403);

    const res0 = await request(app)
      .patch(`/products/${testproduct2._id}/variation`)
      .send({ color: 0, stock: 1, price: 2 });

    expect(res0.statusCode).toEqual(401);
  });
  it("should NOT let non-employee edit products variations", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct._id}/variation/blue`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({ color: "red", stock: 1, price: 2 });

    expect(res.statusCode).toEqual(403);

    const res0 = await request(app)
      .patch(`/products/${testproduct._id}/variation/blue`)
      .send({ color: "red", stock: 1, price: 2 });

    expect(res0.statusCode).toEqual(401);
  });

  it("should let employee add product images", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/addImages`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({
        images: ["image1.jpg"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.images).toEqual(["image1.jpg"]);
  });
  it("should let employee add multiply product images", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/addImages`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({
        images: ["image1.jpg", "image2.jpg"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.images).toEqual(["image1.jpg", "image2.jpg"]);
  });
  it("should NOT let non-employee add product images", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct._id}/addImages`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({
        images: ["image1.jpg", "image2.jpg"],
      });

    expect(res.statusCode).toEqual(403);

    const res0 = await request(app)
      .patch(`/products/${testproduct._id}/addImages`)
      .send({
        images: ["image1.jpg", "image2.jpg"],
      });

    expect(res0.statusCode).toEqual(401);
  });
  it("should let employee remove product images", async () => {
    const res = await request(app)
      .delete(`/products/${testproduct._id}/deleteImage`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({
        image: "one.jpg",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.images).toEqual(["two.jpg"]);
  });
  it("should NOT let non-employee remove product images", async () => {
    const res = await request(app)
      .delete(`/products/${testproduct._id}/deleteImage`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({
        image: "one.jpg",
      });

    expect(res.statusCode).toEqual(403);

    const res0 = await request(app)
      .delete(`/products/${testproduct._id}/deleteImage`)
      .send({
        image: "one.jpg",
      });

    expect(res0.statusCode).toEqual(401);
  });
  it("should let admin delete products", async () => {
    const res = await request(app)
      .delete(`/products/${testproduct._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(204);

    const resCheck = await request(app)
      .get(`/products/${testproduct._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(resCheck.statusCode).toEqual(404);
  });
  it("should NOT let non-admin delete products", async () => {
    const res = await request(app)
      .delete(`/products/${testproduct._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(res.statusCode).toEqual(403);

    const res2 = await request(app)
      .delete(`/products/${testproduct._id}`)
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res2.statusCode).toEqual(403);

    const res0 = await request(app).delete(`/products/${testproduct._id}`);

    expect(res0.statusCode).toEqual(401);
  });
  it("should let employee add a tag", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/addtags`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({
        tags: ["tag4"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.tags).toEqual(["tag", "tag2", "tag4"]);
  });
  it("should let employee add tags", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/addtags`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({
        tags: ["tag4", "tag5"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.tags).toEqual(["tag", "tag2", "tag4", "tag5"]);
  });
  it("should NOT let non-employee add tags", async () => {
    const res = await request(app)
      .patch(`/products/${testproduct2._id}/addtags`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({
        tags: ["tag4", "tag5"],
      });
    expect(res.statusCode).toEqual(403);
  });

  it("should let employee remove a tag", async () => {
    const res = await request(app)
      .delete(`/products/${testproduct2._id}/deleteTag`)
      .set("Cookie", [`token=${testStaffToken}`])

      .send({
        tag: "tag",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.tags).toEqual(["tag2"]);
  });
  it("should NOT let non-employee add tags", async () => {
    const res = await request(app)
      .delete(`/products/${testproduct2._id}/deleteTag`)
      .set("Cookie", [`token=${testCustomerToken}`])

      .send({
        tags: ["tag"],
      });
    expect(res.statusCode).toEqual(403);
  });
});
