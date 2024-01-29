"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useLearnerStartPoint,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import { BASE_URL, config, postMap, putMap } from "@/lib/requestHandler";

export default function AddStartingPoint({ rowData, useForEdit }) {
  //
  const { toast } = useToast();

  const addEdit = useLearnerStartPoint((state) => state.addEdit);
  const afterAdd = useLearnerStartPoint((state) => state.afterAdd);
  const afterUpdate = useLearnerStartPoint((state) => state.afterUpdate);
  const [title, setTitle] = useState(useForEdit ? rowData.title : "");
  const [subtitle, setSubtitle] = useState(useForEdit ? rowData.subtitle : "");
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });

  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.length < 3) {
      setError({ ...error, err0: "Too Short" });
    } else if (subtitle.length < 3) {
      setError({ ...error, err1: "Too Short" });
    } else {
      let formData = new FormData();
      var titleInput = document.getElementById("idInputTitle");
      var subTitleInput = document.getElementById("idInputSubTitle");
      var fileInput = document.getElementById("idInputFile");

      var file = fileInput.files[0];
      formData.append("files.icon", file);

      formData.append(
        "data",
        `{"title":"${titleInput.value}", "subtitle": "${subTitleInput.value}"}`
      );
      await fetch(
        useForEdit
          ? putMap["learner-start-point"] + `/${rowData.id}?populate=icon`
          : postMap["learner-start-point"],
        {
          method: useForEdit ? "PUT" : "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer " +
              "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e",
          },
          redirect: "follow",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          alert(JSON.stringify(data));
          let renderable = {
            id: data.data.id,
            title: title,
            subtitle: subtitle,
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
          alert("err: " + JSON.stringify(error));
          setError(JSON.stringify(error));
        });
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
          <div className="flex flex-col ">
            <label>Start Point Title</label>
            <CustomInput
              id="idInputTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ph="Enter Title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div>
          <div className="flex flex-col ">
            <label>Start Point Subtitle</label>
            <CustomInput
              id="idInputSubTitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              ph="Enter Subtitle"
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
