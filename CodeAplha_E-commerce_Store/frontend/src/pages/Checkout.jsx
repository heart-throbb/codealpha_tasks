import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert("Order placed successfully! (This is a mock checkout)");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.product} className="flex justify-between mb-2">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4 font-bold flex justify-between">
          <span>Total:</span>
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
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
