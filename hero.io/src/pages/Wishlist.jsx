// ─────────────────────────────────────────────
// Wishlist.jsx  →  Saved items page
//
// KEY CONCEPTS HERE:
//   • Same patterns as Cart (great for reinforcement!)
//   • Moving items from wishlist → cart
//   • .forEach() to loop without building a new array
// ─────────────────────────────────────────────

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, cart } = useCart();

  // ── EMPTY STATE ─────────────────────────────
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Heart size={80} className="text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save products you love to find them later!</p>
        <Link to="/gadgets" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-colors">
          Browse Gadgets
        </Link>
      </div>
    );
  }

  // Move one item: add to cart + remove from wishlist
  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  // Move ALL items to cart
  const moveAllToCart = () => {
    // .forEach() loops through array but doesn't return a new array
    wishlist.forEach((item) => {
      const alreadyInCart = cart.some((c) => c.id === item.id);
      if (!alreadyInCart) addToCart(item);
    });
    // Remove all from wishlist after moving
    wishlist.forEach((item) => removeFromWishlist(item.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <Heart className="text-pink-500 fill-pink-500" />
          My Wishlist
          <span className="bg-pink-100 text-pink-600 text-lg px-3 py-1 rounded-full">
            {wishlist.length}
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((item) => {
            const alreadyInCart = cart.some((c) => c.id === item.id);

            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center hover:shadow-md transition-shadow">

                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-gray-500 text-xs capitalize mb-2">{item.category}</p>
                  <p className="text-purple-600 font-bold text-lg">${item.price.toLocaleString()}</p>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Move to cart button */}
                  <button
                    onClick={() => moveToCart(item)}
                    disabled={alreadyInCart}
                    className={`p-2 rounded-lg transition-colors ${
                      alreadyInCart
                        ? "bg-green-100 text-green-600 cursor-not-allowed"
                        : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                    }`}
                    title={alreadyInCart ? "Already in cart" : "Move to cart"}
                  >
                    <ShoppingCart size={18} />
                  </button>

                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Move all button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={moveAllToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-colors"
          >
            Move All to Cart <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;