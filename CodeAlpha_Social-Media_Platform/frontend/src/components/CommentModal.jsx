import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaTimes, FaPaperPlane } from "react-icons/fa";
import { showSuccess, showError } from "../utils/toast";
import { getImageUrl } from "../utils/imageUrl";

function CommentModal({
  postId,
  initialCommentCount,
  onCommentCountChange,
  onClose,
}) {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(initialCommentCount || 0);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data.comments);
      setCommentCount(res.data.count || res.data.comments.length);
      onCommentCountChange?.(res.data.count || res.data.comments.length);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await api.post("/comments", {
        postId,
        comment: text,
      });

      setComments((prev) => [res.data.comment, ...prev]);
      const nextCount = commentCount + 1;
      setCommentCount(nextCount);
      onCommentCountChange?.(nextCount);

      setText("");
      showSuccess("Comment added");
    } catch (err) {
      showError("Unable to add comment");
    }
  };

  const deleteComment = async (id) => {
    try {
      await api.delete(`/comments/${id}`);

      setComments((prev) => prev.filter((c) => c._id !== id));
      const nextCount = Math.max(0, commentCount - 1);
      setCommentCount(nextCount);
      onCommentCountChange?.(nextCount);
      showSuccess("Comment deleted");
    } catch (err) {
      showError("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
          <div>
            <h2 className="text-lg font-semibold">Comments</h2>
            <p className="text-sm text-blue-100">{commentCount} comments</p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="mb-4 rounded-2xl border border-gray-200 bg-gray-50 p-3">
            <div className="flex gap-3">
              <img
                src={getImageUrl(user.profilePicture)}
                alt="Your avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  className="min-h-18 w-full resize-none rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Write a thoughtful comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addComment();
                    }
                  }}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={addComment}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <FaPaperPlane />
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {comments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-8 text-center text-gray-500">
                No comments yet. Start the conversation.
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
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
                        onClick={() => deleteComment(comment._id)}
                        className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
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
      </div>
    </div>
  );
}

export default CommentModal;
