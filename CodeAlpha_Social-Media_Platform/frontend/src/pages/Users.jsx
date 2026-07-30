import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserCard from "../components/UserCard";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const result = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredUsers(result);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 pb-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        <div className="lg:col-span-9">
          <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-xl p-5 mb-6">
            <h1 className="text-2xl font-bold mb-4">Discover Users</h1>

            <input
              type="text"
              placeholder="Search users..."
              className="w-full border border-gray-300 rounded-lg p-3"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
