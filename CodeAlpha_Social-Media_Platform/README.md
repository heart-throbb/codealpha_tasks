# MiniSocial

MiniSocial is a full-stack social media platform where users can register, log in, create posts, follow others, view profiles, and interact with content.

## Project Structure

- frontend: React + Vite client application
- backend: Node.js + Express REST API with MongoDB

## Features

- User authentication and authorization
- Create, view, and manage posts
- Follow and unfollow users
- View user profiles and activity
- Upload profile pictures
- Responsive UI for desktop and mobile

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Multer for file uploads

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB running locally or remotely

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in the backend folder with your environment variables.
5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Environment Variables

Set the following variables in the backend `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Notes

- The backend serves uploaded files from the uploads folder.
- The frontend expects the backend API to run at http://localhost:5000/api.
