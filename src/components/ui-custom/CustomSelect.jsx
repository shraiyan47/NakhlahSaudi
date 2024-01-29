"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsCaretDown } from "react-icons/bs";
import CustomButton from "./CustomButton";
import { ListPlus } from "lucide-react";

const CustomSelect = ({
  options,
  value,
  onChange,
  bg,
  label,
  icon,
  ph,
  addNewText,
  addNewAfterClcik,
}) => {
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

  const styles = {
    wh: "bg-wh border border-slate-300",
    light: "bg-slate-200 text-black border border-slate-500",
    blue: "bg-blue-700 text-white",
  };

  return (
    <div className="relative " ref={dropdownRef}>
      <div
        className={` px-0.5 min-w-[110px] h-full rounded-md capitalize cursor-pointer flex justify-between items-center ${styles[bg]}`}
        onClick={toggleDropdown}
      >
        {label && (
          <span
            className={
              bg == "blue"
                ? "bg-blue-900 text-wh text-sm font-semibold px-0.5  rounded-md py-0.25 h-full"
                : "bg-slate-200 text-black text-sm font-semibold px-0.5  rounded-md py-0.25 h-full"
            }
          >
            {label}
          </span>
        )}
        {icon && icon}
        <span>{value.title ? value.title : ph}</span>
        <BsCaretDown className="w-[1.2rem] h-[1.2rem] ms-1" />
      </div>

      {isOpen ? (
        <div className="absolute w-full z-10 top-full flex flex-col text-black border border-slate-500 rounded-md shadow bg-white h-auto max-h-[12rem]">
          <ul className="flex-grow overflow-y-scroll ">
            {options?.map((option) => (
              <li
                key={option.id}
                className={`${
                  value.title === option.title
                    ? "bg-slate-200 border-blue-300"
                    : "bg-white text-black"
                } capitalize py-0.12 px-4 cursor-pointer   hover:bg-blue-800 hover:text-white`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option.title}
              </li>
            ))}
          </ul>
          {addNewText && (
            <CustomButton
              startIcon={<ListPlus className="w-5 h-5" />}
              txt={addNewText}
              click={addNewAfterClcik}
              style={
                "gap-2 bg-blue-200 border border-blue-600 rounded-md py-0.12 px-2"
              }
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
