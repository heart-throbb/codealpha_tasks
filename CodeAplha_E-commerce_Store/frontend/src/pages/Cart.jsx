import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=checkout"); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-indigo-600 font-medium hover:underline">
            Go back to shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-indigo-600 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <select
                      value={item.qty}
                      onChange={(e) => addToCart(item, Number(e.target.value))}
                      className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.product)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items)
              </span>
              <span className="font-bold text-gray-900">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-transform duration-300 hover:scale-95 hover:shadow-lg hover:shadow-indigo-300 flex items-center justify-center hover:cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
