import * as rr from "@tanstack/react-router";

import { rootRoute } from "./root";
import { routes as auth_routes } from "./auth/routes";
import { routes as dashboard_routes } from "./dashboard/routes";
import { routes as onboarding_routes } from "./onboarding/routes";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const index = rr.createRoute({
  getParentRoute: () => rootRoute,
  component: () => <rr.Navigate to="/auth" />,
  path: "/",
});

const routeTree = rootRoute.addChildren([
  index,
  auth_routes,
  onboarding_routes,
  dashboard_routes,
]);

export const router = rr.createRouter({ routeTree });
