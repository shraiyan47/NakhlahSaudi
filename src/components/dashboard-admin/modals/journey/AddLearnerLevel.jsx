"use client";
import InputField from "../../../ui-custom/InputField";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LearningLevelAddItem_URL } from "../../../../lib/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AdminFormButton from "../../../ui-custom/AdminFormButton";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  useLearnerLevel,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState } from "react";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomButton from "@/components/ui-custom/CustomButton";
import { BASE_URL, fetchHeader, postMap, putMap } from "@/lib/requestHandler";

export default function AddLearnerLevel({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  //
  const addEdit = useLearnerLevel((state) => state.addEdit);
  const afterAdd = useLearnerLevel((state) => state.afterAdd);
  const afterUpdate = useLearnerLevel((state) => state.afterUpdate);
  //
  const [learnerLevel, setLearnerLevel] = useState(
    useForEdit ? rowData.level : ""
  );
  const [error, setError] = useState("");
  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    var levelInput = document.getElementById("idInputLevel");
    var fileInput = document.getElementById("idInputFile");
    var file = fileInput.files[0];

    formData.append("files.icon", file);
    formData.append("data", `{"level":"${levelInput.value}"}`);

    if (learnerLevel.length < 3) {
      setError("Too Short");
    } else {
      await fetch(
        useForEdit
          ? putMap["learner-level"] + `/${rowData.id}?populate=icon`
          : postMap["learner-level"],
        {
          method: useForEdit ? "PUT" : "POST",
          body: formData,
          headers: fetchHeader,
          redirect: "follow",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          let renderable = {
            id: data.data.id,
            level: data.data.attributes.level,
            icon: data.data.attributes.icon?.data?.attributes?.formats?.small
              ?.url,
          };
          useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
          toast({
            title: useForEdit ? "Successfully Updated" : "Successfully Added",
          });
          document.getElementById("closeDialog")?.click();
        })
        .catch((error) => {});
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
            <label>Learning Level</label>
            <CustomInput
              type="text"
              id={"idInputLevel"}
              value={learnerLevel}
              onChange={(e) => setLearnerLevel(e.target.value)}
              ph="Enter learner level"
              style={"py-0.25 px-1"}
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
