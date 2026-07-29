# E-commerce Store

A full-stack e-commerce web application built with React, Vite, Node.js, Express, and MongoDB. This project includes a customer-facing storefront with product browsing, cart management, checkout, and admin tools for managing products, orders, and users.

## Features

- Customer registration and login
- Product listing and product detail pages
- Shopping cart and checkout flow
- Admin dashboard for managing products, orders, and users
- Secure authentication using JWT
- RESTful API backend with MongoDB storage

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS support

## Project Structure

- frontend: React application and UI pages
- backend: Express API, routes, controllers, and MongoDB models

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:5173.

## Usage

- Visit the store homepage to browse products
- Create an account or log in as a customer
- Add products to the cart and proceed to checkout
- Use admin routes to manage the store

## Notes

This repository is intended as a practical full-stack e-commerce project and can be extended with features such as payment integration, order tracking, product search, and filtering.
