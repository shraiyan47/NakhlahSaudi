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
  useContentDetails,
  useLanguage
  
} from "../../../../store/useAdminStore";
import CustomSelect from "../../../ui-custom/CustomSelect";
import CustomButton from "../../../ui-custom/CustomButton";
import RVVoiceGen from "@/app/voiceGen";
import { BASE_URL, config, postMap, putMap, getHandler, postHandler, putHandler, getWithUrl } from "@/lib/requestHandler";
import { boolean } from "zod";
import AddContentDetail from "./AddContentDetails";

export default function AddContent({ rowData, useForEdit }) {
  //
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };
  const languageData = useLanguage((state) => state.data);
  const setLanguageData = useLanguage((state) => state.setLanguage);
  console.log(" rowData, useForEdit", rowData, useForEdit)
  const [content, setContent] = useState(useForEdit ? rowData.title : "");

  const [audio, setAudio] = useState("");
  const [contentDetailsData, setContentDetailsData] = useState("");
  const [language, setLanguage] = useState("");
    const [queAudio, setQueAudio] = useState(useForEdit ?audio : "");
  const [details, setDetails] = useState(useForEdit ? true: false);
  const[contentDetailsId, setContentDetailsId] =useState("");
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
  const setConDetails = useContentDetails((state) => state. setContents);

  const detailsData = useContentDetails((state) => state.data);
  //
  const afterUpdate = useContent((state) => state.afterUpdate);
  const afterAdd = useContent((state) => state.afterAdd);
  const afterUpdate1 = useContentDetails((state) => state.afterUpdate);
  const afterAdd1 = useContentDetails((state) => state.afterAdd);
  const [add, setAdd] = useState(false);
  const [new1, setNew1] = useState(false);
  // const contentId = rowData.id
  // const [image, setImage] = useState(
  //   useForEdit ? BASE_URL + rowData.icon : null
  // );
  const [pic, setPic] = useState("");
  const [image, setImage] = useState(BASE_URL+"");
  // const [selectedLanguage, setSelectedLanguage] = useState(
  //   useForEdit
  //     ? {
  //       id: rowData.language.id,
  //       title: rowData.language.title,
  //     }
  //     : initStateSelection
  // );
console.log("rowdata", rowData)
  function handleAddDetails() {
   setAdd(true)
  }

