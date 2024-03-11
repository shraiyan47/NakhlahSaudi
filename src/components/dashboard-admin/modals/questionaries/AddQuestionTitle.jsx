//"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useContent,
  useQuestionTitle,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useEffect, useState } from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import { BASE_URL, config, getHandler, postMap, putMap } from "@/lib/requestHandler";
import Image from "next/image";
import CustomSelect from "@/components/ui-custom/CustomSelect";



export default function AddQuestionTitle({ rowData, useForEdit }) {
  //
  const { toast } = useToast();

  const addEdit = useQuestionTitle((state) => state.addEdit);
  const afterAdd = useQuestionTitle((state) => state.afterAdd);
  const afterUpdate = useQuestionTitle((state) => state.afterUpdate);
  const contentData = useContent((state) => state.data);
  const setContentData = useContent((state) => state.setContents);
  const [questionTitle, setQuestionTitle] = useState(useForEdit ? rowData.questionsTitle : "");
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });

  const initStateSelection = {
    id: null,
    title: "",
  };

  const [selectedContent, setSelectedContent] = useState(
    useForEdit
      ? {
        id: rowData.content.id,
        title: rowData.content.title,
      }
      : initStateSelection
  );

  useEffect(() => {
    const fetchContents = async () => {
      const response = await getHandler("content-all");
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setContentData(dataRenderable);
        console.log("dhuru", dataRenderable)
      }
    };

    console.log("dhuru", contentData)
    if (Array.isArray(contentData) && contentData.length === 0) {
      fetchContents();
    }
  }, [contentData]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    var questionTitleInput = document.getElementById("inputQuestionTitle");
    var questionContent = document.getElementById("idSelectedContent");
    // var fileInput = document.getElementById("idInputFile");

    // var file = fileInput.files[0];
    // formData.append("files.image", file);

    console.log("BUnga -->",selectedContent)

    formData.append( // Remove Q Content
      "data",
      `{"question":"${questionTitleInput.value}", "question_content": { "connect": [${selectedContent.id}] } }`
    );

    console.log("Question Add : ", formData)

    await fetch(
      useForEdit
        ? putMap["QuestionsTitleFull"] + `/${rowData.id}?populate=*`
        : postMap["QuestionsTitleFull"],
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
          questionsTitle: title,
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
            <label>Question Title</label>
            <CustomInput
              id="inputQuestionTitle"
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              ph="Enter Question Title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div>

          <div className="flex flex-col gap-1">
            <CustomSelect
              id="idSelectedContent"
              label={"Contents"}
              value={selectedContent}
              options={contentData}
              bg="wh"
              onChange={(value) =>
                setSelectedContent({ id: value.id, title: value.title })
              }
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
