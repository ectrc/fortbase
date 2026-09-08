import type React from "react";
import { HiAdjustments } from "react-icons/hi";
import {
  HiMiniCurrencyDollar,
  HiHome,
  HiShoppingCart,
  HiUsers,
} from "react-icons/hi2";

const DashboardPocPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="h-full w-full flex flex-col gap-2 p-2.5">
        <span className="font-normal text-sm leading-4 px-1">Fortbase</span>
        <div className="bg-main-1 w-full h-full flex flex-row justify-center gap-2 ">
          <div className="flex flex-col gap-1 w-50 min-w-50 rounded-xl">
            <Button selected title="Home" pre_child={<HiHome />} />
            <Button title="Accounts" pre_child={<HiUsers />} />
            <Button title="Item Shop" pre_child={<HiShoppingCart />} />
            <Button
              title="Billing & Usage"
              pre_child={<HiMiniCurrencyDollar />}
            />

            <div className="mt-auto" />

            <Button title="Organisation" pre_child={<HiAdjustments />} />
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
      className={`flex flex-row items-center px-2 py-2 gap-2 w-full rounded-xl cursor-pointer text-sm leading-4 ${props.selected ? "bg-surface text-fg-1" : "hover:bg-surface-1 text-fg-3"}`}
      role="button"
    >
      {props.pre_child}
      <span>{props.title}</span>
    </button>
  );
};

export default DashboardPocPage;
