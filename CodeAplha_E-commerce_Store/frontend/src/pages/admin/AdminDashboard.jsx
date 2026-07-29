import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:scale-105 transition-transform duration-150 hover:shadow-lg">
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/orders", getAuthHeader()),
          axios.get("http://localhost:5000/api/users", getAuthHeader()),
        ]);
        const revenue = ordersRes.data.reduce(
          (acc, o) => acc + o.totalPrice,
          0,
        );
        setStats({
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          users: usersRes.data.length,
          revenue: revenue.toFixed(2),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">
        Welcome back! Here's an overview of your store.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={Package}
          label="Total Products"
          value={stats.products}
          color="bg-indigo-500"
        />
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={stats.orders}
          color="bg-emerald-500"
        />
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.users}
          color="bg-violet-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`$${stats.revenue}`}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Manage Products",
            desc: "Add, edit, or remove products from your store.",
            to: "/admin/products",
            color: "bg-indigo-600",
          },
          {
            label: "View Orders",
            desc: "Review all customer orders and their statuses.",
            to: "/admin/orders",
            color: "bg-emerald-600",
          },
          {
            label: "Manage Users",
            desc: "View and delete user accounts.",
            to: "/admin/users",
            color: "bg-violet-600",
          },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group hover:scale-105 transition-transform duration-150 hover:shadow-lg"
          >
            <div className={`w-10 h-10 rounded-lg ${link.color} mb-4`}></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {link.label}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{link.desc}</p>
            <span className="text-indigo-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Go <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
