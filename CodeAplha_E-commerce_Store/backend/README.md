# E-commerce Store Backend

This backend is an Express.js API for the E-commerce Store project. It provides authentication, product management, order processing, cart handling, and user endpoints backed by MongoDB.

## Features

- Express server with JSON body parsing and CORS enabled
- MongoDB connection via Mongoose
- JWT-based authentication
- RESTful routes for products, orders, carts, users, and auth
- Local development with Nodemon

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB connection URI

### Install dependencies

```bash
cd backend
npm install
```

### Environment variables

Create a `.env` file at the project root with values for:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Run locally

For development with automatic restarts:

```bash
npm run dev
```

For production-like start:

```bash
npm start
```

The server listens on `http://localhost:5000` by default.

## API Endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/orders` (admin/customer)
- `POST /api/orders`
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:id`
- `DELETE /api/cart/:id`
- `GET /api/users` (admin)
- `GET /api/users/:id` (admin)
- `PUT /api/users/:id`

> Note: The exact route behavior is implemented in `backend/routes/`.

## Project Structure

- `server.js` - main application entry point
- `controllers/` - request handlers
- `routes/` - API route definitions
- `models/` - Mongoose schemas
- `middleware/` - auth middleware

## Notes

- Ensure the frontend is configured to use the backend URL `http://localhost:5000`.
- If you add new environment variables, restart the server after updating `.env`.
