import * as rr from "@tanstack/react-router";
import { z } from "zod";

import { rootRoute } from "../root";
import AuthPage from "./index";

const auth_search = z.object({
  mode: z.enum(["login", "register"]).default("login"),
});

export type AuthMode = z.infer<typeof auth_search>["mode"];

export const auth = rr.createRoute({
  getParentRoute: () => rootRoute,
  component: AuthPage,
  path: "/auth",
  validateSearch: auth_search,
});

export const routes = auth;
