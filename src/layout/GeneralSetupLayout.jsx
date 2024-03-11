"use client";
import React, { useEffect, useState } from "react";

import { tabsGeneralSetup } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import {
 
  useTabularView,
} from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";


import ContentType from "@/components/dashboard-admin/tabular-view/questionaries/ContentType";
import ConTypeCategory from "@/components/dashboard-admin/tabular-view/questionaries/ConTypeCategory";
import Content from "@/components/dashboard-admin/tabular-view/questionaries/Content";


// contents/////////
import McqContent from "../components/dashboard-admin/tabular-view/questionaries/McqContent";

import TOFcontent from "../components/dashboard-admin/tabular-view/questionaries/TOFcontent";
import FITBContent from "../components/dashboard-admin/tabular-view/questionaries/FITBContent";
import PMContent from "../components/dashboard-admin/tabular-view/questionaries/PMContent";
import SMContent from "../components/dashboard-admin/tabular-view/questionaries/SMContent";
import ContentDetails from "../components/dashboard-admin/tabular-view/questionaries/ContentDetails";
import Language from "../components/dashboard-admin/tabular-view/questionaries/Language";
import ContentDetailsByLanguage from "../components/dashboard-admin/tabular-view/questionaries/ContentDetailsByLanguage";
import ContentsByClause from "../components/dashboard-admin/tabular-view/questionaries/ContentByClause";
import ContentsBySyllable from "../components/dashboard-admin/tabular-view/questionaries/ContentBySyllable";
import DetailsOfContentDetailsByLanguage from "../components/dashboard-admin/tabular-view/questionaries/DetailsOfContentDetailsByLanguage";


export default function ContentLayout({ content }) {
    //
    const currentView = useTabularView((state) => state.data.currentView);
    const currentSubView = useTabularView((state) => state.data.currentSubView);
    const currentAct = useTabularView((state) => state.data.currentAct);
  
    const setTabularView = useTabularView((state) => state.setTabularView);
    const setSubView = useTabularView((state) => state.setSubView);
  
  
  
    const initStateSelection = {
      id: null,
      title: "",
    };
  
    // useEffect(() => {
    //   if (currentView == "Questions Mapping") {
    //     let url =
    //       "/api/journey-map-question-contents?populate[question_content][populate]=*";
    //     url += currentSubView
    //       ? `&filters[question_content][question_type][title][$eq]=${currentSubView}`
    //       : "";
  
    //     if (currentSubView == "") {
    //     }
    //   }
    // }, [currentSubView]);
  
    useEffect(() => {
      setTabularView({
        currentPage: "Journey Pointer",
        currentView: Object.keys(tabsGeneralSetup)[0],
        currentSubView: tabsGeneralSetup[Object.keys(tabsGeneralSetup)[0]][0],
        currentAct: "view",
      });
    }, []);
  
    const active_tab = (btn) =>
      btn === currentView
        ? " bg-slate-200 border-slate-400  shadow-sm"
        : " bg-slate-100 border-slate-200";
  
    const active_sub_tab = (btn) =>
      btn === currentSubView ? " bg-wh border-slate-800 shadow-sm" : "   ";
  
    return (
      <div className="max-h-[83vh] flex flex-col gap-3 px-2 w-full bg-white">
        <div className=" rounded-md p-1 flex justify-between">
          <EnhancedText kind={"two"} color=" text-slate-800"></EnhancedText>
  
          {/* {currentView == "Add New Question" && (
            <CustomButton
              click={() => {
                setTabularView({
                  currentPage: "questionaries",
                  currentView: "Questions",
                });
              }}
              style={
                "text-blue-800 bg-white font-semibold text-sm font-serif leading-3 py-1 hover:bg-slate-100 hover:rounded-full px-1 rounded-sm"
              }
              txt="Back To Questions"
            />
          )} */}
        </div>
  
        <div className="flex gap-2 items-center">
          {Object.keys(tabsGeneralSetup).map((item, ind) => {
            return (
              <CustomButton
                key={ind}
                txt={item}
                style={`px-2 text-base h-fit py-0.12 flex items-center font-normal font-sans rounded-md hover:bg-slate-100 hover:shadow hover:drop-shadow-sm ${active_tab(
                  item
                )}`}
                click={() => {
                  setTabularView({
                    currentView: item,
                    currentSubView:
                      item == "Journey Pointer" || item == "MCQ" ? "All Type" : "",
                    currentAct: "view",
                  });
                }}
              />
            );
          })}
        </div>
         <div className="flex flex-col gap-0.4 items-end px-2 mt-0.25">
         
          <div className="flex gap-2 ">
            {tabsGeneralSetup[currentView]?.map((item, ind) => {
              return (
                <CustomButton
                  key={ind}
                  txt={item}
                  style={`px-1 text-sm h-fit py-0 font-light tracking-wide font-sans  border-b border-slate-300 rounded-none  hover:border-slate-800 hover:drop-shadow-sm ${active_sub_tab(
                    item
                  )}`}
                  click={() => {
                    setTabularView({ currentSubView: item, currentAct: "view" });
                  }}
                />
              );
            })}
          </div>
        </div> 
  
        <div className="flex-grow overflow-y-scroll  ">
          
  
          
       
          
          
          {currentView == "Languages" && <Language />}
        
         
           
       
        </div>
  

  
      </div>
    );
  }
  