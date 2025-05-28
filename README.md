# Puffy Pals

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Screenshots/Demo](#screenshotsdemo)
- [Installation guide](#installation-guide)
- [Testing](#testing)

---

## About this project:

At first it suppose to be an sword shape umbrella site. Then I change it to a cream puff site after getting hungry.
This is an e-commerce platform built with React and Node.js, featuring cart functionality, address selection, and other stuff.

---

## Features

- Add, remove, and delete items from cart
- Address selection with error handling
- Checkout flow with login redirection
- Email notifications using Nodemailer
- Persistent cart using `localStorage`
- Context API for global cart management
- Cookies to manage authentication tokens

## Tech Stack

- React
- Node.js / Express
- Material Symbols
- Nodemailer
- Stripe (for checkout and refund)

---

## Screenshots/Demo

The cart. Here you can checkout. Add extra or remove the product.
The checkout. Here you can checkout. Can change your shipping address.
The order. Here you can see your order starting from recent. Can return and review the product.
The product. Here you can add items to cart or click to view more details about the item.
The product detail. Here you see the detail page of the product. Can add reviews.

---

## Installation Guide

npm install

To run frontend:

    npm run dev

To run backend:

    node server.js

---

## Testing

To run backend:

    node server.js
