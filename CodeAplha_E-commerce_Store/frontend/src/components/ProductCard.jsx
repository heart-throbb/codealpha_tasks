import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const isAvailable = product.countInStock > 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              isAvailable
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            {isAvailable ? "In stock" : "Sold out"}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400">Free shipping over $50</p>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
