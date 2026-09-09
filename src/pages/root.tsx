import { Suspense } from "react";
import * as rr from "@tanstack/react-router";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    breadcrumb?: string | ((params: Record<string, string>) => string);
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

export const ErrorComponent = (props: rr.ErrorComponentProps) => {
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
