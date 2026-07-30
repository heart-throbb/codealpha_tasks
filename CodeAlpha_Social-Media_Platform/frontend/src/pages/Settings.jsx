import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCamera, FaLock, FaUser, FaArrowLeft } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";
import { showSuccess, showError } from "../utils/toast";

function Settings() {
  const { user, updateUser } = useAuth();

  const fileInputRef = useRef(null);

  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preview, setPreview] = useState(getImageUrl(user?.profilePicture));
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handlePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError("Image must be under 5MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploadingPicture(true);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const res = await api.post("/users/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateUser(res.data.user);
      setPreview(getImageUrl(res.data.user.profilePicture));
      showSuccess("Profile picture updated!");
    } catch (err) {
      setPreview(getImageUrl(user?.profilePicture));
      showError(err.response?.data?.message || "Failed to upload picture");
    } finally {
      setUploadingPicture(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const res = await api.put("/users/profile", profileForm);
      updateUser(res.data.user);
      showSuccess("Profile updated successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    setChangingPassword(true);

    try {
      await api.put("/users/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showSuccess("Password changed successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 grid gap-6 px-4 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center gap-3">
            <Link
              to={`/profile/${user.id}`}
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <FaArrowLeft />
            </Link>

            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>

          {/* Profile Picture */}
          <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-300 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaCamera className="text-blue-500" />
              Profile Picture
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative group">
                <img
                  src={preview}
                  alt=""
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-50"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPicture}
                  className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition"
                >
                  <FaCamera className="text-2xl" />
                </button>
              </div>

              <div>
                <p className="text-gray-600 mb-3">
                  Upload a new profile photo. JPG, PNG, GIF or WebP up to 5MB.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPicture}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition disabled:opacity-50 hover:cursor-pointer"
                >
                  {uploadingPicture ? "Uploading..." : "Change Picture"}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-300 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Profile Info
            </h2>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>

                <input
                  type="text"
                  value={profileForm.username}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, username: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>

                <textarea
                  rows="3"
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                  className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition disabled:opacity-50 hover:cursor-pointer"
              >
                {savingProfile ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-300 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaLock className="text-blue-500" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>

                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>

                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={changingPassword}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium transition disabled:opacity-50 hover:cursor-pointer"
              >
                {changingPassword ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
