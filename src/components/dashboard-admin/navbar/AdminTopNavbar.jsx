"use client"
import Link from "next/link";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import UserAvatar from "../../ui-custom/UserAvatar";
import NotificationAvatar from "../../ui-custom/NotificationAvatar";
import SearchAvatar from "../../ui-custom/SearchAvatar";
import { Menu } from "lucide-react";

const AdminTopNavbar = ({ open, handleOpen }) => {
  return (
    <div
      className={` shadow  2xl:py-3 py-2 bg-white text-[--uDText] rounded-xl  flex justify-between px-5`}
    >
      <div className="sm:hidden flex items-center">
        <Menu className="w-8 h-8" />
      </div>
      <div className="hidden sm:flex gap-3 items-center">
        <button
          onClick={handleOpen}
          className="text-3xl hover:text-uDHoverText"
        >
          {open ? <BsArrowLeftShort /> : <BsArrowRightShort />}
        </button>
        <Link href={""} className="pt-1 hover:text-uDHoverText">
          Home
        </Link>
        <Link href={""} className="pt-1 hover:text-uDHoverText">
          Setting
        </Link>
        <Link href={""} className="pt-1 hover:text-uDHoverText">
          Help
        </Link>
      </div>
      <div className="sm:block hidden">
        <h1 className="text-3xl pt-2">Nakhlah</h1>
      </div>
      <div className="flex gap-5 items-center">
        <SearchAvatar />
        <NotificationAvatar isAdmin={true} />
        <UserAvatar />
      </div>
    </div>
  );
};

export default AdminTopNavbar;
