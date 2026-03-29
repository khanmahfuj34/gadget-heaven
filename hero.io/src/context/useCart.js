// Custom hook to use the Cart context
// Separated from CartProvider for better fast refresh

import { useContext } from "react";
import { CartContext } from "./CartContext";

export function useCart() {
  return useContext(CartContext);
}
