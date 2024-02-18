import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ListPlus } from "lucide-react";
import { BsCaretDown } from "react-icons/bs";
import CustomButton from "./CustomButton";

const CustomSearchableDropdown = ({
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
  const [searchTerm, setSearchTerm] = useState(value ? value.title : "");
  const dropdownRef = useRef(null);
  const labelRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      labelRef.current &&
      !labelRef.current.contains(e.target)
    ) {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const active_style = (val) =>
    val ? " border-b  border-slate-800 " : "border-x border-slate-400";
  const active_txt_style = (val) =>
    val ? "text-slate-800 text-sm font-semibold " : "text-slate-800 text-sm";
  const styles = {
    wh: "bg-wh border border-slate-300",
    light: "bg-slate-200 text-black border border-slate-500",
    blue: "bg-blue-700 text-white",
  };
  return (
    <div className="relative " ref={dropdownRef}>
      <div
        ref={labelRef}
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
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`Search ${label.toLowerCase()}...`}
          className="outline-none border-none bg-transparent w-full"
        />
        <BsCaretDown className="w-[1.2rem] h-[1.2rem] ms-1" />
      </div>
      {/*  <div
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
        <input
          type="text"
          value={value ? value.title : searchTerm}
          onChange={handleSearchChange}
          placeholder={`Search ${label.toLowerCase()}...`}
          className="bg-transparent w-full"
        />
        <ChevronDown className="w-1.0 h-1.0 text-slate-500" />
      </div> */}
      {isOpen && (
        <div className="absolute w-full z-10 top-full flex flex-col text-black border border-slate-500 rounded-md shadow bg-white h-auto max-h-[12rem]">
          <ul className="flex-grow overflow-y-scroll ">
            {filteredOptions.map((option, index) => (
              <li
                key={option.id}
                className={`${
                  value?.title === option?.title
                    ? "bg-slate-200 border-blue-300"
                    : "bg-white text-black"
                } capitalize py-0.12 px-4 cursor-pointer   hover:bg-blue-800 hover:text-white`}
                onClick={() => {
                  setSearchTerm(option.title);
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
      )}
    </div>
  );
};

export default CustomSearchableDropdown;
