import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCog } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import FollowListModal from "../components/FollowListModal";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";
import { showSuccess, showError } from "../utils/toast";

function Profile() {
  const { id } = useParams();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followList, setFollowList] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setProfile(res.data.user);
    } catch (err) {
      showError("Failed to load profile");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/posts/user/${id}`);
      setPosts(res.data.posts);
    } catch (err) {
      showError("Failed to load posts");
    }
  };

  const isFollowing = profile?.followers?.some(
    (f) => (f._id || f.id || f) === user.id,
  );

  const followUser = async () => {
    try {
      const res = await api.post(`/users/${id}/follow`);
      showSuccess(res.data.message);
      fetchProfile();
    } catch (err) {
      showError(
        err.response?.data?.message || "Failed to update follow status",
      );
    }
  };

  const removePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center mt-20">
          <div className="animate-pulse text-gray-500 text-lg">
            Loading profile...
          </div>
        </div>
      </>
    );
  }

  const isOwnProfile = String(user.id) === String(profile._id);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 grid gap-6 px-4 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        <div className="lg:col-span-9">
          <div className="bg-gray-100 border border-gray-300 rounded-3xl shadow-sm p-5 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative self-center sm:self-auto">
                <img
                  src={getImageUrl(profile.profilePicture)}
                  alt=""
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-blue-50 shadow-sm"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent" />
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {profile.username}
                  </h1>

                  {isOwnProfile && (
                    <Link
                      to="/settings"
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2.5 text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      title="Settings"
                    >
                      <FaCog />
                    </Link>
                  )}
                </div>

                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {profile.bio || "No bio yet"}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 sm:gap-6 rounded-2xl bg-gray-100 px-3 py-3 sm:px-4">
                  <button
                    onClick={() =>
                      setFollowList({
                        title: "Followers",
                        users: profile.followers,
                      })
                    }
                    className="rounded-xl px-2 py-1 text-left transition hover:cursor-pointer hover:text-blue-600"
                  >
                    <div className="font-semibold text-gray-900">
                      {profile.followers.length}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Followers
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setFollowList({
                        title: "Following",
                        users: profile.following,
                      })
                    }
                    className="rounded-xl px-2 py-1 text-left transition hover:cursor-pointer hover:text-blue-600"
                  >
                    <div className="font-semibold text-gray-900">
                      {profile.following.length}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Following
                    </div>
                  </button>
                </div>

                {!isOwnProfile && (
                  <button
                    onClick={followUser}
                    className={`mt-4 w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium transition ${
                      isFollowing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:cursor-pointer"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
                    }`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="bg-gray-100 border border-gray-300 rounded-2xl shadow-sm p-10 text-center text-gray-500">
              No posts yet
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} onDelete={removePost} />
            ))
          )}
        </div>
      </div>

      {followList && (
        <FollowListModal
          title={followList.title}
          users={followList.users}
          onClose={() => setFollowList(null)}
        />
      )}
    </>
  );
}

export default Profile;
