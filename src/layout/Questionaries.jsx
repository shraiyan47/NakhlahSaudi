"use client";
import React, { useEffect, useState } from "react";
import { tabsQuestionaries } from "@/static-data/interface";
import CustomButton from "@/components/ui-custom/CustomButton";
import {
  useLearningJourney,
  useLearningLesson,
  useLearningLevel,
  useLearningUnit,
  useQuestion,
  useTabularView,
} from "../store/useAdminStore";
import EnhancedText from "@/components/ui-custom/EnhancedText";

import QueType from "@/components/dashboard-admin/tabular-view/questionaries/QueType";
import ContentType from "@/components/dashboard-admin/tabular-view/questionaries/ContentType";
import ConTypeCategory from "@/components/dashboard-admin/tabular-view/questionaries/ConTypeCategory";
import Content from "@/components/dashboard-admin/tabular-view/questionaries/Content";
import AddQuePage from "@/components/dashboard-admin/modals/questionaries/AddQuePage";
import { ChevronsRight, FileQuestion } from "lucide-react";
import CustomSelect2 from "@/components/ui-custom/CustomSelect2";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import {
  renderableLearningLevels,
  renderableLessons,
  renderableTaskUnits,
  renderableTasks,
} from "@/lib/fetchFunctions";
import MCQ from "@/components/dashboard-admin/tabular-view/questionaries/MCQ";
import TOF from "@/components/dashboard-admin/tabular-view/questionaries/TOF";
import FITB from "@/components/dashboard-admin/tabular-view/questionaries/FITB";
import PM from "@/components/dashboard-admin/tabular-view/questionaries/PM";
import SM from "@/components/dashboard-admin/tabular-view/questionaries/SM";
import AddMCQ from "@/components/dashboard-admin/modals/questionaries/AddMCQ";
import AddFITB from "@/components/dashboard-admin/modals/questionaries/AddFITB";
import AddTOF from "@/components/dashboard-admin/modals/questionaries/AddTOF";
import AddSM from "@/components/dashboard-admin/modals/questionaries/AddSM";
import AddPM from "@/components/dashboard-admin/modals/questionaries/AddPM";

export default function Questionaries({ content }) {
  //
  const currentView = useTabularView((state) => state.data.currentView);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  const currentAct = useTabularView((state) => state.data.currentAct);

  const setTabularView = useTabularView((state) => state.setTabularView);
  const setSubView = useTabularView((state) => state.setSubView);

  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  //
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);
  //
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);

  const initStateSelection = {
    id: null,
    title: "",
  };

  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
  }
  function filterLevelsByUnit(id) {
    setFilteredLevels(
      levelData.filter((item) => item.learning_journey_unit.id == id)
    );
  }
  function filterLessonsByLevel(id) {
    setFilteredLessons(
      lessonData.filter((item) => item.learning_journey_level.id == id)
    );
  }

  const selectedLesson = useQuestion((state) => state.selectedLesson);
  const selectedJourney = useQuestion((state) => state.selectedJourney);
  const selectedUnit = useQuestion((state) => state.selectedUnit);
  const selectedLevel = useQuestion((state) => state.selectedLevel);
  //
  const setSelectedUnit = useQuestion((state) => state.setSelectedUnit);
  const setSelectedLevel = useQuestion((state) => state.setSelectedLevel);
  const setSelectedLesson = useQuestion((state) => state.setSelectedLesson);
  const setSelectedJourney = useQuestion((state) => state.setSelectedJourney);
  //
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        setJournies(renderableLearningLevels(response.data.data));
      }
    };
    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetch();
    }
  }, [journeyData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit");
      if (response.status === 200) {
        setUnits(renderableTasks(response.data.data));
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetch();
    }
  }, [unitData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");
      if (response.status === 200) {
        setLevels(renderableTaskUnits(response.data.data));
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetch();
    }
  }, [levelData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      if (response.status === 200) {
        setLessons(renderableLessons(response.data.data));
      }
    };
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      fetch();
    }
  }, [lessonData]);
  //
  useEffect(() => {
    setSelectedUnit(initStateSelection);
    filterUnitsByJourney(selectedJourney.id);
  }, [selectedJourney]);

  useEffect(() => {
    setSelectedLevel(initStateSelection);
    filterLevelsByUnit(selectedUnit.id);
  }, [selectedUnit]);

  useEffect(() => {
    setSelectedLesson(initStateSelection);
    filterLessonsByLevel(selectedLevel.id);
  }, [selectedLevel]);

  useEffect(() => {
    if (currentView == "Questions") {
      let url =
        "/api/journey-map-question-contents?populate[question_content][populate]=*";
      url += currentSubView
        ? `&filters[question_content][question_type][title][$eq]=${currentSubView}`
        : "";

      if (currentSubView == "") {
      }
    }
  }, [currentSubView]);

  useEffect(() => {
    setTabularView({
      currentPage: "questionaries",
      currentView: Object.keys(tabsQuestionaries)[0],
      currentSubView: tabsQuestionaries[Object.keys(tabsQuestionaries)[0]][0],
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

        {currentView == "Add New Question" && (
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
        )}
      </div>

      <div className="flex gap-2 items-center">
        {Object.keys(tabsQuestionaries).map((item, ind) => {
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
                    item == "Questions" || item == "Contents" ? "MCQ" : "",
                  currentAct: "view",
                });
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-0.4 items-end px-2 mt-0.25">
        {currentView == "Questions" && (
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
          {tabsQuestionaries[currentView]?.map((item, ind) => {
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
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView == "MCQ" && <MCQ />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView == "True Or False" && <TOF />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView == "Fill In The Blank" && <FITB />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView == "Pair Matching" && <PM />}
        {currentView == "Questions" &&
          currentAct == "view" &&
          currentSubView == "Sentence Making" && <SM />}

        {currentView == "Question Types" && <QueType />}
        {currentView == "Content Types" && <ContentType />}
        {currentView == "Content Data Types" && <ConTypeCategory />}
        {currentView == "Contents" && <Content />}

        {currentAct == "add" && currentSubView == "MCQ" && (
          <AddQuePage useForEdit={false} />
        )}
        {currentAct == "add" && currentSubView == "Pair Matching" && (
          <div>{"Loading ... "}</div>
        )}
        {currentAct == "add" && currentSubView == "Sentence Making" && (
          <AddQuePage useForEdit={false} />
        )}
        {currentAct == "add" && currentSubView == "True Or False" && (
          <AddQuePage useForEdit={false} />
        )}
        {currentAct == "add" && currentSubView == "Fill In The Blank" && (
          <AddQuePage useForEdit={false} />
        )}
      </div>
    </div>
  );
}
