import React from "react";
import { Button } from "@/components/ui/button";

export default function CustomButton({
  key,
  startIcon,
  txt,
  click,
  type,
  style,
}) {
  const cmn_style =
    "border border-slate-300 py-0.25 text-base px-1 flex justify-center items-center gap-1";
  return (
    <Button
      key={key}
      type={type}
      onClick={click}
      className={style ? `${style}` : `${cmn_style}`}
    >
      {startIcon}
      {txt}
    </Button>
  );
}
