import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";

// import TestPage from "./pages/test";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./pages/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
