import * as rr from "@tanstack/react-router";

import { rootRoute, ErrorComponent } from "../root";
import DashboardPage from "./index";

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

export const routes = dashboard.addChildren([
  dashboard_index,
  dashboard_accounts.addChildren([dashboard_accounts_index, dashboard_account]),
  dashboard_shop,
  dashboard_billing,
  dashboard_organisation,
]);
