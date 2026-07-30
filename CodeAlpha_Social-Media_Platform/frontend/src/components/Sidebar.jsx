import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaUser, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 rounded-2xl shadow-xl border border-gray-300 p-4 sm:p-5 mb-6 lg:mb-0 lg:block hidden ">
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="relative">
          <img
            src={getImageUrl(user.profilePicture)}
            alt=""
            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50 shadow-sm"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent" />
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">
            {user.bio || "No bio yet"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Link
          to="/home"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
        >
          <FaHome className="text-base" />
          Home
        </Link>

        <Link
          to="/users"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
        >
          <FaUsers className="text-base" />
          Users
        </Link>

        <Link
          to={`/profile/${user.id}`}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
        >
          <FaUser className="text-base" />
          Profile
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-100 hover:text-blue-600"
        >
          <FaCog className="text-base" />
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
