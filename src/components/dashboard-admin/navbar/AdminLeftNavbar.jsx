"use client";

import { useSpring, animated } from "react-spring";
import { adminDashboard } from "../../../static-data/interface";
import AdminLeftNavbarSection from "./AdminLeftNavbarSection";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminLeftNavbar = ({ open }) => {
  const list1 = adminDashboard.leftNavList.main;
  const list2 = adminDashboard.leftNavList.element;

  const navAnimation = useSpring({
    transform: open ? "translateX(0%)" : "translateX(-190%)",
    delay: 30,
  });
  return (
    <ScrollArea
      className={`${
        open
          ? "bg-white"
          : "transition duration-500 delay-0 ease-in-out bg-opacity-20"
      } rounded-xl`}
    >
      <animated.div style={navAnimation} className={` h-[83vh] px-8 py-10   `}>
        <AdminLeftNavbarSection title={list1.title} list={list1.list} />
        <AdminLeftNavbarSection title={list2.title} list={list2.list} />
      </animated.div>
    </ScrollArea>
  );
};

export default AdminLeftNavbar;
