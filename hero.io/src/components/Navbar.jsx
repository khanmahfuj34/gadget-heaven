// ─────────────────────────────────────────────
// Navbar.jsx  →  The top navigation bar
//
// KEY CONCEPTS HERE:
//   • Link        →  navigate without page reload
//   • useLocation →  know which page you're on
//   • Conditional styling  →  different CSS based on condition
//   • .map()      →  loop through array to build UI
// ─────────────────────────────────────────────

import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Heart, Zap } from "lucide-react";

function Navbar() {
  // useLocation() tells us the current URL
  // e.g.  location.pathname === "/cart"
  const location = useLocation();

  // Pull cart and wishlist from our global context
  const { cart, wishlist } = useCart();

  // Helper: is this path the current page?
  // Returns true or false
  const isActive = (path) => location.pathname === path;

  // Store nav links in an array so we can loop through them
  // Much cleaner than writing <Link> four separate times!
  const navLinks = [
    { path: "/",         label: "Home" },
    { path: "/gadgets",  label: "All Gadgets" },
    { path: "/cart",     label: "Cart" },
    { path: "/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="bg-purple-600 text-white shadow-lg sticky top-0 z-50">
      {/* sticky top-0 = stays fixed at top when you scroll down */}
      {/* z-50 = appears above everything else on the page     */}

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* max-w-7xl mx-auto = center content, limit max width */}
        {/* flex justify-between = logo on left, links on right */}

        {/* ── LOGO ─────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Zap size={24} className="text-yellow-300" />
          <span>Gadget Heaven</span>
        </Link>

        {/* ── NAV LINKS ────────────────────────── */}
        <div className="hidden md:flex gap-6 items-center">
          {/* hidden = hidden on mobile, md:flex = show on medium+ screens */}

          {navLinks.map((link) => (
            // key is required when using .map() in React
            // React uses it to track which item is which
            <Link
              key={link.path}
              to={link.path}
              className={`
                font-medium transition-all duration-200 hover:text-yellow-300
                ${isActive(link.path)
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "text-white"
                }
              `}
              // Ternary operator: condition ? "if true" : "if false"
              // Active page gets yellow + underline, others stay white
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── CART & WISHLIST ICONS ────────────── */}
        <div className="flex gap-4 items-center">

          {/* Cart icon with item count badge */}
          <Link to="/cart" className="relative hover:text-yellow-300 transition-colors">
            <ShoppingCart size={24} />
            {/* && means: only render this if the left side is truthy */}
            {/* cart.length > 0 is true only when cart has items      */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
              // absolute -top-2 -right-2 = positions badge on top-right corner of icon
            )}
          </Link>

          {/* Wishlist icon with item count badge */}
          <Link to="/wishlist" className="relative hover:text-yellow-300 transition-colors">
            <Heart size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;