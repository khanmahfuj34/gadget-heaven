// Custom hook to use the Cart context
// Separated from CartProvider for better fast refresh

import { useContext, createContext } from "react";

// Create the context
export const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}