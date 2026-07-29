# E-commerce Store Frontend

This frontend is a React + Vite application for the E-commerce Store project. It includes customer shopping pages, authentication, checkout flow, and admin screens.

## Features

- React 19 with Vite
- Tailwind CSS for styling
- Client-side routing using React Router
- Axios for API requests to the backend
- Cart context for shopping cart state
- Admin dashboard pages for products, orders, and users

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:5000`

### Install dependencies

```bash
cd frontend
npm install
```

### Run locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` - main route layout and admin guard
- `src/main.jsx` - app entry point
- `src/components/` - reusable UI components
- `src/pages/` - public and admin page views
- `src/context/CartContext.jsx` - cart state management
- `src/index.css` - global styling

## Backend Connection

The frontend currently requests data from the backend using `http://localhost:5000`. Ensure the backend is running and reachable before using the app.

## Notes

- User authentication state is stored in `localStorage` as `userInfo`.
- Admin pages are protected by a client-side route guard in `App.jsx`.
- Update API endpoints if you switch the backend host or add proxy support.
