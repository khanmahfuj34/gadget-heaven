// ─────────────────────────────────────────────
// Cart.jsx  →  Shopping cart page
//
// KEY CONCEPTS HERE:
//   • Multiple UI states (empty / filled / purchased)
//   • .reduce() to sum up prices
//   • .toFixed(2) for decimal formatting
//   • window.confirm() for user confirmation
// ─────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";

function Cart() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();

  // Local state: did the user just complete a purchase?
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    if (cart.length === 0) return; // nothing to buy

    // window.confirm() shows a browser popup — returns true or false
    const confirmed = window.confirm(
      `Confirm purchase of ${cart.length} item(s) for $${cartTotal.toLocaleString()}?`
    );

    if (confirmed) {
      clearCart();          // empty the cart (context function)
      setPurchased(true);   // switch to success UI
    }
  };

  // ── STATE 1: Purchased ──────────────────────
  if (purchased) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-md">
          <p className="text-7xl mb-4">🎉</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-6">Your gadgets are on the way!</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-colors"
          >
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // ── STATE 2: Empty cart ─────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <ShoppingCart size={80} className="text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Add some awesome gadgets!</p>
        <Link to="/gadgets" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-colors">
          Browse Gadgets
        </Link>
      </div>
    );
  }

  // ── STATE 3: Cart has items ─────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingBag className="text-purple-600" />
            My Cart
            <span className="bg-purple-100 text-purple-600 text-lg px-3 py-1 rounded-full">
              {cart.length}
            </span>
          </h1>
          <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1">
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── ITEMS LIST (takes 2 of 3 columns) ── */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center">

                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  {/* min-w-0 = needed for text truncation inside flex containers */}
                  <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                  <p className="text-purple-600 font-bold text-lg mt-1">${item.price.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* ── ORDER SUMMARY (takes 1 of 3 columns) ── */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* sticky top-24 = stays visible when scrolling the items list */}

              <h3 className="font-bold text-gray-800 text-xl mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  {/* .toFixed(2) = show exactly 2 decimal places: 99.9 → "99.90" */}
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span className="text-purple-600">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                Purchase Now <ArrowRight size={18} />
              </button>

              <Link to="/gadgets" className="block text-center text-purple-600 hover:text-purple-700 text-sm mt-3 font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;