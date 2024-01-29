"use client";
import Link from "next/link";
import { useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { LuCircle } from "react-icons/lu";

const LeftNavbarItem = ({ item }) => {
  const { link, title, icon, subLinks } = item;
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (item) => {
    if (item === null) {
      return;
    }
    setIsClicked(!isClicked);
  };

  return (
    <div className=" textPrimaryColor pb-3">
      <div
        onClick={() => handleClick(subLinks)}
        className={`pb-1 cursor-pointer hover:pl-2 transform duration-200 ease-in  ${
          subLinks != null && "flex justify-between items-center"
        }`}
      >
        <div className="flex gap-3 items-center    text-[14px]">
          {icon}
          {subLinks == null ? (
            <Link href={link} className="pt-1 textNormal">
              {title}
            </Link>
          ) : (
            <div className="pt-1 textNormal cursor-pointer  ">{title}</div>
          )}
        </div>
        <span
          className={`${
            subLinks == null ? "hidden" : "block text-[14px] pt-1"
          }`}
        >
          {isClicked ? <BiChevronDown /> : <BiChevronRight />}
        </span>
      </div>
      <div
        className={` mt-2  ${
          isClicked ? "translate-y-0 ease-out duration-500" : "-translate-y-10 "
        }`}
      >
        {isClicked &&
          subLinks?.map((item) => (
            <div
              key={item.id}
              className="ml-2 textSmall  hover:pl-2 transform duration-200 ease-in"
            >
              <Link href={item.link} className="flex gap-2 py-2 items-center ">
                {item.icon}
                <span className="pt-2">{item.title}</span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftNavbarItem;
