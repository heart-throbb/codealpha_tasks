import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      showNotification("Your cart is empty.", "info");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo?.token) {
      showNotification("Please log in before placing an order.", "error");
      navigate("/login?redirect=checkout");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.imageUrl || item.image || "",
          price: item.price,
          product: item.product,
        })),
        totalPrice: cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0,
        ),
      };

      await axios.post("http://localhost:5000/api/orders", payload, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      clearCart();
      showNotification("Order placed successfully!", "success");
      navigate("/");
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Unable to place order.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Complete your order
          </h1>
        </div>
        <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
          {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Order Summary
        </h2>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="flex items-center justify-between text-sm text-gray-700"
            >
              <span>
                {item.name} <span className="text-gray-400">× {item.qty}</span>
              </span>
              <span className="font-medium">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>
            $
            {cartItems
              .reduce((acc, item) => acc + item.price * item.qty, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={submitting}
        className="flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
