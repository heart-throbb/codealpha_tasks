import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users",
        getAuthHeader(),
      );
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        getAuthHeader(),
      );
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Error deleting user",
        "error",
      );
    }
  };

  const handleRole = async (user) => {
    const currentUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!currentUser?.isMainAdmin) {
      showNotification("Only the main admin can change user roles.", "error");
      return;
    }
    if (user._id === currentUser._id) return;
    if (
      !window.confirm("Are you sure you want to change the role of this user?")
    )
      return;

    const newRole = !user.isAdmin;
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}/role`,
        { isAdmin: newRole },
        getAuthHeader(),
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, isAdmin: newRole } : u)),
      );
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Error updating role",
        "error",
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">{users.length} registered users</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  {user.isAdmin ? (
                    <button
                      onClick={() => handleRole(user)}
                      className="flex items-center gap-1 text-indigo-700 bg-indigo-50 hover:bg-red-50 hover:text-red-600 px-2 py-1 rounded-full text-xs font-medium w-fit transition-colors cursor-pointer"
                      title="Remove Admin"
                    >
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRole(user)}
                      className="text-gray-500 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      title="Make Admin"
                    >
                      <ShieldOff className="w-3 h-3" /> User
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {!user.isAdmin && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform duration-150"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
