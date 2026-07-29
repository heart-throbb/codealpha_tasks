import { useState, useEffect } from "react";
import axios from "axios";

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders", getAuthHeader());
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Paid</th>
              <th className="px-6 py-4 text-left">Delivered</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">No orders yet.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.user?.name || "N/A"}</div>
                    <div className="text-gray-500 text-xs">{order.user?.email || ""}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.orderItems?.length} item(s)</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${order.totalPrice?.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
