// ─────────────────────────────────────────────
// Home.jsx  →  The homepage
//
// KEY CONCEPTS HERE:
//   • useState for selected category filter
//   • .filter() to show only matching products
//   • .slice() to limit how many products show
//   • Spread + Set for unique category list
//   • Responsive grid with Tailwind
// ─────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Zap, ChevronRight } from "lucide-react";

function Home() {
  // null = "All categories" (no filter applied)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get unique categories from data:
  // 1. products.map(p => p.category) → ["phones","phones","computers","computers",...]
  // 2. new Set(...)                  → {"phones", "computers", "smartwatches", "accessories"}  (no duplicates)
  // 3. [...new Set(...)]             → ["phones", "computers", "smartwatches", "accessories"]
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter products based on selected category
  // If null (All), show everything. Otherwise filter by category.
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // Only show 6 products on homepage (use .slice to cut the array)
  const displayedProducts = filteredProducts.slice(0, 6);
  // slice(0, 6) = take items from index 0 up to (not including) index 6

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ══ HERO SECTION ════════════════════════════ */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
            <Zap size={16} className="text-yellow-300" />
            <span className="text-sm font-medium">Best Gadgets of 2025</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover the Latest
            <span className="block text-yellow-300">Tech Gadgets</span>
          </h1>

          <p className="text-purple-100 text-lg mb-8 max-w-2xl">
            Explore cutting-edge smartphones, laptops, smartwatches, and accessories from top brands.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/gadgets"
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-3 rounded-full transition-colors flex items-center gap-2"
            >
              Shop All Gadgets <ChevronRight size={18} />
            </Link>
            <Link
              to="/cart"
              className="border-2 border-white hover:bg-white hover:text-purple-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CATEGORY FILTER BAR ════════════════════ */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        {/* sticky top-16 = sticks below the navbar (navbar ≈ 64px = top-16) */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {/* overflow-x-auto = horizontal scroll on small screens */}

            {/* "All" button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === null
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              🔮 All
            </button>

            {/* One button per category — generated from data */}
            {categories.map((category) => {
              const emojis = { phones: "📱", computers: "💻", smartwatches: "⌚", accessories: "🎧" };
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium capitalize transition-all
                    ${selectedCategory === category
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {emojis[category]} {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS GRID ══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-12">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {/* If category selected: show its name. Else: "Featured Gadgets" */}
              {selectedCategory
                ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                // charAt(0).toUpperCase() = make first letter capital
                // .slice(1) = keep rest of string as-is
                : "Featured Gadgets"}
            </h2>
            <p className="text-gray-500 mt-1">
              Showing {displayedProducts.length} of {filteredProducts.length} products
            </p>
          </div>
          <Link to="/gadgets" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
            View all <ChevronRight size={18} />
          </Link>
        </div>

        {/* Responsive grid:
            grid-cols-1 = 1 column on phones
            md:grid-cols-2 = 2 columns on tablets
            lg:grid-cols-3 = 3 columns on desktops */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            // Pass each product as a prop to ProductCard
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state: show when nothing matches the filter */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">😕</p>
            <p className="text-gray-500 text-xl">No products in this category</p>
          </div>
        )}
      </section>

      {/* ══ STATS SECTION ══════════════════════════ */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Gadget Heaven?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🚀", number: "10K+", label: "Products" },
              { icon: "😊", number: "50K+", label: "Happy Customers" },
              { icon: "⭐", number: "4.9",  label: "Average Rating" },
              { icon: "🌍", number: "50+",  label: "Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl mb-2">{stat.icon}</p>
                <p className="text-3xl font-extrabold text-yellow-300">{stat.number}</p>
                <p className="text-purple-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;