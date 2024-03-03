"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
    useLanguage,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState ,useEffect} from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "../../../ui-custom/CustomSelect";
import { BASE_URL, config, postMap, putMap, getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import Image from "next/image";


export default function AddLanguage({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const languageData = useLanguage((state) => state.data);
const setLanguageData = useLanguage( (state) => state.setLanguage );
//   const addEdit = useContentDetails((state) => state.addEdit);
  const afterAdd = useLanguage((state) => state.afterAdd);
  const afterUpdate = useLanguage((state) => state.afterUpdate);
  const [languageTitle, setLanguageTitle] = useState(useForEdit ? rowData.title : "");
  const [country, setCountry] = useState(useForEdit ? rowData.country : "");
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });
  const initStateSelection = {
    id: null,
    title: "",
  };
//   const [selectedContent, setSelectedContent] = useState(
//     useForEdit
//       ? {
//         id:rowData.id,
//         title:rowData.title,
//         country:rowData.country
//       }
//       : initStateSelection
//   );
//   const [image, setImage] = useState(
//     useForEdit ? BASE_URL + rowData.icon : null
//   );
console.log("rowData", rowData)

useEffect(() => {
  const fetchLanguage = async () => {
    const response = await getHandler("language");
    if (response.status === 200) {
      const dataRenderable = response.data.data.map((item) => {
        return {
          id: item.id,
          title: item.attributes.name,
          title: item.attributes.country,
        };
      });
      setLanguageData(dataRenderable);
      console.log("dhuru", dataRenderable)
    }
  };
  
  if (Array.isArray(languageData) && languageData.length === 0) {
    fetchLanguage();
  }
}, [languageData]);



  async function handleSubmit(e) {
    e.preventDefault();
    if (languageData.length < 3) {
      setError({ ...error, err0: "Too Short" });
    } 
     else {
      let formData = new FormData();
      var languageTitleInput = document.getElementById("idInputLanguageTitle");
      var countryInput = document.getElementById("idInputCountryInput");
    //  var fileInput = document.getElementById("idInputFile");

    //   var file = fileInput.files[0];
    //   formData.append("files.image", file);

      formData.append(
        "data",
        `{"name":"${languageTitleInput.value}", "country": "${countryInput.value}"}`
      );

     

      await fetch(
        useForEdit
          ? putMap["language"] + `/${rowData.id}?populate=*`
          : postMap["language"]+ `?populate=*`,
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
          console.log("res", data)
          alert(JSON.stringify(data));
          let renderable = {
            id: data.data.id,
            title: data.data.attributes?.name,
            country: data.data.attributes?.country
           
          };
           console.log("renderable", renderable, data.data)
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
            <label>Language</label>
            <CustomInput
              id="idInputLanguageTitle"
              type="text"
              value={languageTitle}
              onChange={(e) => setLanguageTitle(e.target.value)}
              ph="Enter Language. Ex. Arabic"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div>

       

          <div className="flex flex-col ">
            <label>Country</label>
            <CustomInput
              id="idInputCountryInput"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              ph="Enter Country"
              style="py-0.25 px-1"
            />
           
            {/* <ReactSpeechKit /> */}
            <span className="text-red-700">{error.err1}</span>
          </div>
          {/* <div className="flex gap-2 flex-col items-start">
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
          </div> */}
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
