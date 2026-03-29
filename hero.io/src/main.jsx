

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";   // import Tailwind CSS
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* StrictMode helps find bugs in development — does nothing in production */}
    <App />
  </StrictMode>
);