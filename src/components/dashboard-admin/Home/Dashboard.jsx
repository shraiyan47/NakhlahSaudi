"use client";
import DeveloperAMA from "./DeveloperAMA";
import MenuCards from "./MenuCards";
// import Orders from "./Orders";
import RecentOrders from "./RecentOrders";
// import Revenue from "./Revenue";
import SocialMedia from "./SocialMedia";
import TasksOverview from "./TasksOverview";
import Transactions from "./Transactions";
import dynamic from 'next/dynamic';

const Orders = dynamic(() => import('./Orders'), {
  ssr: false,
});
const ActivityHealmap = dynamic(() => import('./ActivityHealmap'), {
  ssr: false,
});
const Revenue = dynamic(() => import('./Revenue'), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <>
      <MenuCards />
      {/* second section */}
      <div className="my-4 flex gap-5">
        <Revenue />
        <SocialMedia />
      </div>
      {/* third section */}
      <div className="my-4 flex gap-5">
        <RecentOrders />
        <Orders />
      </div>
      <div className="my-4 flex gap-5">
        {/* <TasksOverview /> */}
        <ActivityHealmap/>
        <Transactions />
      </div>
    </>
  );
}
