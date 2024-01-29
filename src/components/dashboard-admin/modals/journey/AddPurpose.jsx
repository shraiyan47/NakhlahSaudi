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
import {
  getHandler,
  getMap,
  postMap,
  putMap,
  fetchHeader,
  BASE_URL,
} from "@/lib/requestHandler";
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

  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    var inputTilte = document.getElementById("idInputPurpose");
    var fileInput = document.getElementById("idInputFile");
    var file = fileInput.files[0];
    formData.append("files.icon", file);
    formData.append("data", `{"purpose":"${inputTilte.value}"}`);

    await fetch(
      useForEdit
        ? putMap["learner-purpose"] + `/${rowData.id}?populate=icon`
        : postMap["learner-purpose"],
      {
        method: useForEdit ? "PUT" : "POST",
        body: formData,
        headers: fetchHeader,
        redirect: "follow",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(">> " + JSON.stringify(data));
        let renderable = {
          id: data.data.id,
          purpose: data.data.attributes.purpose,
          icon: data.data.attributes.icon?.data?.attributes?.formats?.small
            ?.url,
        };

        useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
        toast({
          title: useForEdit ? "Successfully Updated" : "Successfully Added",
        });
        document.getElementById("closeDialog")?.click();
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  return (
    <>
      <DialogHeader className={" py-0"}>
        <DialogTitle className="font-mono text-xl text-slate-700 py-0.25">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>
        <div id="uploadStatus"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Learning Purpose</label>
            <CustomInput
              id="idInputPurpose"
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              ph="Enter learning purpose"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <div className="flex gap-2 flex-col items-start">
            <input
              type="file"
              id="idInputFile"
              name="file"
              onChange={(e) => {
                let files = e.target.files;
                let reader = new FileReader();
                reader.onload = (r) => {
                  setImage(r.target.result);
                };
                reader.readAsDataURL(files[0]);
              }}
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
