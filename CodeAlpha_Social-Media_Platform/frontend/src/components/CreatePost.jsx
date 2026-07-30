import { useState } from "react";
import api from "../services/api";
import { showSuccess, showError } from "../utils/toast";

function CreatePost({ onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      return showError("Caption is required");
    }

    try {
      setLoading(true);

      const res = await api.post("/posts", {
        caption,
        image,
      });

      onPostCreated(res.data.post);

      setCaption("");
      setImage("");
      showSuccess("Post created!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 border-gray-300 shadow-xl rounded-xl p-4 sm:p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows="4"
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="w-full sm:w-auto mt-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition hover:cursor-pointer">
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
