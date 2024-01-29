import LearningContent from "@/layout/LearningContent";
import React from "react";

export default function layout({ children }) {
  return (
    <div>
      <LearningContent content={children} />
    </div>
  );
}
