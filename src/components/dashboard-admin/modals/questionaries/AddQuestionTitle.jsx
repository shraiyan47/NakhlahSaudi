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
 
  const afterAdd = useQuestionTitle((state) => state.afterAdd);
  const afterUpdate = useQuestionTitle((state) => state.afterUpdate); 
  const [questionTitle, setQuestionTitle] = useState(useForEdit ? rowData.questionsTitle : "");
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });

  function escapeQuotes(text) {
    const escapeChars = {
      '"': '\\"',
      '\'': '\\\'',
    };
    const escapedText = text.replace(/["']/g, (match) => escapeChars[match]);
  
    return escapedText;
  }

  
  async function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    var questionTitleInput = document.getElementById("inputQuestionTitle");
 
    formData.append( 
      "data",
      `{"question":"${escapeQuotes(questionTitleInput.value)}" }`
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
      .then((res) =>  
        res.json()
      )
      .then((data) => {
        // alert(JSON.stringify(data));
        
        console.log("DATA AQT ==> ",data)
        
        let renderable = {
          id: data.data.id,
          questionsTitle: data.data.attributes.question,
        };
        
        console.log(" A Q T renderable => ", renderable)
        
        useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
        toast({
          title: useForEdit ? "Successfully Updated" : "Successfully Added",
        });
        document.getElementById("closeDialog")?.click();
      })
      .catch((error) => {
        // alert("err: " + JSON.stringify(error));
        
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
