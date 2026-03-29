// ─────────────────────────────────────────────
// App.jsx  →  The root of your whole app
//
// KEY CONCEPTS HERE:
//   • BrowserRouter  → enables URL navigation
//   • Routes + Route → maps URLs to components
//   • :id            → dynamic URL parameter
//   • *              → catch-all 404 route
//   • Layout pattern → Navbar + content + Footer on every page
// ─────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import Home          from "./pages/Home";
import AllGadgets    from "./pages/AllGadgets";
import ProductDetail from "./pages/ProductDetail";
import Cart          from "./pages/Cart";
import Wishlist      from "./pages/Wishlist";

// Layout components (show on every page)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    // BrowserRouter: enables React Router — must wrap everything
    <BrowserRouter>

      {/* CartProvider: makes cart/wishlist data available everywhere */}
      <CartProvider>

        {/* flex flex-col min-h-screen = footer stays at bottom */}
        <div className="flex flex-col min-h-screen">

          {/* Navbar is OUTSIDE <Routes> so it appears on every page */}
          <Navbar />

          {/* main grows to fill space between Navbar and Footer */}
          <main className="flex-1">

            <Routes>
              {/* Each Route = one URL → one component to show */}

              <Route path="/"          element={<Home />} />
              <Route path="/gadgets"   element={<AllGadgets />} />

              {/* :id = dynamic segment — matches /products/1, /products/5, etc. */}
              {/* The actual id value is read inside ProductDetail with useParams() */}
              <Route path="/products/:id" element={<ProductDetail />} />

              <Route path="/cart"      element={<Cart />} />
              <Route path="/wishlist"  element={<Wishlist />} />

              {/* * = matches anything not matched above = 404 page */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-96 text-center p-8">
                  <p className="text-8xl font-black text-gray-200 mb-4">404</p>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</h2>
                  <p className="text-gray-500">The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </main>

          {/* Footer is also outside <Routes> — shows on every page */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;