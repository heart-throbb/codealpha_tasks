import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 bg-gray-50 flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="text-sm text-indigo-600 font-semibold tracking-wider uppercase mb-2">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-900 font-light mb-6">
            ${product.price?.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${product.countInStock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center transition-colors duration-300 ${
              product.countInStock > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-95 hover:shadow-lg hover:shadow-indigo-300 hover:cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
