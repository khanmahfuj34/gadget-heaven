// ─────────────────────────────────────────────
// Footer.jsx  →  Bottom of every page
//
// KEY CONCEPTS HERE:
//   • Presentational component (no state — just UI)
//   • new Date().getFullYear() → auto-updates year
//   • .map() on inline array to avoid repetitive JSX
// ─────────────────────────────────────────────

import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* ── BRAND COLUMN ───────────────────── */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold mb-3">
              <Zap size={22} className="text-yellow-400" />
              Gadget Heaven
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your one-stop shop for the latest tech gadgets from top brands.
            </p>
          </div>

          {/* ── QUICK LINKS COLUMN ─────────────── */}
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {/* space-y-2 = vertical gap between list items */}
              {[
                { to: "/",         label: "Home" },
                { to: "/gadgets",  label: "All Gadgets" },
                { to: "/cart",     label: "Cart" },
                { to: "/wishlist", label: "Wishlist" },
              ].map((link) => (
                // Inline .map() on an array defined right here
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CATEGORIES COLUMN ──────────────── */}
          <div>
            <h4 className="text-white font-bold mb-3">Categories</h4>
            <ul className="space-y-2">
              {["Phones", "Computers", "Smartwatches", "Accessories"].map((cat) => (
                <li key={cat}>
                  <Link to="/gadgets" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────── */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          {/* new Date().getFullYear() → automatically shows current year */}
          <p>© {new Date().getFullYear()} Gadget Heaven. Built with React + Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;