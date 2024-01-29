import React from "react";
import { Input } from "@/components/ui/input";

export default function CustomInput({
  id,
  type,
  style,
  ph,
  value,
  onChange,
  label,
}) {
  const cmn_style = "flex-grow  py-0.5 px-1";
  return (
    <div className="w-full flex border border-slate-400 rounded-md items-center ">
      {label && (
        <span className="px-2 py-0.25  bg-slate-200 h-full rounded-md">
          {label}
        </span>
      )}
      <Input
        id={id}
        type="text"
        placeHolder={ph}
        onChange={onChange}
        value={value}
        className={style ? `${style}  ` : `${cmn_style}`}
      />
    </div>
  );
}
