import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold text-blue-600">
          MiniSocial
        </Link>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-2 py-1.5 shadow-md hover:cursor-pointer"
            >
              <img
                src={getImageUrl(user?.profilePicture)}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                {user?.username}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-gray-100 p-2 shadow-xl">
                <Link
                  to="/home"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
                >
                  <FaHome />
                  Home
                </Link>

                <Link
                  to={`/profile/${user.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
                >
                  <FaUser />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
                >
                  <FaCog />
                  Settings
                </Link>

                <Link
                  to="/users"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
                >
                  <FaUsers />
                  Users
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
