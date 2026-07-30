import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";

function UserCard({ user }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-xl p-4 sm:p-5">
      <img
        src={getImageUrl(user.profilePicture)}
        alt=""
        className="w-20 h-20 rounded-full mx-auto object-cover"
      />

      <h2 className="text-xl font-bold text-center mt-4">{user.username}</h2>

      <p className="text-gray-500 text-center mt-2">{user.bio || "No bio"}</p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-sm">
        <span>{user.followers?.length || 0} Followers</span>

        <span>{user.following?.length || 0} Following</span>
      </div>

      <Link
        to={`/profile/${user._id}`}
        className="block text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 mt-5"
      >
        View Profile
      </Link>
    </div>
  );
}

export default UserCard;
