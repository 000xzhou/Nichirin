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
        name: "Tanjiro’s Black Sword",
        price: 14,
        currency: "USD",
        stock: 10,
        active: false,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [
          { color: "round", stock: 5, price: 11 },
          { color: "square", stock: 3, price: 16 },
        ],
        images: ["one.jpg", "two.jpg"],
        tags: ["black", "sword"],
      },
      {
        name: "Zenitsu’s Yellow Sword",
        price: 13,
        currency: "USD",
        stock: 0,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        images: ["one.jpg", "two.jpg"],
        tags: ["yellow", "sword"],
      },
      {
        name: "Inosuke’s Chipped Dual Swords",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["dual", "sword"],
      },
      {
        name: "Muichiro Tokito’s White Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["white", "sword"],
      },
      {
        name: "Mitsuri Kanroji’s Whip Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["whip", "sword"],
      },
      {
        name: "Obanai Iguro’s Twisted Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["twisted", "sword"],
      },
      {
        name: "Sanemi Shinazugawa’s Green Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["green", "sword"],
      },
      {
        name: "Kanae Kocho’s Poison Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["poison", "sword"],
      },
      {
        name: "Yoriichi Tsugikuni’s Black Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["black", "sword"],
      },
      {
        name: "Kyojuro Rengoku’s Red-Orange Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["orange", "sword"],
      },
      {
        name: "Giyu Tomioka’s Blue Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["blue", "sword"],
      },
      {
        name: "Shinobu Kocho’s Poison Stinger",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["poison", "sword"],
      },
      {
        name: "Tengen Uzui’s Dual Cleavers",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["dual", "sword"],
      },
      {
        name: "Kanao Tsuyuri’s Pink Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["pink", "sword"],
      },
      {
        name: "Kokushibo’s Demon Sword",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["demon", "sword"],
      },
      {
        name: "Gyomei Himejima’s Spiked Flail and Axe",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["spiked", "axe"],
      },
      {
        name: "Tengen Uzui’s Explosive Beads",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["explosive", "sword"],
      },
      {
        name: "Genya Shinazugawa’s Shotgun",
        price: 12,
        currency: "USD",
        stock: 10,
        active: true,
        description: {
          basic: "basic",
          details: "details",
          features: ["1", "2", "3"],
          measurements: ["4", "5"],
        },
        variations: [{ color: "blue", stock: 5, price: 11 }],
        images: ["one.jpg", "two.jpg"],
        tags: ["shotgun"],
      },
    ];
    await Product.insertMany(products);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding the database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
