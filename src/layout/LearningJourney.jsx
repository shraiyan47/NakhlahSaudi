"use client";
import React, { useEffect } from "react";
import { tabsJourney } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import { useTabularView } from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import Purposes from "@/components/dashboard-admin/tabular-view/journey/Purposes";
import StartPoints from "@/components/dashboard-admin/tabular-view/journey/StartPoints";
import LearnerLevel from "@/components/dashboard-admin/tabular-view/journey/LearnerLevel";
import Goals from "@/components/dashboard-admin/tabular-view/journey/Goals";

export default function LearningJourney({ content }) {
  //
  const tabularView = useTabularView((state) => state.data);
  const setTabularView = useTabularView((state) => state.setTabularView);

  useEffect(() => {
    setTabularView({
      currentPage: "learning-journey",
      currentView: "Learner Purposes",
    });
  }, []);

  const active_button = (btn) =>
    btn === tabularView.currentView
      ? " bg-slate-200 border-slate-400  shadow-sm"
      : " bg-slate-100 border-slate-200";

  return (
    <div className="flex flex-col flex-wrap gap-2 p-2 w-full h-full ">
      <div className=" rounded-md py-1 flex justify-start    ">
        <EnhancedText kind={"two"} color=" text-slate-800">
          {tabularView.currentView}
        </EnhancedText>
      </div>

      <div className="flex gap-2">
        {tabsJourney.map((item,ind) => {
          return (
            <CustomButton
             key={ind}
              txt={item.title}
              style={`px-2 text-sm h-fit py-0.25 font-normal font-sans hover:shadow-md hover:drop-shadow-sm ${active_button(
                item.title
              )}`}
              click={() => {
                setTabularView({ currentView: item.title });
              }}
            />
          );
        })}
      </div>

      {tabularView.currentView == "Learner Purposes" && <Purposes />}
      {tabularView.currentView == "Learner Start Points" && <StartPoints />}
      {tabularView.currentView == "Learner Levels" && <LearnerLevel />}
      {tabularView.currentView == "Learner Goals" && <Goals />}
    </div>
  );
}
