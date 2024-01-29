"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useLearnerPurpose,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState } from "react";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomButton from "@/components/ui-custom/CustomButton";
import { getHandler, getMap } from "@/lib/requestHandler";
import axios from "axios";

export default function AddPurpose({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();

  const addEdit = useLearnerPurpose((state) => state.addEdit);
  const afterAdd = useLearnerPurpose((state) => state.afterAdd);
  const afterUpdate = useLearnerPurpose((state) => state.afterUpdate);
  //
  const [purpose, setPurpose] = useState(useForEdit ? rowData.purpose : "");
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    var fileInput = document.getElementById("fileInput");
    setImage(fileInput.files[0]);
    // if (event.target.files && event.target.files[0]) {
    //   setImage(URL.createObjectURL(event.target.files[0]));
    // }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    if (purpose.length < 3) {
      setError("Too Short");
    } else {
      formData.append("files.icon", image);
      formData.append("data", `{"purpose":"purposeregergreg"}`);
      // axios.post(getMap["learner-purpose"], formData).then((response) => {
      //   alert("response::: "+JSON.stringify(response));
      // });

      const result = await addEdit({
        useForEdit,
        data: formData,
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
      <DialogHeader className={" py-0"}>
        <DialogTitle className="font-mono text-xl text-slate-700 py-0.25">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Learning Purpose</label>
            <CustomInput
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              ph="Enter learning purpose"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              id="fileInput"
              onChange={onImageChange}
              className=""
            />
            {image && (
              <img
                alt=" image"
                src={image}
                className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
              />
            )}
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
