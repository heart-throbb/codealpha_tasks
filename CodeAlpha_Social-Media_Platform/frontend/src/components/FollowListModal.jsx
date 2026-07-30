import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { getImageUrl } from "../utils/imageUrl";

function FollowListModal({ title, users, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No users yet</p>
          ) : (
            <div className="space-y-2">
              {users.map((u) => (
                <Link
                  key={u._id}
                  to={`/profile/${u._id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <img
                    src={getImageUrl(u.profilePicture)}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition"
                  />

                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {u.username}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowListModal;
