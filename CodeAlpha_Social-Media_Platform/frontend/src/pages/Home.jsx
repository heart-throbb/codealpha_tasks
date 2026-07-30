import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

import api from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");

      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  const removePost = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  if (loading) {
    return <h2 className="text-center mt-20">Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 pb-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        <div className="lg:col-span-6">
          <CreatePost onPostCreated={addPost} />

          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={removePost} />
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="bg-gray-100 rounded-xl shadow-xl border-gray-400 p-5">
            <h2 className="font-bold text-xl">Feed</h2>

            <p className="text-gray-500 mt-3">{posts.length} Posts</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
