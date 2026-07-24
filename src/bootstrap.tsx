import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";

import TestPage from "./pages/test";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TestPage />
  </StrictMode>,
);
