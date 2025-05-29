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
Note: the cart is save to local storage. Each device share the same cart.
<add screenshot here>
The checkout. Here you can checkout. Can change your shipping address.
<add screenshot here>
The order. Here you can see your order starting from recent. Can return and review the product.
<add screenshot here>
The return. Here you can select Which product you want for what reason and how many of that product.
<add screenshot here>
The product. Here you can add items to cart or click to view more details about the item.
<add screenshot here>
The product detail. Here you see the detail page of the product. Can add reviews.
<add screenshot here>

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
