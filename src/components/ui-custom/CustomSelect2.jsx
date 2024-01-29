"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronsRight } from "lucide-react";

const CustomSelect2 = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const active_style = (val) =>
    val ? " border-b  border-slate-800 " : "border-x border-slate-400";

  const active_txt_style = (val) =>
    val ? "text-slate-800 text-sm font-semibold " : "text-slate-800 text-sm";

  return (
    <div className="relative h-1.5 py-0" ref={dropdownRef}>
      <div
        className={` ${active_style(
          value?.title
        )} min-w-[80px] h-1.5  rounded-none capitalize cursor-pointer flex gap-0.25 justify-center items-center`}
        onClick={toggleDropdown}
      >
        <span
          className={`
            ${active_txt_style(value?.title)}   font-light tracking-wide  font-sans px-0.12  rounded-sm h-full 
          `}
        >
          {value.title ? value.title : label}
        </span>
        <ChevronDown className="w-1.0 h-1.0 text-slate-500" />
      </div>

      {isOpen && options?.length > 0 ? (
        <ul className="absolute min-w-[200px] w-full z-10 top-full text-black  border  rounded-md shadow   overflow-y-scrollbar bg-white max-h-60">
          {options?.map((option, index) => (
            <li
              key={index}
              className={`${
                value === option ? "bg-primary" : "bg-white text-black"
              } capitalize py-1 px-4 cursor-pointer rounded-md  hover:bg-blue-800 hover:text-white`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default CustomSelect2;
