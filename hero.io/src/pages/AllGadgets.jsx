// ─────────────────────────────────────────────
// AllGadgets.jsx  →  Browse + search + filter page
//
// KEY CONCEPTS HERE:
//   • Multiple useState variables
//   • Controlled inputs (input value tied to state)
//   • Chaining: .filter() then .sort()
//   • onChange event on inputs
// ─────────────────────────────────────────────

import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

function AllGadgets() {
  // Three separate state variables for three separate filters
  const [searchQuery,      setSearchQuery]      = useState("");      // text input
  const [selectedCategory, setSelectedCategory] = useState("all");   // dropdown
  const [sortBy,           setSortBy]           = useState("default"); // dropdown

  // Unique categories for the dropdown
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // ── FILTERING + SORTING ─────────────────────
  // Start with all products, then narrow down step by step

  let filtered = products; // 'let' because we'll reassign it

  // Step 1: Filter by search text
  if (searchQuery) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
      // toLowerCase() = ignore uppercase/lowercase differences
      // .includes() = true if string contains the search query
    );
  }

  // Step 2: Filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // Step 3: Sort the results
  if (sortBy === "price-low") {
    // [...filtered] = copy array first (never sort the original!)
    // (a, b) => a.price - b.price = ascending (low to high)
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    // b.price - a.price = descending (high to low)
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── PAGE HEADER ──────────────────────── */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">All Gadgets</h1>
          <p className="text-purple-200">{products.length} amazing products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── FILTER BAR ───────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4">

          {/* Search input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {/* absolute = position icon inside the input box     */}
            {/* top-1/2 -translate-y-1/2 = vertically centered   */}
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              // value={searchQuery} = "controlled input"
              // The input's displayed value is controlled by React state
              onChange={(e) => setSearchQuery(e.target.value)}
              // e = the event object (browser passes this automatically)
              // e.target = the input element
              // e.target.value = what the user typed
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Category dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 bg-white capitalize"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 bg-white"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Showing <span className="font-bold text-purple-600">{filtered.length}</span> results
          {searchQuery && ` for "${searchQuery}"`}
          {/* && = only show this text if searchQuery is not empty */}
        </p>

        {/* ── PRODUCTS GRID or EMPTY STATE ─────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Ternary: show grid if results exist, else show empty state
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h3>
            <p className="text-gray-500 mb-4">Try changing your search or filter</p>
            <button
              onClick={() => {
                // Reset ALL filters at once
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllGadgets;