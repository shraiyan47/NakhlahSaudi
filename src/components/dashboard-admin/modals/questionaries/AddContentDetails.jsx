"use client";
// import Script from "next/script"
 
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useContent,
  useContentDetails,
  useLanguage,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState, useEffect } from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "../../../ui-custom/CustomSelect";
import { BASE_URL, config, postMap, putMap, getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import Image from "next/image";
import RVVoiceGen from "@/app/voiceGen";


export default function AddContentDetail({ rowData, useForEdit }) {

  //
  const { toast } = useToast();
  const contentData = useContent((state) => state.data);
  const setContentData = useContent((state) => state.setContents);
  const languageData = useLanguage((state) => state.data);
  const setLanguageData = useLanguage((state) => state.setLanguage);
  const addEdit = useContentDetails((state) => state.addEdit);
  const afterAdd = useContentDetails((state) => state.afterAdd);
  const afterUpdate = useContentDetails((state) => state.afterUpdate);
  const [contentDetailsTitle, setContentDetailsTitle] = useState(useForEdit ? rowData.title : "");
  const [contentDetailsAudio, setContentDetailsAudio] = useState(useForEdit ? rowData.contentAudio : "");
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

  const [selectedLanguage, setSelectedLanguage] = useState(
    useForEdit
      ? {
        id: rowData.language.id,
        title: rowData.language.title,
      }
      : initStateSelection
  );
  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );
  console.log("rowdata", rowData)

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
        // console.log("dhuru", dataRenderable)
      }
    };
    // console.log("dhuru", contentData)
    if (Array.isArray(contentData) && contentData.length === 0) {
      fetchContents();
    }
  }, [contentData]);


  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getHandler("language");
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.name,
          };
        });
        setLanguageData(dataRenderable);
       console.log("dhuru", dataRenderable)
      }
    };
    // console.log("dhuru", contentData)
    if (Array.isArray(languageData) && languageData.length === 0) {
      fetchLanguages();
    }
  }, [languageData]);



  async function handleSubmit(e) {
    e.preventDefault();
   
      let formData = new FormData();
      var contentDetailsTitleInput = document.getElementById("idInputContentDetailsTitle");
      var contentDetailsAudioInput = document.getElementById("idInputContentDetailsAudio");
      var fileInput = document.getElementById("idInputFile");

      var file = fileInput.files[0];
      formData.append("files.image", file);
      // "title":"${contentDetailsTitleInput.value}",
      formData.append(
        "data",
        `{  "language" : {"connect": [${selectedLanguage.id}]},
        "audio": "${contentDetailsAudioInput.value}", "content": { "connect": [${selectedContent.id}] }}`
      );



      await fetch(
        useForEdit
          ? putMap["content-details"] + `/${rowData.id}?populate=*`
          : postMap["content-details"] + `?populate=*`,
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
          console.log("res", data, data.data.attributes?.language?.data?.id, data.data.attributes?.language.data?.attributes?.name)
          ////alert(JSON.stringify(data));
          let renderable = {
            id: data.data.id,
            title: data.data.attributes?.title,
            language: {
              id: data.data.attributes?.language?.data?.id,
             title: data.data.attributes?.language.data?.attributes?.name
            },
            content: {
              id: data.data.attributes?.content?.data?.id,
              title: data.data.attributes?.content?.data?.attributes?.title,
            },
            contentAudio: data.data.attributes?.audio,
            icon: data.data.attributes.image?.data?.attributes?.url,
          };
          console.log("renderable111111", renderable, data.data)
          useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
          toast({
            title: useForEdit ? "Successfully Updated" : "Successfully Added",
          });
          document.getElementById("closeDialog")?.click();
        })
        .catch((error) => {
          //alert("err: " + JSON.stringify(error));
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
          {/* <div className="flex flex-col ">
            <label>Content Detail Title</label>
            <CustomInput
              id="idInputContentDetailsTitle"
              type="text"
              value={contentDetailsTitle}
              onChange={(e) => setContentDetailsTitle(e.target.value)}
              ph="Enter Content Detail Title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div> */}
 <div className="flex flex-col gap-1">
            <CustomSelect
              id="idSelectedlanguage"
              label={"Languages"}
              value={selectedLanguage}
              options={languageData}
              bg="wh"
              onChange={(value) =>
                setSelectedLanguage({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
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

          <div className="flex flex-col ">
            <label>Audio of Content Detail</label>
            <CustomInput
              id="idInputContentDetailsAudio"
              type="text"
              value={contentDetailsAudio}
              onChange={(e) => setContentDetailsAudio(e.target.value)}
              ph="Enter Audio Text"
              style="py-0.25 px-1"
            />


            {
              (!!contentDetailsAudio && contentDetailsAudio !== null) &&
              <RVVoiceGen contentDetailsAudio={contentDetailsAudio} />
            }

            {/* <ReactSpeechKit /> */}
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
              <Image
                alt=" image"
                src={image}
                className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
                width={50}
                height={50}
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
