import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CustomLink({
  startIcon,
  txt,
  click,
  // href,
  // target,
  style,
}) {
  const cmn_style = "border border-slate-300 py-0.25 text-base";
  return (
    <Link
      // href={href}
      // target={target}
      // onClick={click}
      className={style ? `${style}` : `${cmn_style}`}
    >
      {startIcon}
      {txt}
    </Link>
  );
}
