
import ContentLayout from "../../../layout/ContentLayout";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="  h-full">
      <ContentLayout content={children} />
    </div>
  );
}
