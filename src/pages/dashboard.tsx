import type React from "react";
import { Fragment } from "react";
import * as rr from "@tanstack/react-router";

import {
  HiMiniCurrencyDollar,
  HiHome,
  HiShoppingCart,
  HiUsers,
  HiMiniChevronRight,
  HiAdjustmentsHorizontal,
} from "react-icons/hi2";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="h-full w-full flex flex-col gap-2 p-2.5">
        <Breadcrumb />

        <div className="bg-main-1 w-full h-full flex flex-row justify-center gap-2 ">
          <div className="flex flex-col gap-1 w-50 min-w-50 rounded-xl">
            <SidebarLink to="/dashboard" exact title="Home" prefix_child={<HiHome />} />
            <SidebarLink to="/dashboard/accounts" title="Accounts" prefix_child={<HiUsers />} />
            <SidebarLink to="/dashboard/shop" title="Item Shop" prefix_child={<HiShoppingCart />} />
            <SidebarLink
              to="/dashboard/billing"
              title="Billing & Usage"
              prefix_child={<HiMiniCurrencyDollar />}
              suffix_child={<SidebarLinkSuffixBubble text="27%" />}
            />

            <div className="mt-auto" />

            <SidebarLink
              to="/dashboard/organisation"
              title="Organisation"
              prefix_child={<HiAdjustmentsHorizontal />}
            />
          </div>
          <div className="rounded-xl flex-1 min-w-0 bg-surface">
            <rr.Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const Breadcrumb = () => {
  const matches = rr.useMatches();
  const items = matches.flatMap((match) => {
    const breadcrumb = match.staticData.breadcrumb;
    if (breadcrumb === undefined) return [];

    const title =
      typeof breadcrumb === "function" ? breadcrumb(match.params) : breadcrumb;
    return [{ title, href: match.pathname }];
  });

  return (
    <nav aria-label="Breadcrumb" className="flex flex-row items-center px-1">
      {items.map((item, index) => {
        const is_root = index === 0;

        return (
          <Fragment key={item.href}>
            {!is_root && (
              <span className="text-fg-3">
                <HiMiniChevronRight className="h-3.5 w-3.5" />
              </span>
            )}
            <rr.Link
              to={item.href}
              className={`font-normal text-sm hover:underline ${is_root ? "leading-4" : "leading-3 text-fg-3 hover:text-fg-2"}`}
            >
              {item.title}
            </rr.Link>
          </Fragment>
        );
      })}
    </nav>
  );
};

type SidebarLinkProps = {
  to: rr.LinkProps["to"];
  exact?: boolean;
  prefix_child?: React.ReactNode;
  title: string;
  suffix_child?: React.ReactNode;
};

const SidebarLinkSuffixBubble = ({ text }: { text: string }) => {
  return (
    <div className="text-xs leading-4 text-fg-1 px-1 bg-accent-1 rounded-full">
      {text}
    </div>
  );
};

const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <rr.Link
      to={props.to}
      activeOptions={{ exact: props.exact }}
      className="flex flex-row items-center px-2 py-2 gap-2 h-8 min-w-8 w-full rounded-xl cursor-pointer text-sm leading-4"
      activeProps={{ className: "bg-surface text-fg-1" }}
      inactiveProps={{ className: "hover:bg-surface-1 text-fg-3" }}
    >
      {props.prefix_child}
      <span>{props.title}</span>
      <div className="ml-auto"></div>
      {props.suffix_child}
    </rr.Link>
  );
};

export default DashboardPage;
