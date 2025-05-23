const mongoose = require("mongoose");
const Customer = require("./models/customers/customers");
const Employee = require("./models/staff/employee");
const Product = require("./models/products/products");
const bcrypt = require("bcrypt");
require("dotenv").config();

mongoose.connect(process.env.DB);

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Customer.deleteMany({});
    await Employee.deleteMany({});
    await Product.deleteMany({});

    await mongoose.connection.collection("employee").drop();
    await mongoose.connection.collection("customer").drop();

    // Seed Customer
    const customer = [
      {
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        password: await bcrypt.hash("password123", 8),
      },
      {
        email: "jane@example.com",
        first_name: "Jane",
        last_name: "Smith",
        password: await bcrypt.hash("password123", 8),
        phone: "1234567",
        birthday: "!2/04/54",
      },
    ];
    await Customer.insertMany(customer);

    // Seed Employee
    const employee = [
      {
        email: "innisfree@example.com",
        first_name: "Innisfree",
        last_name: "Sunscreen",
        role: "employee",
        phone: "12345678",
        status: "active",
        password: await bcrypt.hash("password123", 8),
      },
      {
        email: "youth@example.com",
        first_name: "Youtheory",
        last_name: "Ashwagandha",
        role: "employee",
        phone: "12345678",
        status: "inactive",
        password: await bcrypt.hash("password123", 8),
      },
      {
        email: "cera@example.com",
        first_name: "Cera",
        last_name: "Ve",
        role: "admin",
        phone: "12345678",
        status: "active",
        password: await bcrypt.hash("password123", 8),
      },
      {
        email: "differin@example.com",
        first_name: "Differin",
        last_name: "Gel",
        role: "admin",
        phone: "12345678",
        status: "inactive",
        password: await bcrypt.hash("password123", 8),
      },
    ];
    await Employee.insertMany(employee);

    // Seed products
    const products = [
      {
        name: "Cream Puff 1",
        price: 10,
        currency: "USD",
        stock: 10,
        active: false,
        description: {
          basic: "basic cream puff",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["basic", "cream"],
      },
      {
        name: "Cream Puff 2",
        price: 10,
        currency: "USD",
        stock: 0,
        active: true,
        description: {
          basic: "basic cream puff",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["vanilla"],
      },
      {
        name: "Cream Puff 3",
        price: 10,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic cream puff",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["vanilla"],
      },
      {
        name: "Chocolate Cream Puff",
        price: 13,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["chocolate"],
      },
      {
        name: "Chocolate Chip Cream Puff",
        price: 13,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["Chocolate", "chip"],
      },
      {
        name: "Chocolate Mint Cream Puff",
        price: 15,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["Chocolate", "mint"],
      },
      {
        name: "Strawberry Cream Puff",
        price: 15,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["strawberry"],
      },
      {
        name: "Cookies & Cream Cream Puff",
        price: 15,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["cookies", "cream"],
      },
      {
        name: "Rum Raisin",
        price: 15,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["rum", "raisin"],
      },
      {
        name: "Rainbow Cream Puff",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["rainbow"],
      },
      {
        name: "Matcha Cream Puff",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["matcha"],
      },
      {
        name: "Steve's Lava Chicken",
        price: 15,
        currency: "USD",
        stock: 15,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["minecraft", "lava", "chicken", "steve"],
      },
      {
        name: "Creepers",
        price: 15,
        currency: "USD",
        stock: 15,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["minecraft", "creeper"],
      },
      {
        name: "Ender Man",
        price: 15,
        currency: "USD",
        stock: 15,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["minecraft", "ender", "man"],
      },
      {
        name: "Duck",
        price: 15,
        currency: "USD",
        stock: 15,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["minecraft", "duck"],
      },
      {
        name: "Villager",
        price: 15,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["minecraft", "villager"],
      },
      {
        name: "Red Fruit Cream Puff",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["red", "fruit", "apple", "cherry", "strawberry"],
      },
      {
        name: "Pikachu",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["pokemon", "pikachu"],
      },
    ];
    await Product.insertMany(products);
  } catch (err) {
    console.error("Error seeding the database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
