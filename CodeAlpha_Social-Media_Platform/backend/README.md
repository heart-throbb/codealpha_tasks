# MiniSocial Backend

This directory contains the backend API for the MiniSocial social media platform.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## Main Features

- User registration and login
- JWT-based authentication
- Profile picture upload support
- Post management
- Comments
- Follow/unfollow system

## Scripts

- `npm install` - install dependencies
- `npm run dev` - start the backend in development mode
- `npm start` - start the backend in production mode

## Environment Variables

Create a `.env` file in this folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Base URL

The API runs by default at:

```text
http://localhost:5000/api
```
