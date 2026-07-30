import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search, SlidersHorizontal, PackageCheck } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const limit = maxPrice === "" ? Infinity : Number(maxPrice);

    return [...products]
      .filter((product) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        const matchesPrice = Number(product.price) <= limit;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchTerm, selectedCategory, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice("");
    setSortBy("featured");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-700">
          <SlidersHorizontal size={18} className="text-indigo-600" />
          Filters & search
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto]">
          <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
            <Search size={18} className="text-gray-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products, categories, or keywords"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            <span>Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            <span>Max price</span>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Any price"
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <button
            onClick={clearFilters}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            Clear filters
          </button>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
          <PackageCheck size={32} className="mx-auto mb-3 text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            No products match your filters.
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Try widening the search or clearing a few filters to see more
            results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
