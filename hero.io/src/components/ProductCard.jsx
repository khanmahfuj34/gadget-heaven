// ─────────────────────────────────────────────
// ProductCard.jsx  →  One product card
//
// KEY CONCEPTS HERE:
//   • Props         →  data passed into a component from parent
//   • Destructuring →  pull values out of an object neatly
//   • useNavigate   →  go to another page in code (not a Link)
//   • Disabled buttons
// ─────────────────────────────────────────────

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Heart, Star } from "lucide-react";

// { product } = destructure the "product" prop from props object
// Same as writing:  function ProductCard(props) { const product = props.product }
function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();

  // Check if this specific product is already in cart/wishlist
  const isInCart     = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    // "group" → lets child elements respond to hover on this parent
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">

      {/* ── IMAGE AREA ───────────────────────── */}
      <div className="relative overflow-hidden h-52 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          // object-cover  = fill the box without stretching
          // group-hover:scale-105 = zoom image when card is hovered
        />

        {/* Out of stock overlay — only shown when not in stock */}
        {!product.inStock && (
          // ! means NOT — so !product.inStock means "if NOT in stock"
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Category badge — top right corner */}
        <span className="absolute top-2 right-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium capitalize">
          {product.category}
          {/* capitalize = CSS makes first letter uppercase */}
        </span>
      </div>

      {/* ── CARD CONTENT ─────────────────────── */}
      <div className="p-4">

        <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">
          {product.name}
          {/* truncate = adds "..." if text is too long to fit */}
        </h3>

        {/* Star rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {/* fill-yellow-400 = fills the star icon shape with color */}
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>

        {/* Price — toLocaleString adds commas: 1000 → "1,000" */}
        <p className="text-purple-600 font-bold text-xl mb-3">
          ${product.price.toLocaleString()}
        </p>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
          {/* line-clamp-2 = show max 2 lines, then "..." */}
        </p>

        {/* ── BUTTONS ──────────────────────────── */}
        <div className="flex gap-2">

          {/* View Details button */}
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            // Template literal: `/products/${product.id}` → e.g. "/products/3"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </button>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock || isInCart}
            // disabled = cannot be clicked, grayed out
            // disable if: out of stock  OR  already in cart
            className={`p-2 rounded-lg transition-colors ${
              isInCart
                ? "bg-green-100 text-green-600 cursor-not-allowed"
                : !product.inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700"
            }`}
            title={isInCart ? "In Cart" : "Add to Cart"}
            // title = tooltip text that appears on hover
          >
            <ShoppingCart size={18} />
          </button>

          {/* Add to Wishlist button */}
          <button
            onClick={() => addToWishlist(product)}
            disabled={isInWishlist}
            className={`p-2 rounded-lg transition-colors ${
              isInWishlist
                ? "bg-pink-200 text-pink-600 cursor-not-allowed"
                : "bg-pink-50 hover:bg-pink-100 text-pink-500"
            }`}
            title={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
          >
            <Heart
              size={18}
              className={isInWishlist ? "fill-pink-500" : ""}
              // fill-pink-500 = filled heart when wishlisted
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;