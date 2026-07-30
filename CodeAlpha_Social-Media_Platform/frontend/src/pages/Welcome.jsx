import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Welcome() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      navigate("/home");
      return;
    }

    const timer = setTimeout(() => {
      navigate("/login");
    }, 7000);

    return () => clearTimeout(timer);
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-3xl font-bold mb-6">
          M
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to MiniSocial
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Share your thoughts, connect with people, and be part of a lively
          community. Please log in to start exploring and joining the
          conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          You’ll be redirected to the login page shortly if you don’t choose an
          option.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
