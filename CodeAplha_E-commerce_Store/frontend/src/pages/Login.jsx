import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification } = useNotification();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      showNotification("Signed in successfully.", "success");
      window.location.href = redirect.startsWith("/")
        ? redirect
        : `/${redirect}`;
    } catch (err) {
      showNotification(err.response?.data?.message || err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Sign In
      </h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-transform duration-300 hover:scale-95 hover:shadow-lg hover:shadow-indigo-300 flex items-center justify-center hover:cursor-pointer"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        New Customer?{" "}
        <Link
          to="/register"
          className="text-indigo-600 font-medium hover:underline"
        >
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
