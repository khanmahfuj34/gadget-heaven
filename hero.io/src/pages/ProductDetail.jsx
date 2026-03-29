// ─────────────────────────────────────────────
// ProductDetail.jsx  →  Single product page
//
// KEY CONCEPTS HERE:
//   • useParams  → reads the :id from the URL
//   • .find()    → get one matching item from array
//   • parseInt() → convert string "3" to number 3
//   • Guard clause → handle missing product gracefully
// ─────────────────────────────────────────────

import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/useCart";
import { ShoppingCart, Heart, Star, ArrowLeft, CheckCircle, XCircle } from "lucide-react";

function ProductDetail() {
  // useParams reads variables from the URL
  // If URL is /products/5, then  id === "5"  (it's a string!)
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();

  // Find the product whose id matches the URL id
  // parseInt("5") → 5  (converts string to number for comparison)
  const product = products.find((p) => p.id === parseInt(id));

  const isInCart     = cart.some((item) => item.id === product?.id);
  const isInWishlist = wishlist.some((item) => item.id === product?.id);
  // product?.id = "optional chaining" — safe if product is undefined

  // Guard clause: handle invalid product ID
  // e.g. user goes to /products/9999 which doesn't exist
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Back button — navigate(-1) = go to previous page */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Two columns on desktop: image left, info right */}
          <div className="grid md:grid-cols-2 gap-0">

            {/* ── LEFT: IMAGE ────────────────── */}
            <div className="bg-gray-50 p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-80 object-contain rounded-xl"
                // object-contain = show full image without cropping
              />
            </div>

            {/* ── RIGHT: INFO ────────────────── */}
            <div className="p-8">

              <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium capitalize">
                {product.category}
              </span>

              <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-2">{product.name}</h1>

              {/* Star rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {/* Array.from({length: 5}) creates array of 5 items */}
                  {/* We use _ because we don't need the value, only the index */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={
                        index < Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"  // filled star
                          : "text-gray-200 fill-gray-200"       // empty star
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{product.rating}/5</span>
              </div>

              <p className="text-4xl font-extrabold text-purple-600 mb-4">
                ${product.price.toLocaleString()}
              </p>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} className="text-red-500" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Specs grid */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3">Key Specs:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.map((spec, index) => (
                    // index is the position (0, 1, 2...) — used as key since specs have no id
                    <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock || isInCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-lg transition-colors ${
                    isInCart          ? "bg-green-100 text-green-600 cursor-not-allowed"
                    : !product.inStock ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  <ShoppingCart size={20} />
                  {isInCart ? "In Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={() => addToWishlist(product)}
                  disabled={isInWishlist}
                  className={`p-3 rounded-xl border-2 transition-colors ${
                    isInWishlist
                      ? "border-pink-300 bg-pink-50 text-pink-500 cursor-not-allowed"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-600 hover:text-pink-500"
                  }`}
                >
                  <Heart size={24} className={isInWishlist ? "fill-pink-500 text-pink-500" : ""} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;