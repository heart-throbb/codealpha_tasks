import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import { CartProvider } from "./context/CartContext";

const AdminRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <main className="container mx-auto px-4 py-8">
                  <Home />
                </main>
              }
            />
            <Route
              path="/product/:id"
              element={
                <main className="container mx-auto px-4 py-8">
                  <ProductDetails />
                </main>
              }
            />
            <Route
              path="/cart"
              element={
                <main className="container mx-auto px-4 py-8">
                  <Cart />
                </main>
              }
            />
            <Route
              path="/checkout"
              element={
                <main className="container mx-auto px-4 py-8">
                  <Checkout />
                </main>
              }
            />
            <Route
              path="/login"
              element={
                <main className="container mx-auto px-4 py-8">
                  <Login />
                </main>
              }
            />
            <Route
              path="/register"
              element={
                <main className="container mx-auto px-4 py-8">
                  <Register />
                </main>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