console.log("queAUDIO", queAudio)
  // before
  async function handleSubmit(e) {
    e.preventDefault();
  
    let formData = new FormData();
    let formDataDetails = new FormData();
    var categoryInput = document.getElementById("idSelectedCategory");
    var questionTypeInput = document.getElementById("idQuestionType");
    var contentInput = document.getElementById("idContent");
    var contentDetailsAudioInput= document.getElementById("idAudioText");
   console.log("contentDetailsAudioInput", contentDetailsAudioInput)
    if (
      selectedCategory.title != "" &&
      selectedType.title != "" &&
      !(content.length < 3)
    ) {
      
  
      formData.append(
        "data",
        `{"title": "${contentInput.value}","content_type": { "connect": [${selectedType.id}] },"content_type_category": { "connect": [${selectedCategory.id}] }}`
      );

      await fetch(
        useForEdit
          ? putMap["content-all"] + `/${rowData.id}?populate=*`
          : postMap["content-all"]+`?populate=*`,
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
      
      //  ////alert(JSON.stringify(data));
        let renderable = {
          id: data.data.id,
          audio: data.data.attributes?.audio,
          title: data.data.attributes?.title,
          content_type: {
            id:  data.data.attributes?.content_type?.data?.id,
            title:data.data.attributes?.content_type?.data?.attributes?.title,
          },
          content_type_category: {
            id: data.data.attributes?.content_type_category?.data?.id,
            title: data.data.attributes?.content_type_category?.data?.attributes?.title,
          },
          icon: data.data.attributes.image?.data?.attributes?.url,
        };


        let contentId = data.data.id;

        var fileInput = document.getElementById("idInputFile");
        var file = fileInput.files[0];
        console.log("formDataDetails",  formDataDetails)
        formDataDetails.append("files.image", file);
    
        formDataDetails.append(
          "data",
          `{"audio": "${contentDetailsAudioInput.value}", "content": { "connect": [${contentId}] }}`
        );
        


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



    
      
      // content details
      await fetch(
        useForEdit
          ? putMap["content-details"] + `/${contentDetailsId}?populate=*`
          : postMap["content-details"] + `?populate=*`,
        {
          method: useForEdit ? "PUT" : "POST",
          body: formDataDetails,
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
          ////alert(JSON.stringify(data));
          let renderable1 = {
         
            contentAudio: data.data.attributes?.audio,
            icon: data.data.attributes.image?.data?.attributes?.url,
          };
          useForEdit ? afterUpdate1(renderable1) : afterAdd1(renderable1);
      
      
        });
      
      
      


    }
  }
//   async function handleSubmit(e) {
//     e.preventDefault();
  
//     let formData = new FormData();
//     let formDataDetails = new FormData();
//     var categoryInput = document.getElementById("idSelectedCategory");
//     var questionTypeInput = document.getElementById("idQuestionType");
//     var contentInput = document.getElementById("idContent");
//    console.log("contentDetailsAudioInput", contentDetailsAudioInput)
//     if (
//       selectedCategory.title != "" &&
//       selectedType.title != "" &&
//       !(content.length < 3)
//     ) {
      
  
//       formData.append(
//         "data",
//         `{"title": "${contentInput.value}","content_type": { "connect": [${selectedType.id}] },"content_type_category": { "connect": [${selectedCategory.id}] }}`
//       );

//       await fetch(
//         useForEdit
//           ? putMap["content-all"] + `/${rowData.id}?populate=*`
//           : postMap["content-all"]+`?populate=*`,
//         {
//           method: useForEdit ? "PUT" : "POST",
//           body: formData,
//           headers: {
//             Authorization:
//               "Bearer " +
//               "5cb5acf4b96532cdad0e30d900772f5c8b5532d2dbf06e04483a3705c725ffbbdba593340718423a5975e86aa47ca1749de402ec9f3127648dbcec37b190107ba975e669811b2a2f4c8b41c27472d6fdb70e7b0be4f8490c57a406e29aedf47dd05dadb7171788ba9fa2af106d93b4f92423b8e194131891e712857b52e8ceef",
//           },
//           redirect: "follow",
//         }
//       )
        
//       .then((res) => res.json())
//       .then((data) => {
      
//       //  ////alert(JSON.stringify(data));
//         let renderable = {
//           id: data.data.id,
//           audio: data.data.attributes?.audio,
//           title: data.data.attributes?.title,
//           content_type: {
//             id:  data.data.attributes?.content_type?.data?.id,
//             title:data.data.attributes?.content_type?.data?.attributes?.title,
//           },
//           content_type_category: {
//             id: data.data.attributes?.content_type_category?.data?.id,
//             title: data.data.attributes?.content_type_category?.data?.attributes?.title,
//           },
//           icon: data.data.attributes.image?.data?.attributes?.url,
//         };


//         let contentId = data.data.id;
// console.log(" contentId ",  contentId ,rowData.id)
       
        


//         useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
       
//         // toast({
//         //   title: useForEdit ? "Successfully Updated" : "Successfully Added",
//         // });
//       //  document.getElementById("closeDialog")?.click();
//       }) 
//       .catch((error) => {
     
//         //alert("err: " + JSON.stringify(error));
//         setError(JSON.stringify(error));
//       });

     
//       var contentDetailsAudioInput= document.getElementById("idAudioText");
//       var fileInput = document.getElementById("idInputFile");
//       var file = fileInput.files[0];
//       console.log("formDataDetails",  formDataDetails)
//       formDataDetails.append("files.image", file);
  
//       formDataDetails.append(
//         "data",
//         `{"audio": "${contentDetailsAudioInput.value}", "content": { "connect": [${rowData.id}] }}`
//       );
//       console.log("formDataDetails1", formDataDetails)
      
//       // content details
//       await fetch(
//         useForEdit
//           ? putMap["content-details"] + `/${contentDetailsId}?populate=*`
//           : postMap["content-details"] + `?populate=*`,
//         {
//           method: useForEdit ? "PUT" : "POST",
//           body: formDataDetails,
//           headers: {
//             Authorization:
//               "Bearer " +
//               "5cb5acf4b96532cdad0e30d900772f5c8b5532d2dbf06e04483a3705c725ffbbdba593340718423a5975e86aa47ca1749de402ec9f3127648dbcec37b190107ba975e669811b2a2f4c8b41c27472d6fdb70e7b0be4f8490c57a406e29aedf47dd05dadb7171788ba9fa2af106d93b4f92423b8e194131891e712857b52e8ceef",
//           },
//           redirect: "follow",
//         }
        
//       )
//       // console.log("formDataDetails", formDataDetails)
//         .then((res) => res.json())
        
//         .then((data) => {
//           console.log("res of content details", data)
//           ////alert(JSON.stringify(data));
//           let renderable1 = {
         
//             contentAudio: data.data?.attributes?.audio,
//             icon: data.data?.attributes?.image?.data?.attributes?.url,
//           };
//           useForEdit ? afterUpdate1(renderable1) : afterAdd1(renderable1);
         
//         toast({
//           title: useForEdit ? "Successfully Updated" : "Successfully Added",
//         });
//        document.getElementById("closeDialog")?.click();
   
      
//         })
//         .catch((error) => {
     
//           //alert("err: " + JSON.stringify(error));
//           setError(JSON.stringify(error));
//         });
      
      
      


//     }
//   }


  
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





  useEffect(() => {

    const fetchTypes = async () => {
      const response = await getWithUrl(`api/content-details?populate=*&filters[content][id][$eq]=${rowData.id}`);
console.log("response.data.data", response.data.data)
      if (response.status === 200) {
        const dataRenderable = response.data.data.map((item) => {
        
          return {
            id: item.id,
           audio: item?.attributes?.audio,
          icon: item?.attributes?.image?.data?.attributes?.url,
          language : item?.attributes?.language?.data?.attributes?.name,
          };
        });
        console.log("dataRenderable", dataRenderable)
        setContentDetailsData(dataRenderable[0])
        setContentDetailsId(dataRenderable[0]?.id);
        setConDetails(dataRenderable);
        setAudio(dataRenderable[0]?.audio)
        setImage(dataRenderable[0]?.icon)
        setLanguage(dataRenderable[0]?.language)
      }
    };

    // if (Array.isArray(typeData) && typeData.length === 0) {
      details &&   fetchTypes();
    //}
  }, []);

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

console.log("ContentDetailsData)",  contentDetailsData)

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



          {useForEdit ?    <button
            type="button"
             onClick={handleAddDetails}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-sm"
          >
          
          
           + Update Content Details


          </button> 
          :
          
            <button
            type="button"
             onClick={handleAddDetails}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-sm"
          >
          
          
           + Add Content Details


          </button> 
}
       
      
       {add && (
     
            <div>
              <div className="flex flex-col gap-1">
                <CustomSelect
                  id="idSelectedlanguage"
                  label={"Languages"}
                  value={language}
                  options={languageData}
                  bg="wh"
                  onChange={(value) =>
                    setSelectedLanguage({ id: value.id, title: value.title })
                  }
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
                      setNew1(true)
                    };
                    reader.readAsDataURL(files[0]);
                  }}
                />
                {image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="image"
                 src={ new1 ?  image : BASE_URL+image }
                
                    className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
                  />
                 ) 
             
              //  image  && add=== "true"(
              //     // eslint-disable-next-line @next/next/no-img-element
              //     <img
              //       alt="image"
              //       src={BASE_URL+image}
              //       className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
              //     />

              // )
              }

              </div>
              <div className="flex flex-col gap-1 w-2/3 ">
                <span className="">Attach Audio Text</span>
                <textarea
                  id="idAudioText"
                  value={audio}
                  onChange={(e) => setAudio(e.target.value)}
                  rows={2}
                  className="py-0.12 px-1 rounded-md border border-slate-400 outline-none"
                />
                 {
              (!!audio && audio !== null) &&
              <RVVoiceGen contentDetailsAudio={audio} />
             
            }
              </div>
            </div>
       )}

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
