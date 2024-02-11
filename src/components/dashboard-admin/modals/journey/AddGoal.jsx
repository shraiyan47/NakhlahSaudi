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
import { BASE_URL, config, postMap, putMap } from "@/lib/requestHandler";

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
 
  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }





  async function handleSubmit(e) {
    e.preventDefault();
    if (targetTime<0) {
      setError({ ...error, err0: "can not be 0 and negative" });
    
    } else {
      let formData = new FormData();
      var goalNameInput = document.getElementById("idGoalName");
    var targetTimeInput = document.getElementById("idTargetTime");
      var fileInput = document.getElementById("idInputFile");

      var file = fileInput.files[0];
      formData.append("files.icon", file);

      formData.append(
        "data",
       `{ "time": "${targetTimeInput.value}"}`
      );
      await fetch(
        useForEdit
          ? putMap["learner-goal"] + `/${rowData.id}?populate=icon`
          : postMap["learner-goal"],
        {
          method: useForEdit ? "PUT" : "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer " +
              "5cb5acf4b96532cdad0e30d900772f5c8b5532d2dbf06e04483a3705c725ffbbdba593340718423a5975e86aa47ca1749de402ec9f3127648dbcec37b190107ba975e669811b2a2f4c8b41c27472d6fdb70e7b0be4f8490c57a406e29aedf47dd05dadb7171788ba9fa2af106d93b4f92423b8e194131891e712857b52e8ceef",
          },
          redirect: "follow",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          alert(JSON.stringify(data));
          let renderable = {
            id: data.data.id,
            time: data.data.time,
           
            icon: data.data.attributes.icon?.data?.attributes?.url,
          };
           console.log("renderable from start point", renderable )
          useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
          toast({
            title: useForEdit ? "Successfully Updated" : "Successfully Added",
          });
          document.getElementById("closeDialog")?.click();
        })
        .catch((error) => {
          alert("err: " + JSON.stringify(error));
          setError(JSON.stringify(error));
        });
    }
  }

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  //   if (goalName?.length > 2 && targetTime?.length > 0 && isNumeric(targetTime)) {
  //     const result = await addEdit({
  //       useForEdit,
  //       data: {
  //          goal: goalName,
  //         time: targetTime,
  //       },
  //       id: rowData?.id,
  //     });

  //     if (result.status == 200) {
  //       useForEdit ? afterUpdate(result.data) : afterAdd(result.data);
  //       toast({
  //         title: result.message,
  //       });
  //       document.getElementById("closeDialog")?.click();
  //     } else if (result.status == 400) {
  //       setError(result.errors);
  //     }
  //   } else {
  //     alert(":::: "+JSON.stringify(isNumeric(targetTime)));
  //     if (goalName?.length < 3) {
  //       err_0 = "Too Short";
  //     }
  //     if (isNumeric(targetTime) == false) {
  //       err_1 = "Wrong target time";
  //     }
  //     setError({ err0: err_0, err1: err_1 });
  //   }
  // }



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
              <span>Target time</span>
            </label>
            <CustomInput
              id="idTargetTime"
              type="text"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              ph="Target time"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err1}</span>
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
