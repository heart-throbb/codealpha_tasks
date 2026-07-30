import { useState } from "react";
import { FaHeart, FaRegHeart, FaTrash, FaComment } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CommentModal from "./CommentModal";
import ConfirmDialog from "./ConfirmDialog";
import api from "../services/api";
import { getImageUrl } from "../utils/imageUrl";
import { showSuccess, showError } from "../utils/toast";

function PostCard({ post, onDelete }) {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes || []);
  const [showComments, setShowComments] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const hasLiked = likes.some(
    (like) => (like._id || like.id || like) === user.id,
  );

  const handleLike = async () => {
    try {
      await api.post(`/posts/${post._id}/like`);

      if (hasLiked) {
        setLikes(
          likes.filter((like) => (like._id || like.id || like) !== user.id),
        );
      } else {
        setLikes([...likes, user.id]);
      }
    } catch (err) {
      showError("Unable to like post");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post._id}`);

      onDelete(post._id);
      showSuccess("Post deleted");
    } catch (err) {
      showError(err.response?.data?.message || "Delete failed");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-xl border border-gray-300 p-4 sm:p-5 mb-6">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={getImageUrl(post.user.profilePicture)}
            className="w-12 h-12 rounded-full object-cover"
            alt=""
          />

          <div className="min-w-0">
            <h2 className="font-bold break-words">{post.user.username}</h2>

            <p className="text-gray-500 text-sm break-words">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {(post.user._id || post.user.id) === user.id && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        )}
      </div>

      {/* Caption */}

      <p className="mt-4 text-gray-700 whitespace-pre-wrap">{post.caption}</p>

      {/* Image */}

      {post.image && (
        <img src={post.image} alt="" className="rounded-xl mt-4 w-full" />
      )}

      {/* Footer */}

      <div className="flex flex-wrap gap-4 sm:gap-6 mt-5">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 py-1 hover:cursor-pointer"
        >
          {hasLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}

          {likes.length}
        </button>

        <button
          onClick={() => setShowComments(true)}
          className="flex items-center gap-2 py-1 hover:cursor-pointer"
        >
          <FaComment />
          Comment
        </button>
      </div>
      {showComments && (
        <CommentModal
          postId={post._id}
          onClose={() => setShowComments(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default PostCard;
