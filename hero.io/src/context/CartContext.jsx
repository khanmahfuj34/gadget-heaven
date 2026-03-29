// ─────────────────────────────────────────────
// CartContext.jsx  →  Global State Management
//
// KEY CONCEPTS HERE:
//   • Context API  →  share data without passing props everywhere
//   • useState     →  remember values that can change
//   • Provider     →  wraps your app, gives all children access
//   • Custom Hook  →  your own reusable function using other hooks
// ─────────────────────────────────────────────

import { createContext, useContext, useState } from "react";

// STEP A: Create an empty "box" (the context)
// Think of it as an empty container we'll fill with data later
export const CartContext = createContext();

// STEP B: Create the Provider component
// This is the "filled box" — it holds all cart/wishlist data
// Every component inside <CartProvider> can access this data
export function CartProvider({ children }) {
  // children = whatever components are wrapped inside <CartProvider>

  // useState([]) means: start with an empty array []
  // cart    = current value  (read it)
  // setCart = function to update it  (change it)
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ── ADD TO CART ──────────────────────────────
  const addToCart = (product) => {
    // .some() loops through array and returns true if ANY item matches
    const alreadyInCart = cart.some((item) => item.id === product.id);

    if (alreadyInCart) {
      alert("Already in your cart!");
      return; // stop here — don't add duplicate
    }

    // [...cart, product] means: copy all existing items, then add product
    // We NEVER directly modify state — always create a new array
    setCart([...cart, product]);
  };

  // ── REMOVE FROM CART ─────────────────────────
  const removeFromCart = (productId) => {
    // .filter() keeps only items where the condition is TRUE
    // So this keeps everything EXCEPT the item we want to remove
    setCart(cart.filter((item) => item.id !== productId));
  };

  // ── ADD TO WISHLIST ──────────────────────────
  const addToWishlist = (product) => {
    const alreadyInWishlist = wishlist.some((item) => item.id === product.id);
    if (alreadyInWishlist) {
      alert("Already in your wishlist!");
      return;
    }
    setWishlist([...wishlist, product]);
  };

  // ── REMOVE FROM WISHLIST ─────────────────────
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  // ── CLEAR CART (after purchase) ──────────────
  const clearCart = () => {
    setCart([]); // reset to empty array
  };

  // ── CALCULATE TOTAL ──────────────────────────
  // .reduce() goes item by item, adding each price to a running total
  // starts at 0, then: 0 + 999 + 899 + 349 = 2247
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // STEP C: Return the Provider with all data inside "value"
  // Everything in value={} is available to ALL child components
  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}