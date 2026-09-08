import type React from "react";

import {
  HiMiniCurrencyDollar,
  HiHome,
  HiShoppingCart,
  HiUsers,
  HiMiniChevronRight,
  HiAdjustmentsHorizontal,
} from "react-icons/hi2";

const DashboardPocPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="h-full w-full flex flex-col gap-2 p-2.5">
        <div className="flex flex-row items-center px-1">
          <span className="font-normal text-sm leading-4">Fortbase</span>
          <span className="text-fg-3">
            <HiMiniChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-normal text-sm leading-3 text-fg-3 cursor-pointer hover:text-fg-2 hover:underline">
            Accounts
          </span>
          <span className="text-fg-3">
            <HiMiniChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-normal text-sm leading-3 text-fg-3 cursor-pointer hover:text-fg-2 hover:underline">
            Goaterik
          </span>
        </div>

        <div className="bg-main-1 w-full h-full flex flex-row justify-center gap-2 ">
          <div className="flex flex-col gap-1 w-50 min-w-50 rounded-xl">
            <Button title="Home" pre_child={<HiHome />} />
            <Button selected title="Accounts" pre_child={<HiUsers />} />
            <Button title="Item Shop" pre_child={<HiShoppingCart />} />
            <Button
              title="Billing & Usage"
              pre_child={<HiMiniCurrencyDollar />}
            />

            <div className="mt-auto" />

            <Button
              title="Organisation"
              pre_child={<HiAdjustmentsHorizontal />}
            />
          </div>
          <div className="rounded-xl flex-1 min-w-0 bg-surface"></div>
        </div>
      </div>
    </div>
  );
};

type ButtonProps = {
  pre_child?: React.ReactNode;
  title: string;
  selected?: boolean;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`flex flex-row items-center px-2 py-2 gap-2 h-8 min-w-8 w-full rounded-xl cursor-pointer text-sm leading-4 ${props.selected ? "bg-surface text-fg-1" : "hover:bg-surface-1 text-fg-3"}`}
      role="button"
    >
      {props.pre_child}
      <span>{props.title}</span>
    </button>
  );
};

export default DashboardPocPage;
