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
  useConTypeCategory,
  useConType,
  useContent,
  useTabularView,
  
} from "../../../../store/useAdminStore";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";

import { BASE_URL, config, postMap, putMap, getHandler, postHandler, putHandler } from "@/lib/requestHandler";

export default function AddContent({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };

  const [content, setContent] = useState(useForEdit ? rowData.title : "");
  const [queAudio, setQueAudio] = useState(useForEdit ? rowData.audio : "");
  const [selectedCategory, setSelectedCategory] = useState(
    useForEdit
      ? {
        id: rowData.content_type_category.id,
        title: rowData.content_type_category.title,
      }
      : initStateSelection
  );

  const [selectedType, setSelectedType] = useState(
    useForEdit
      ? {
        id: rowData.content_type.id,
        title: rowData.content_type.title,
      }
      : initStateSelection
  );
  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
  });

  const categoryData = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );
  //
  const typeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  //
  const afterUpdate = useContent((state) => state.afterUpdate);
  const afterAdd = useContent((state) => state.afterAdd);
  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );

  // before
  async function handleSubmit(e) {
    e.preventDefault();
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let formData = new FormData();
    var categoryInput = document.getElementById("idSelectedCategory");
    var questionTypeInput = document.getElementById("idQuestionType");
    var contentInput = document.getElementById("idContent");
    var audioTextInput = document.getElementById("idAudioText");
    var fileInput = document.getElementById("idInputFile");
    var file = fileInput.files[0];
    formData.append("files.image", file);

    if (
      selectedCategory.title != "" &&
      selectedType.title != "" &&
      !(content.length < 3)
    ) {
      // const data = {
      //   title: contentInput.value,
      //   content_type: {
      //     connect: [selectedType.id],
      //   },
      //   content_type_category: {
      //     connect: [selectedCategory.id],
      //   },
      //   audio: audioTextInput.value
      // };
  
      formData.append(
        "data",
        `{"title": "${contentInput.value}","audio": "${audioTextInput.value}","content_type": { "connect": [${selectedType.id}] },"content_type_category": { "connect": [${selectedCategory.id}] }}`
      );

      await fetch(
        useForEdit
          ? putMap["content"] + `/${rowData.id}?populate=icon`
          : postMap["content"],
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
        console.log("hello data ", data.data)
        console.log("data.data.attributes?.content_type_category?.data?.attributes?.title", data.data.attributes?.content_type_category?.data?.attributes?.title)
      //  alert(JSON.stringify(data));
        let renderable = {
          id: data.data.id,
          audio: data.data.attributes?.audio,
          title: data.data.attributes?.title,
          content_type: {
            id:  data.attributes?.content_type?.data?.id,
            title:data.attributes?.content_type?.attributes?.title,
          },
          content_type_category: {
            id: data.data.attributes?.content_type_category?.data?.id,
            title: data.data.attributes?.content_type_category?.data?.attributes?.title,
          },
          icon: data.data.attributes.image?.data?.attributes?.url,
        };
    
        useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
        toast({
          title: useForEdit ? "Successfully Updated" : "Successfully Added",
        });
        document.getElementById("closeDialog")?.click();
      }) 
      .catch((error) => {
        // console.log("hello FROM CATCH")
        alert("err: " + JSON.stringify(error));
        setError(JSON.stringify(error));
      });
    }
  }

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  



  function filterUnitsByJourney(id) {
    setFilteredUnits(unitData.filter((item) => item.learning_journey.id == id));
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getHandler("content-type-category");
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypeCategories(dataRenderable);
      }
    };

    if (Array.isArray(categoryData) && categoryData.length === 0) {
      fetchCategories();
    }
  }, [categoryData]);

  useEffect(() => {

    const fetchTypes = async () => {
      const response = await getHandler("content-type");

      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypes(dataRenderable);
      }
    };

    if (Array.isArray(typeData) && typeData.length === 0) {
      fetchTypes();
    }
  }, [typeData]);

 

  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>
        {/* <DialogDescription className="textNormal textSecondaryColor">
           instructions
        </DialogDescription> */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <CustomSelect
              id="idSelectedCategory"
              label={"Content Data Type"}
              value={selectedCategory}
              options={categoryData}
              bg="wh"
              onChange={(value) =>
                setSelectedCategory({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col gap-1">

            <CustomSelect

              id="idQuestionType"
              label={"Question Type"}
              value={selectedType}
              options={typeData}
              bg="wh"
              onChange={(value) =>
                setSelectedType({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err2}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex justify-between">
              <span>Content</span>
              <span className=" text-red-800">{error.err0}</span>
            </label>
            <CustomInput
              id="idContent"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ph="Enter content"
              style="py-0.12 px-1"
            />
            <span className="text-red-700">{error.err3}</span>
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
          <div className="flex flex-col gap-1 w-2/3 ">
            <span className="">Attach Audio Text</span>
            <textarea
              id="idAudioText"
              value={queAudio}
              onChange={(e) => setQueAudio(e.target.value)}
              rows={2}
              className="py-0.12 px-1 rounded-md border border-slate-400 outline-none"
            />

            {/* <span className="text-red-700">{error.err2}</span> */}
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
