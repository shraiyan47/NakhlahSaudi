import Questionaries from "@/layout/Questionaries";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="  h-full">
      <Questionaries content={children} />
    </div>
  );
}
