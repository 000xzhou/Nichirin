const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Empoyee = require("../models/staff/employee");
const {
  setupDatabase,
  teardownDatabase,
  createTestData,
  clearTestData,
  getTestData,
} = require("./_testCommon");

let testCustomer,
  testemployee,
  testAdmin,
  testemployee2,
  testInEmployee,
  testStaffToken,
  testStaffToken2,
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
  testemployee = testData.testemployee;
  testemployee2 = testData.testemployee2;
  testInEmployee = testData.testInEmployee;
  testAdmin = testData.testAdmin;
  testStaffToken2 = testData.testStaffToken2;
});

afterEach(async () => {
  await clearTestData();
});

describe("Employee Route", () => {
  it("should let admin create an account for employee and admin", async () => {
    const user = {
      email: "empUser@email.com",
      first_name: "fname",
      last_name: "lname",
      password: 123,
      phone: 987123,
      role: "employee",
      status: "active",
    };
    const userAdmin = {
      email: "AdminUser@email.com",
      first_name: "fname",
      last_name: "lname",
      password: 123,
      phone: 987123,
      role: "admin",
      status: "active",
    };
    // make normal employee
    const resE = await request(app)
      .post("/employee/create")
      .set("Cookie", [`token=${testAdminToken}`])
      .send(user);
    expect(resE.statusCode).toEqual(201);
    expect(resE.body.token).toEqual(expect.any(String));
    expect(resE.body.employee).toHaveProperty("email", "empUser@email.com");
    // make admin
    const resA = await request(app)
      .post("/employee/create")
      .set("Cookie", [`token=${testAdminToken}`])
      .send(userAdmin);
    expect(resA.statusCode).toEqual(201);
    expect(resA.body.token).toEqual(expect.any(String));
    expect(resA.body.employee).toHaveProperty("email", "AdminUser@email.com");
  });
  it("should NOT let employee create an account for employee", async () => {
    const user = {
      email: "empUser@email.com",
      first_name: "fname",
      last_name: "lname",
      password: 123,
      phone: 987123,
      role: "employee",
      status: "active",
    };
    const res = await request(app)
      .post("/employee/create")
      .set("Cookie", [`token=${testStaffToken}`])
      .send(user);

    expect(res.statusCode).toEqual(403);
  });
  it("should NOT let anyone that isn't an admin (customers and no tokens) create an account for employee", async () => {
    const user = {
      email: "empUser@email.com",
      first_name: "fname",
      last_name: "lname",
      password: 123,
      phone: 987123,
      role: "employee",
      status: "active",
    };
    // test customer access
    const res = await request(app)
      .post("/employee/create")
      .set("Cookie", [`token=${testCustomerToken}`])
      .send(user);
    expect(res.statusCode).toEqual(403);
    // test no login access
    const resN = await request(app).post("/employee/create").send(user);
    expect(resN.statusCode).toEqual(401);
  });
  it("should let employee login", async () => {
    const res = await request(app)
      .post("/employee/login")
      .send({ email: "eemail@email.com", password: "123" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.employee).toHaveProperty("email", "eemail@email.com");
  });
  it("should let admin login", async () => {
    const res = await request(app)
      .post("/employee/login")
      .send({ email: "eemail2@email.com", password: "123" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.employee).toHaveProperty("email", "eemail2@email.com");
  });
  it("should let admin returns list of all employee", async () => {
    const res = await request(app)
      .get("/employee")
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("employees", [
      {
        _id: String(testemployee._id),
        email: String(testemployee.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "active",
        phone: 123456789,
        role: "employee",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testemployee2._id),
        email: String(testemployee2.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "active",
        phone: 123456789,
        role: "employee",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testAdmin._id),
        email: String(testAdmin.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "active",
        phone: 123456789,
        role: "admin",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testInEmployee._id),
        email: String(testInEmployee.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "inactive",
        phone: 123456789,
        role: "employee",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should NOT let non-admins (employee, customers and no token) returns list of all employee", async () => {
    // employee that's not admin level
    const resE = await request(app)
      .get("/employee")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(resE.statusCode).toEqual(403);
    // customers
    const resC = await request(app)
      .get("/employee")
      .set("Cookie", [`token=${testCustomerToken}`]);
    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app).get("/employee");
    expect(res.statusCode).toEqual(401);
  });
  it("should let admin returns list of all active employee", async () => {
    const res = await request(app)
      .get("/employee/active")
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("employees", [
      {
        _id: String(testemployee._id),
        email: String(testemployee.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "active",
        phone: 123456789,
        role: "employee",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testemployee2._id),
        email: String(testemployee2.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "active",
        phone: 123456789,
        role: "employee",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
      {
        _id: String(testAdmin._id),
        email: String(testAdmin.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "active",
        phone: 123456789,
        role: "admin",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should NOT let anyone that's not admin returns list of all active employee", async () => {
    // employee that's not admin level
    const resE = await request(app)
      .get("/employee/active")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(resE.statusCode).toEqual(403);
    // customers
    const resC = await request(app)
      .get("/employee/active")
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app).get("/employee/active");
    expect(res.statusCode).toEqual(401);
  });
  it("should let admin returns list of all nonactive employee", async () => {
    const res = await request(app)
      .get("/employee/inactive")
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("employees", [
      {
        _id: String(testInEmployee._id),
        email: String(testInEmployee.email),
        first_name: "efname2",
        last_name: "elname2",
        password: expect.any(String),
        status: "inactive",
        phone: 123456789,
        role: "employee",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        __v: 0,
      },
    ]);
  });
  it("should NOT let anyone that's not admin returns list of all nonactive employee", async () => {
    // employee that's not admin level
    const resE = await request(app)
      .get("/employee/inactive")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(resE.statusCode).toEqual(403);
    // customers
    const resC = await request(app)
      .get("/employee/inactive")
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app).get("/employee/inactive");
    expect(res.statusCode).toEqual(401);
  });
  it("should let admin search for an employee though email", async () => {
    const res = await request(app)
      .get("/employee/search?email=eemail@email.com")
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testemployee._id),
      email: String(testemployee.email),
      first_name: "efname2",
      last_name: "elname2",
      password: expect.any(String),
      status: "active",
      phone: 123456789,
      role: "employee",
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should NOT let anyone that's not admin search for an employee though email", async () => {
    // employee that's not admin level
    const resE = await request(app)
      .get("/employee/search?email=eemail@email.com")
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(resE.statusCode).toEqual(403);
    // customers
    const resC = await request(app)
      .get("/employee/search?email=eemail@email.com")
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app).get(
      "/employee/search?email=eemail@email.com"
    );
    expect(res.statusCode).toEqual(401);
  });
  it("should let admin view an employee info", async () => {
    const res = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testemployee._id),
      email: String(testemployee.email),
      first_name: "efname2",
      last_name: "elname2",
      password: expect.any(String),
      status: "active",
      phone: 123456789,
      role: "employee",
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should let employee view their own employee info", async () => {
    const res = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testStaffToken}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testemployee._id),
      email: String(testemployee.email),
      first_name: "efname2",
      last_name: "elname2",
      password: expect.any(String),
      status: "active",
      phone: 123456789,
      role: "employee",
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should NOT let anyone that's not admin or the related employee view others info", async () => {
    // other active employee
    const resE = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testStaffToken2}`]);

    expect(resE.statusCode).toEqual(403);
    // Customer
    const resC = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app).get(`/employee/${testemployee._id}`);
    expect(res.statusCode).toEqual(401);
  });
  it("should let admin update employee info", async () => {
    const data = { status: "inactive" };
    const res = await request(app)
      .patch(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testAdminToken}`])
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testemployee._id),
      email: String(testemployee.email),
      first_name: "efname2",
      last_name: "elname2",
      password: expect.any(String),
      status: "inactive",
      phone: 123456789,
      role: "employee",
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should let employee update their own info", async () => {
    const data = { first_name: "new first" };
    const res = await request(app)
      .patch(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testStaffToken}`])
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      _id: String(testemployee._id),
      email: String(testemployee.email),
      first_name: "new first",
      last_name: "elname2",
      password: expect.any(String),
      status: "active",
      phone: 123456789,
      role: "employee",
      created_at: expect.any(String),
      updated_at: expect.any(String),
      __v: 0,
    });
  });
  it("should NOT let anyone that's not admin or the related employee update employee info", async () => {
    const data = { status: "inactive" };
    // other active employee
    const resE = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testStaffToken2}`])
      .send(data);
    expect(resE.statusCode).toEqual(403);
    // Customer
    const resC = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testCustomerToken}`])
      .send(data);
    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app)
      .get(`/employee/${testemployee._id}`)
      .send(data);
    expect(res.statusCode).toEqual(401);
  });
  it("should let admin delete and employee account", async () => {
    const res = await request(app)
      .delete(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(res.statusCode).toEqual(204);
    // get the delete employee
    const resCheck = await request(app)
      .get(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testAdminToken}`]);

    expect(resCheck.statusCode).toEqual(404);
  });
  it("should NOT let non-admins (employee, customers and no token) delete and employee account", async () => {
    // active employee
    const resE = await request(app)
      .delete(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testStaffToken2}`]);

    expect(resE.statusCode).toEqual(403);
    // Customer
    const resC = await request(app)
      .delete(`/employee/${testemployee._id}`)
      .set("Cookie", [`token=${testCustomerToken}`]);

    expect(resC.statusCode).toEqual(403);
    // no token
    const res = await request(app).delete(`/employee/${testemployee._id}`);
    expect(res.statusCode).toEqual(401);
  });
});
