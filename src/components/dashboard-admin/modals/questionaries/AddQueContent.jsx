"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import CustomInput from "../../../ui-custom/CustomInput";
//
import {
  useQueType,
  useQuestion,
  useContent,
  useQueContent,
} from "../../../../store/useAdminStore";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";

export default function AddQueContent({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };
  const [selectedContent, setSelectedContent] = useState(
    useForEdit ? rowData.content : ""
  );
  const [selectedQue, setSelectedQue] = useState(
    useForEdit
      ? {
          id: rowData.question.id,
          title: rowData.question.question,
        }
      : initStateSelection
  );
  const [selectedType, setSelectedType] = useState(
    useForEdit
      ? {
          id: rowData.question_type.id,
          title: rowData.question_type.title,
        }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
  });

  const queData = useQuestion((state) => state.data);
  const setQuestions = useQuestion((state) => state.setQuestions);
  //
  const typeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  //
  const contentData = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  //

  const afterAdd = useQueContent((state) => state.afterAdd);
  const afterUpdate = useQueContent((state) => state.afterUpdate);

  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    if (
      selectedContent.id != null &&
      selectedQue.id != null &&
      selectedType.id != null
    ) {
      const data = {
        question: {
          connect: [selectedQue.id],
        },
        question_type: {
          connect: [selectedType.id],
        },
        content: {
          connect: [selectedContent.id],
        },
      };

      const result = useForEdit
        ? await putHandler("question-content", rowData.id, { data })
        : await postHandler("question-content", {
            data,
          });

      if (result.status == 200) {
        

        let data = {
          id:result.data.data.id,
          question: {
            id: selectedQue.id,
            question: selectedQue.title,
          },

          question_type: {
            id: selectedType.id,
            title: selectedType.title,
          },
          content: {
            id: selectedContent.id,
            title: selectedContent.title,
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
        setError({
          err0: errors[0].message,
          err1: errors[1]?.message,
          err2: errors[2]?.message,
        });
      }
    } else {
      if (selectedQue.id == null) {
        err_0 = "Select question ";
      }
      if (selectedType.id == null) {
        err_1 = "Select question type";
      }
      if (selectedContent.id == null) {
        err_2 = "Select conetnt";
      }
      setError({ err0: err_0, err1: err_1, err2: err_2 });
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");

      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setQueTypes(data);
      }
    };
    if (Array.isArray(typeData) && typeData.length === 0) {
      fetch();
    }
  }, [typeData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content");

      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          // alert("::: " + JSON.stringify(item.attributes?.content_type));
          return {
            id: item.id,
            title: item.attributes?.title,
            content_type: {
              id: item.attributes?.content_type?.data.id,
              title: item.attributes?.content_type?.data?.attributes?.title,
            },
            content_type_category: {
              id: item.attributes?.content_type_category?.data?.id,
              title:
                item.attributes?.content_type_category?.data?.attributes?.title,
            },
          };
        });
        setContents(data);
      }
    };
    if (Array.isArray(contentData) && contentData.length === 0) {
      fetch();
    }
  }, [contentData]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getHandler("question");

      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          // alert(" <> : "+JSON.stringify(item))
          return {
            id: item.id,
            title: item.attributes.question,
          };
        });
        setQuestions(data);
      }
    };
    if (Array.isArray(queData) && queData.length === 0) {
      fetchQuestions();
    }
  }, [queData]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
        {useForEdit ? "Update" : "New"} {tabularView.currentView}
        </DialogTitle>
        {/* <DialogDescription className="textNormal textSecondaryColor">
           instructions
        </DialogDescription> */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Select Question</label>
            <CustomSelect
              value={selectedQue}
              options={queData}
              bg="light"
              onChange={(value) =>
                setSelectedQue({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err0}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label>Select Question Type</label>
            <CustomSelect
              value={selectedType}
              options={typeData}
              bg="light"
              onChange={(value) =>
                setSelectedType({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label>Select Content</label>
            <CustomSelect
              value={selectedContent}
              options={contentData}
              bg="light"
              onChange={(value) =>
                setSelectedContent({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err2}</span>
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
