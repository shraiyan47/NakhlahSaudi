import React from "react";

export default function EnhancedText({ children, kind, color }) {
  // no bg or text-color here, just size
  const style = {
    one: "text-3xl font-semibold leading-4",
    two: "text-xl font-semibold",
    three: "text-lg font-semibold",
    four: "text-base font-semibold",
    five: "text-base font-normal",
    mute: "text-sm  font-normal",
  };

  return (
    <p className={` ${style[kind]} ${color} font-sans drop-shadow-sm flex gap-2 items-center`}>
      {children}
    </p>
  );
}
