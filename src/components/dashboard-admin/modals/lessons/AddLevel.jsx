"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "../../../ui-custom/CustomInput";
//
import {
  level_by_journey_get_url,
  journey_get_url,
  level_add_url,
} from "../../../../lib/url";
import {
  useLearningJourney,
  useLearningUnit,
  useLearningLevel,
  useTabularView,
} from "../../../../store/useAdminStore";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import { ChevronLast } from "lucide-react";

export default function AddLevel({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const tabularView = useTabularView((state) => state.data);

  const initStateSelection = {
    id: null,
    title: "",
  };
  const [levelName, setLevelName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_unit.learning_journey.id,
          title: rowData.learning_journey_unit.learning_journey.title,
        }
      : initStateSelection
  );
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey_unit.id,
          title: rowData.learning_journey_unit.title,
        }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
    err3: "",
  });

  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  //
  const afterUpdate = useLearningLevel((state) => state.afterUpdate);
  const afterAdd = useLearningLevel((state) => state.afterAdd);

  async function handleSubmit(e) {
    e.preventDefault();
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    if (
      selectedJourney.title != "" &&
      selectedUnit.title != "" &&
      !(levelName.length < 3)
    ) {
      const data = {
        title: levelName,
        learning_journey_unit: {
          connect: [selectedUnit.id],
        },
      };

      const result = useForEdit
        ? await putHandler("learning-level", rowData.id, { data })
        : await postHandler("learning-level", {
            data,
          });

      if (result.status == 200) {
        let data = result.data.data;

        data = {
          id: data.id,
          title: data.attributes.title,
          learning_journey_unit: {
            id: selectedUnit.id,
            title: selectedUnit.title,
            learning_journey: {
              id: selectedJourney.id,
              title: selectedJourney.title,
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
        });
      }
    } else {
      if (selectedJourney.id == null) {
        err_1 = "Select Journey Level First";
      }
      if (selectedUnit.id == null) {
        err_2 = "Select A Task Before Creating New Level";
      }
      if (levelName.length < 3) {
        err_3 = "Too Short";
      }
      setError({ err1: err_1, err2: err_2, err3: err_3 });
    }
  }

  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
  }

  useEffect(() => {
    const fetchJournies = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setJournies(dataRenderable);
      }
    };

    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetchJournies();
    }
  }, [journeyData]);
  useEffect(() => {
    const fetchUnits = async () => {
      const response = await getHandler("learning-unit");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          const { learning_journey } = item.attributes;

          return {
            id: item.id,
            title: item.attributes.title,
            learning_journey: {
              id: learning_journey.data.id,
              title: learning_journey.data.attributes.title,
            },
          };
        });
        alert("task: " + JSON.stringify(data));
        setUnits(data);
      }
    };

    if (Array.isArray(unitData) && unitData.length === 0) {
      fetchUnits();
    }
  }, [unitData]);

  useEffect(() => {
    if (selectedJourney.id != null) {
      setSelectedUnit(initStateSelection);
      filterUnitsByJourney(selectedJourney.id);
    }
  }, [selectedJourney]);

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor h-fit py-0 flex flex-col">
          {useForEdit ? "Update" : "New"} {addWhat}
          <p className="textNormal textSecondaryColor my-0 py-0 h-fit flex gap-2 items-center">
            Level <ChevronLast className="w-4 h-4" /> Task
            <ChevronLast className="w-4 h-4" />
            <span className="font-semibold text-slate-800">Task Unit</span>
          </p>
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <CustomSelect
              value={selectedJourney}
              label={"Select Journey"}
              options={journeyData}
              bg="wh"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col gap-1">
            <CustomSelect
              value={selectedUnit}
              label={"Select Unit"}
              options={filteredUnits}
              bg="wh"
              onChange={(value) =>
                setSelectedUnit({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err2}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex justify-between">
              <span>Task Unit Title</span>
              <span className=" text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              ph="Enter task unit title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err3}</span>
          </div>

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>
      </DialogHeader>
    </>
  );
}
