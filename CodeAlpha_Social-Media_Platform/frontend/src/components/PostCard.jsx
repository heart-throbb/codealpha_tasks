import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaTrash,
  FaComment,
  FaPaperPlane,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "./ConfirmDialog";
import api from "../services/api";
import { getImageUrl } from "../utils/imageUrl";
import { showSuccess, showError } from "../utils/toast";

function PostCard({ post, onDelete }) {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes || []);
  const [likeCount, setLikeCount] = useState((post.likes || []).length);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const hasLiked = likes.some(
    (like) => (like._id || like.id || like) === user.id,
  );

  useEffect(() => {
    if (!showComments) return;

    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${post._id}`);
        setComments(res.data.comments || []);
        setCommentCount(res.data.count || res.data.comments.length);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, [post._id, showComments]);

  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${post._id}/like`);

      if (hasLiked) {
        setLikes((prev) =>
          prev.filter((like) => (like._id || like.id || like) !== user.id),
        );
      } else {
        setLikes((prev) => [...prev, user.id]);
      }

      setLikeCount(res.data.likes);
    } catch (err) {
      showError("Unable to like post");
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await api.post("/comments", {
        postId: post._id,
        comment: commentText,
      });

      setComments((prev) => [res.data.comment, ...prev]);
      setCommentCount((prev) => prev + 1);
      setCommentText("");
      showSuccess("Comment added");
    } catch (err) {
      showError("Unable to add comment");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
      setCommentCount((prev) => Math.max(0, prev - 1));
      showSuccess("Comment deleted");
    } catch (err) {
      showError("Delete failed");
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
    <div className="mb-6 rounded-xl border border-gray-300 bg-gray-100 p-4 shadow-xl sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={getImageUrl(post.user.profilePicture)}
            className="h-12 w-12 rounded-full object-cover"
            alt=""
          />

          <div className="min-w-0">
            <h2 className="font-bold wrap-break-word">{post.user.username}</h2>

            <p className="text-sm text-gray-500 wrap-break-word">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {(post.user._id || post.user.id) === user.id && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
          >
            <FaTrash />
          </button>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-gray-700">{post.caption}</p>

      {post.image && (
        <img src={post.image} alt="" className="mt-4 w-full rounded-xl" />
      )}

      <div className="mt-5 border-t border-gray-200 pt-4">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <button onClick={handleLike}>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 font-medium text-red-500 hover:cursor-pointer hover:bg-red-100">
              {hasLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              {likeCount} likes
            </span>
          </button>

          <button onClick={() => setShowComments((prev) => !prev)}>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:cursor-pointer hover:bg-blue-100">
              <FaComment className="text-blue-600" />
              {commentCount} comments
            </span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-100 p-3 shadow-md">
            <div className="flex gap-3">
              <img
                src={getImageUrl(user.profilePicture)}
                alt="Your avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  className="min-h-18 w-full resize-none rounded-2xl border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleAddComment}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 hover:cursor-pointer"
                  >
                    <FaPaperPlane />
                    Post
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {comments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-6 text-center text-sm text-gray-500">
                  No comments yet. Start the conversation.
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="rounded-2xl border border-gray-400 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <img
                          src={getImageUrl(comment.user.profilePicture)}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {comment.user.username}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-gray-700">
                            {comment.comment}
                          </p>
                        </div>
                      </div>

                      {(comment.user._id || comment.user.id) === user.id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 hover:cursor-pointer"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

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
