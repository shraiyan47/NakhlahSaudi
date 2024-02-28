"use client";
import React, { useEffect, useState } from "react";
import { tabsQuestionaries } from "@/static-data/interface";
import { tabsContents } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import {
 
  useTabularView,
} from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";


import ContentType from "@/components/dashboard-admin/tabular-view/questionaries/ContentType";
import ConTypeCategory from "@/components/dashboard-admin/tabular-view/questionaries/ConTypeCategory";
import Content from "@/components/dashboard-admin/tabular-view/questionaries/Content";
import AddQuePage from "@/components/dashboard-admin/modals/questionaries/AddQuePage";

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
  
 
  
    useEffect(() => {
      setTabularView({
        currentPage: "contents",
        currentView: Object.keys(tabsContents)[0],
        currentSubView: tabsContents[Object.keys(tabsContents)[0]][0],
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
          {Object.keys(tabsContents).map((item, ind) => {
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
                      item == "Questions Mapping" || item == "Contents" ? "MCQ" : "",
                    currentAct: "view",
                  });
                }}
              />
            );
          })}
        </div>
        {/* <div className="flex flex-col gap-0.4 items-end px-2 mt-0.25">
          {currentView == "Questions Mapping" && (
            <div className="flex gap-1 items-center">
              <CustomSelect2
                label="Journey"
                value={selectedJourney}
                options={journeyData}
                onChange={(value) =>
                  setSelectedJourney({ id: value.id, title: value.title })
                }
              />
              <ChevronsRight className="w-[1.2rem] h-[1.2rem] text-slate-500" />
              <CustomSelect2
                label="Unit"
                value={selectedUnit}
                options={filteredUnits}
                onChange={(value) =>
                  setSelectedUnit({ id: value.id, title: value.title })
                }
              />
              <ChevronsRight className="w-[1.2rem] h-[1.2rem] text-slate-500" />
              <CustomSelect2
                label="Level"
                value={selectedLevel}
                options={filteredLevels}
                onChange={(value) =>
                  setSelectedLevel({ id: value.id, title: value.title })
                }
              />
              <ChevronsRight className="w-[1.2rem] h-[1.2rem] text-slate-500" />
              <CustomSelect2
                label="Lesson"
                value={selectedLesson}
                options={filteredLessons}
                onChange={(value) =>
                  setSelectedLesson({ id: value.id, title: value.title })
                }
              />
            </div>
          )}
          <div className="flex gap-2 ">
            {tabsContents[currentView]?.map((item, ind) => {
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
        </div> */}
  
        <div className="flex-grow overflow-y-scroll  ">
          
  
          {/* {currentView == "Question Content Types" && <QueType />} */}
          {currentView == "Content Types" && <ContentType />}
          {currentView == "Content Data Types" && <ConTypeCategory />}
          {/* {currentView == "Contents" && <Content />} */}
          {/* {currentView == "Questions" && <QuestionTitle />} */}
          {currentView == "Content Details" && <ContentDetails />}
          {currentView == "Languages" && <Language />}
          {currentView == "Content Details by Languages" && <ContentDetailsByLanguage />}
          {currentView == "Content By Clauses" && <ContentsByClause />}
          {currentAct == "add" && currentSubView == "MCQ" && (
            <AddQuePage useForEdit={false} />
          )}
       
        </div>
  
  {/* contents filters*/}
  <div className="flex-grow overflow-y-scroll  ">
          {currentView == "Contents" &&
            currentAct == "view" &&
            currentSubView == "MCQ" && <McqContent/>}
  
          {currentView == "Contents" &&
            currentAct == "view" &&
            currentSubView == "True Or False" && <TOFcontent />}
  
          {currentView == "Contents" &&
            currentAct == "view" &&
            currentSubView == "Pair Matching" && <PMContent />}
  
  {currentView == "Contents" &&
            currentAct == "view" &&
            currentSubView == "Fill In The Blank" && <FITBContent/>}
            
          {currentView == "Contents" &&
            currentAct == "view" &&
            currentSubView == "Sentence Making" && <SMContent/>}
          
        
        </div>
  
      </div>
    );
  }
  