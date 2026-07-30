import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaTimes } from "react-icons/fa";
import { showSuccess, showError } from "../utils/toast";

function CommentModal({ postId, onClose }) {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data.comments);
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

      setComments([res.data.comment, ...comments]);

      setText("");
      showSuccess("Comment added");
    } catch (err) {
      showError("Unable to add comment");
    }
  };

  const deleteComment = async (id) => {
    try {
      await api.delete(`/comments/${id}`);

      setComments(comments.filter((c) => c._id !== id));
      showSuccess("Comment deleted");
    } catch (err) {
      showError("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-gray-100 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Comments</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition hover:cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-5">
            <input
              className="border border-gray-300 rounded-xl p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
            />

            <button
              onClick={addComment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-medium transition"
            >
              Post
            </button>
          </div>

          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border border-gray-300 rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {comment.user.username}
                      </h3>

                      <p className="text-gray-700 mt-1">{comment.comment}</p>
                    </div>

                    {(comment.user._id || comment.user.id) === user.id && (
                      <button
                        onClick={() => deleteComment(comment._id)}
                        className="text-red-400 hover:text-red-600 transition"
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
