import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-main-2 w-full h-full"></div>
  </StrictMode>,
);
