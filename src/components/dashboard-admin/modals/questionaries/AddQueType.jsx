"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminFormButton from "../../../ui-custom/AdminFormButton";

import { useToast } from "@/components/ui/use-toast";
import CustomInput from "../../../ui-custom/CustomInput";
import { useQueType, useTabularView } from "../../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "../../../ui-custom/CustomButton";

export default function AddQueType({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  //
  const addEdit = useQueType((state) => state.addEdit);
  const afterAdd = useQueType((state) => state.afterAdd);
  const afterUpdate = useQueType((state) => state.afterUpdate);
  //
  const [queType, setQueType] = useState(useForEdit ? rowData.title : "");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (queType.length < 3) {
      setError("Too Short");
    } else {
      const result = await addEdit({
        useForEdit,
        data: {
          title: queType,
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
        setError(result.error);
      }
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
          <div className="flex flex-col gap-1">
            <label>Question Type</label>
            <CustomInput
              type="text"
              value={queType}
              onChange={(e) => setQueType(e.target.value)}
              ph="Enter question type"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error}</span>
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
