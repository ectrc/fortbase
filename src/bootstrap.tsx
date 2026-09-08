import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";

import TestPage from "./pages/test";
import DashboardPocPage from "./pages/dashboard_pco";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <TestPage /> */}
    <DashboardPocPage />
  </StrictMode>,
);
