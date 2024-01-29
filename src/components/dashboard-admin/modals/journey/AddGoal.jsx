"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  useLearnerGoal,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../../ui-custom/CustomInput";
import { useState } from "react";
import CustomButton from "../../../ui-custom/CustomButton";

export default function AddGoal({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const tabularView = useTabularView((state) => state.data);

  const afterAdd = useLearnerGoal((state) => state.afterAdd);
  const afterUpdate = useLearnerGoal((state) => state.afterUpdate);
  const addEdit = useLearnerGoal((state) => state.addEdit);
  const [goalName, setGoalName] = useState(useForEdit ? rowData.goal : "");
  const [targetTime, setTargetTime] = useState(useForEdit ? rowData.time : "");
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";

    if (goalName.length > 2 && targetTime.length > 0 && isNumeric(targetTime)) {
      const result = await addEdit({
        useForEdit,
        data: {
          goal: goalName,
          time: targetTime,
        },
        id: rowData?.id,
      });

      if (result.status == 200) {
        useForEdit ? afterUpdate(result.data) : afterAdd(result.data);
        toast({
          title: result.message,
        });
        document.getElementById("closeDialog")?.click();
      } else if (result.status == 400) {
        setError(result.errors);
      }
    } else {
      alert(":::: "+JSON.stringify(isNumeric(targetTime)));
      if (goalName.length < 3) {
        err_0 = "Too Short";
      }
      if (isNumeric(targetTime) == false) {
        err_1 = "Wrong target time";
      }
      setError({ err0: err_0, err1: err_1 });
    }
  }

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col">
            <label className="flex justify-between">
              <span>Goal Name</span>
            </label>
            <CustomInput
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              ph="Goal name"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div>

          <div className="flex flex-col">
            <label className="flex justify-between">
              <span>Target time</span>
            </label>
            <CustomInput
              type="text"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              ph="Target time"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err1}</span>
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
