import { Suspense } from "react";
import * as rr from "@tanstack/react-router";

import DashboardPage from "./pages/dashboard";
import Onboarding from "./pages/onboarding";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    breadcrumb?: string | ((params: Record<string, string>) => string);
  }

  interface Register {
    router: typeof router;
  }
}

export const rootRoute = rr.createRootRoute({
  component: () => (
    <Suspense
      fallback={
        <div className="p-2">
          <p className="text-xs leading-3 text-fg-2">
            Content is loading, please wait.
          </p>
        </div>
      }
    >
      <rr.Outlet />
    </Suspense>
  ),
  notFoundComponent: () => (
    <div className="flex flex-col p-2 h-full w-full" data-tauri-drag-region>
      <p className="text-xs leading-3 text-neutral-300">
        This page is not found.{" "}
        <rr.Link to="/callback" className="hover:underline text-blue-300">
          Please click here to redirect to the authentication page.
        </rr.Link>
      </p>
    </div>
  ),
  errorComponent: () => (
    <div className="flex flex-col p-2 h-full w-full" data-tauri-drag-region>
      <p className="text-xs leading-3">
        A critical error has occurred, please restart the application.
      </p>
    </div>
  ),
});

export const index = rr.createRoute({
  getParentRoute: () => rootRoute,
  component: () => <rr.Navigate to="/dashboard" />,
  path: "/",
});

export const callback = rr.createRoute({
  getParentRoute: () => rootRoute,
  component: Onboarding,
  path: "/callback",
});

const ErrorComponent = (props: rr.ErrorComponentProps) => {
  const error =
    props.error instanceof Error ? props.error : new Error(String(props.error));

  return (
    <>
      <div className="flex flex-col p-2 border-1 border-solid border-neutral-700/40 rounded-xs w-full max-w-full overflow-auto">
        <p className="text-red-300 text-xs leading-3">
          <pre>{error.message}</pre>
        </p>
      </div>

      <div className="flex flex-col p-2 border-1 border-solid border-neutral-700/40 rounded-xs w-full max-w-full overflow-auto">
        <p className="text-fuchsia-300 text-xs leading-3">
          <pre>{error.stack}</pre>
        </p>
      </div>
    </>
  );
};

export const dashboard = rr.createRoute({
  getParentRoute: () => rootRoute,
  component: DashboardPage,
  path: "/dashboard",
  staticData: { breadcrumb: "Fortbase" },
  notFoundComponent: () => <rr.Navigate to="/callback" />,
  errorComponent: ErrorComponent,
});

export const dashboard_index = rr.createRoute({
  getParentRoute: () => dashboard,
  component: () => <div />,
  path: "/",
});

export const dashboard_accounts = rr.createRoute({
  getParentRoute: () => dashboard,
  component: () => <rr.Outlet />,
  path: "accounts",
  staticData: { breadcrumb: "Accounts" },
});

export const dashboard_accounts_index = rr.createRoute({
  getParentRoute: () => dashboard_accounts,
  component: () => <div />,
  path: "/",
});

export const dashboard_account = rr.createRoute({
  getParentRoute: () => dashboard_accounts,
  component: () => <div />,
  path: "$account_id",
  staticData: { breadcrumb: (params) => params.account_id },
});

export const dashboard_shop = rr.createRoute({
  getParentRoute: () => dashboard,
  component: () => <div />,
  path: "shop",
  staticData: { breadcrumb: "Item Shop" },
});

export const dashboard_billing = rr.createRoute({
  getParentRoute: () => dashboard,
  component: () => <div />,
  path: "billing",
  staticData: { breadcrumb: "Billing & Usage" },
});

export const dashboard_organisation = rr.createRoute({
  getParentRoute: () => dashboard,
  component: () => <div />,
  path: "organisation",
  staticData: { breadcrumb: "Organisation" },
});

const routeTree = rootRoute.addChildren([
  index,
  callback,
  dashboard.addChildren([
    dashboard_index,
    dashboard_accounts.addChildren([
      dashboard_accounts_index,
      dashboard_account,
    ]),
    dashboard_shop,
    dashboard_billing,
    dashboard_organisation,
  ]),
]);

export const router = rr.createRouter({ routeTree });
