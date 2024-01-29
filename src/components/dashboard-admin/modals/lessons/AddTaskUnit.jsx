"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  journey_add_url,
  unit_post_url,
  journey_get_url,
} from "../../../../lib/url";

import * as z from "zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
 
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "../../../ui-custom/CustomInput";
import {
  useLearningJourney,
  useLearningUnit,
  useTabularView,
} from "../../../../store/useAdminStore";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import { ChevronLast } from "lucide-react";

export default function AddTaskUnit({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();

  const journies = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  //
  const addEdit = useLearningUnit((state) => state.addEdit);
  const afterAdd = useLearningUnit((state) => state.afterAdd);
  const afterUpdate = useLearningUnit((state) => state.afterUpdate);
  //
  const [taskName, setTaskName] = useState(useForEdit ? rowData.title : "");
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.learning_journey.id,
          title: rowData.learning_journey.title,
        }
      : {
          id: null,
          title: "",
        }
  );
  const [error, setError] = useState({ err0: "", err1: "", err2: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    let err_1 = "";
    let err_2 = "";

    if (selectedJourney.title != "" && !(taskName.length < 3)) {
      const data = {
        title: taskName,
        learning_journey: {
          connect: [selectedJourney.id],
        },
      };

      const result = useForEdit
        ? await putHandler("learning-unit", rowData.id, { data })
        : await postHandler("learning-unit", {
            data,
          });

      if (result.status == 200) {
        let data = result.data.data;
        data = {
          id: data.id,
          title: data.attributes.title,
          learning_journey: {
            id: selectedJourney.id,
            title: selectedJourney.title,
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
        setError({ err0: errors[0].message, err1: errors[1]?.message });
      }
    } else {
      if (selectedJourney.title === "") {
        err_1 = "Select Journey Level Before Task Name";
      }
      if (taskName.length < 3) {
        err_2 = "Too Short";
      }
      setError({ err0: "", err1: err_1, err2: err_2 });
    }
  }

  useEffect(() => {
    const fetch = async () => {
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
    if (Array.isArray(journies) && journies.length === 0) {
      fetch();
    }
  }, [journies]);

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor h-fit py-0 flex flex-col">
          {useForEdit ? "Update" : "New"} {addWhat}
          <p className="text-sm font-normal text-slate-500 my-0 py-0 h-fit flex gap-2 items-center">
            Level <ChevronLast className="w-4 h-4" />
            <span className="font-semibold text-slate-800">Task</span>
          </p>
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <CustomSelect
              label={"Select Learning Journey"}
              value={selectedJourney}
              options={journies}
              bg="wh"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex justify-between">
              <span>Learning Task Name</span>
              <span className="text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              ph="Enter task name"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err2}</span>
          </div>

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>

        {/* {errorMessageCall !== '' && <p className='text-red-600 text'>{errorMessageCall}</p>} */}
      </DialogHeader>
    </>
  );
}
