import * as rr from "@tanstack/react-router";

import { rootRoute } from "../root";
import Onboarding from "./index";

export const callback = rr.createRoute({
  getParentRoute: () => rootRoute,
  component: Onboarding,
  path: "/callback",
});

export const routes = callback;
