"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";
import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../../ui-custom/CustomInput";
import {
  useLearningLesson,
  useLearningJourney,
  useLearningLevel,
  useLearningUnit,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import { ChevronLast } from "lucide-react";
import { renderableLearningLevels, renderableTaskUnits, renderableTasks } from "@/lib/fetchFunctions";

export default function AddLesson({ rowData, useForEdit }) {
  const { toast } = useToast();
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

  const [lessonName, setLessonName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_level.learning_journey_unit
            .learning_journey.id,
          title:
            rowData.learning_journey_level.learning_journey_unit
              .learning_journey.title,
        }
      : initStateSelection
  );
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_level.learning_journey_unit.id,
          title: rowData.learning_journey_level.learning_journey_unit.title,
        }
      : initStateSelection
  );
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_level.id,
          title: rowData.learning_journey_level.title,
        }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
    err3: "",
    err4: "",
  });

  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  //
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);
  //
  const afterUpdate = useLearningLesson((state) => state.afterUpdate);
  const afterAdd = useLearningLesson((state) => state.afterAdd);

  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    if (
      selectedJourney.title != "" &&
      selectedUnit.title != "" &&
      selectedLevel.title != "" &&
      !(lessonName.length < 3)
    ) {
      const data = {
        title: lessonName,
        learning_journey_level: {
          id: selectedLevel.id,
          title: selectedLevel.title,
          learning_journey_unit: {
            id: selectedUnit.id,
            title: selectedUnit.title,
            learning_journey: {
              id: selectedJourney.id,
              title: selectedJourney.title,
            },
          },
        },
      };

      const result = useForEdit
        ? await putHandler("learning-lesson", rowData.id, { data })
        : await postHandler("learning-lesson", {
            data,
          });

      if (result.status == 200) {
        let data = result.data.data;

        data = {
          id: data.id,
          title: data.attributes.title,
          learning_journey_level: {
            id: selectedLevel.id,
            title: selectedLevel.title,
            learning_journey_unit: {
              id: selectedUnit.id,
              title: selectedUnit.title,
              learning_journey: {
                id: selectedJourney.id,
                title: selectedJourney.title,
              },
            },
          },
        };

        useForEdit ? afterUpdate(data) : afterAdd(data);
        toast({
          title: useForEdit
            ? "Item Updated Succesfully"
            : "Item Added Successfully",
        });
        document.getElementById("closeDialog")?.click();
      } else if (result.status == 400) {
        let errors = result.data.error.details.errors;
        setError({
          err0: errors[0].message,
          err1: errors[1]?.message,
          err2: errors[2]?.message,
          err3: errors[3]?.message,
          err4: errors[4]?.message,
        });
      }
    } else {
      if (selectedJourney.id == null) {
        err_1 = "Select Journey Level First";
      }
      if (selectedUnit.id == null) {
        err_2 = "Select A Task-unit";
      }
      if (selectedLevel.id == null) {
        err_3 = "Select Task Level Before Creating New Lesson";
      }
      if (lessonName.length < 3) {
        err_4 = "Too Short";
      }
      setError({ err1: err_1, err2: err_2, err3: err_3, err4: err_4 });
    }
  }

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
    if (selectedJourney.id != null) {
      useForEdit ? "" : setSelectedUnit(initStateSelection);
      filterUnitsByJourney(selectedJourney.id);
    }
  }, [selectedJourney]);

  useEffect(() => {
    if (selectedUnit.id != null) {
      useForEdit ? "" : setSelectedLevel(initStateSelection);
      filterLevelsByUnit(selectedUnit.id);
    }
  }, [selectedUnit]);

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  return (
    <DialogHeader className="">
      <DialogTitle className="textHeader textPrimaryColor h-fit py-0 flex flex-col">
        {useForEdit ? "Update" : "New"} {addWhat}
        <p className="textNormal textSecondaryColor my-0 py-0 h-fit flex gap-2 items-center">
          Level <ChevronLast className="w-4 h-4" /> Task
          <ChevronLast className="w-4 h-4" /> Task Unit
          <ChevronLast className="w-4 h-4" />{" "}
          <span className="font-semibold text-slate-800">Lesson</span>
        </p>
      </DialogTitle>

      <div className="overflow-y-scroll h-[430px] pr-2 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col ">
            <CustomSelect
              value={selectedJourney}
              label={"Select Learning Level"}
              options={journeyData}
              bg="wh"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col">
            {/* <label>{selectedUnit}</label> */}
            <CustomSelect
              value={selectedUnit}
              options={filteredUnits}
              bg="wh"
              label={"Select Task"}
              onChange={(value) =>
                setSelectedUnit({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err2}</span>
          </div>
          <div className="flex flex-col ">
            <CustomSelect
              label={"Select Task Unit"}
              value={selectedLevel}
              options={filteredLevels}
              bg="wh"
              onChange={(value) =>
                setSelectedLevel({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err3}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex justify-between">
              <span>Learning Lesson Name</span>
              <span className=" text-red-700">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              ph="Enter lesson title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err4}</span>
          </div>

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>
      </div>
    </DialogHeader>
  );
}
