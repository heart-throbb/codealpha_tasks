import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          BakaStore
        </Link>
        <div className="flex items-center space-x-5">
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-indigo-600 transition-transform duration-100 hover:scale-95"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {userInfo?.isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
              title="Admin Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin
            </Link>
          )}

          {userInfo ? (
            <button
              onClick={logoutHandler}
              className="text-gray-600 hover:text-red-600 transition-transform duration-100 hover:scale-105"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 transition-transform duration-100 hover:scale-105"
              title="Login"
            >
              <User className="w-6 h-6" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
