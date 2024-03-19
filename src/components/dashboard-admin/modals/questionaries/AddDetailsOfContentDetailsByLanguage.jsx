"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useDetailsOfContentDetailsByLanguage, useContentDetailsByLanguage,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState ,useEffect} from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "../../../ui-custom/CustomSelect";
import { BASE_URL, config, postMap, putMap, getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import Image from "next/image";


export default function AddDetailsOfContentDetailsByLanguage({ rowData, useForEdit }) {
  //

  console.log("rowdata", rowData)
  const { toast } = useToast();

const contentDetailsByLanguageData = useContentDetailsByLanguage((state) => state.data);
const setContentDetailsByLanguageData = useContentDetailsByLanguage( (state) => state.setContentDetailsByLanguage);
  // const addEdit = useContentDetails((state) => state.addEdit);
  const afterAdd = useDetailsOfContentDetailsByLanguage((state) => state.afterAdd);
  const afterUpdate = useDetailsOfContentDetailsByLanguage((state) => state.afterUpdate);
  const [title, setTitle] = useState(useForEdit ? rowData.title : "");
  const [audio, setAudio] = useState(useForEdit ? rowData.audio : "");
 
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });
  const initStateSelection = {
    id: null,
    title: "",
  };
  const [selectedContentDetailsByLanguage, setSelectedContentDetailsByLanguage] = useState(
    useForEdit
      ? {
        id:rowData.content_details_by_language.id,
        title:rowData.content_details_by_language.title,
      }
      : initStateSelection
  );

  // const [selectedLanguage, setSelectedLanguage] = useState(
  //   useForEdit
  //     ? {
  //       id:rowData.language.id,
  //       title:rowData.language.title,
  //     }
  //     : initStateSelection
  // );
  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );





useEffect(() => {
  const fetchContentDetailsByLanguage = async () => {
    const response = await getHandler("content-details-by-language");
   
    if (response.status === 200) {
      const dataRenderable = response.data.data.map((item) => {
        return {
          id: item.id,
          title: item.attributes.title,
        };
      });
      setContentDetailsByLanguageData(dataRenderable);
    
    }
  };
 
  if (Array.isArray(contentDetailsByLanguageData) && contentDetailsByLanguageData.length === 0) {
    fetchContentDetailsByLanguage();
  }
}, [contentDetailsByLanguageData]);

  async function handleSubmit(e) {
    e.preventDefault();
    
      let formData = new FormData();
      var detailsOfContentDetailsByLanguageTitleInput = document.getElementById("idDetailsOfContentDetailsByLanguageTitleInput");
      var audioInput = document.getElementById("idInputAudio");
      var fileInput = document.getElementById("idInputFile");

      var file = fileInput.files[0];
      formData.append("files.image", file);

      formData.append(
        "data",
        `{"title":"${detailsOfContentDetailsByLanguageTitleInput.value}",
          "audio":  "${audioInput.value}" ,
        "content_details_by_language": { "connect": [${selectedContentDetailsByLanguage.id}] } }`
      );

    
       console.log("formdata", formData)
      await fetch(
        useForEdit
          ? putMap["details-of-content-details-by-language"] + `/${rowData.id}?populate=*`
          : postMap[ "details-of-content-details-by-language"]+`?populate=*`,
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
        
          ////alert(JSON.stringify(data));
          console.log("data1", data)
          let renderable = {
            id: data.data.id,
            title: data.data.attributes?.title,
            content_details_by_language: {
              id:  data.data.attributes?.content_details_by_language?.data?.id,
              title:data.data.attributes?.content_details_by_language?.data?.attributes?.title,
             },
            audio: data.data.attributes?.audio,
            icon: data.data.attributes.image?.data?.attributes?.url,
          };
          console.log("data.data.attributes?.content_details_by_language?",  data.data.attributes?.content_details_by_language)
       
      console.log("rendarable", renderable)
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
          <div className="flex flex-col ">
            <label>Details Of Content Detail by Language Title</label>
            <CustomInput
              id="idDetailsOfContentDetailsByLanguageTitleInput"
              type="text"
              value={title}
              onChange={(e) =>setTitle(e.target.value)}
              ph="Enter Title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div>

          <div className="flex flex-col gap-1">
            <CustomSelect
              id="idSelectedContentDetailsByLanguage"
              label={"Content Details Languages"}
              value={selectedContentDetailsByLanguage}
              options={contentDetailsByLanguageData}
              bg="wh"
              onChange={(value) =>
                setSelectedContentDetailsByLanguage({ id: value.id, title: value.title })
              }
            />
            <span className="text-red-700">{error.err1}</span>
          </div>
          <div className="flex flex-col ">
            <label>Audio </label>
            <CustomInput
              id="idInputAudio"
              type="text"
              value={audio}
              onChange={(e) => setAudio(e.target.value)}
              ph="Enter Audio Text"
              style="py-0.25 px-1"
            />
           
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
