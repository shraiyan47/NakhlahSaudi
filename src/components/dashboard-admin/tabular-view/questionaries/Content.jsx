"use client";
import DataTable from "../../table/DataTable";
import ColContent from "../../table/ColContent";
import {
  useContent,
  useLoadingState,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, putHandler } from "@/lib/requestHandler";
import { renderableContents } from "@/lib/fetchFunctions";



export default function Content() {
  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  
  
  
  
  

  
  
  
  // useEffect(() => {

  //   const fetch = async () => {
     
  //     const response = await getHandler(requestKeyMap[currentSubView]);

  //     if (response.status === 200) {
  //       setContents(renderableContents(response.data.data));
  //       toggleLoading(false);
  //     }
  //   };
    
  //   if (loading == false && Array.isArray(contents) && contents.length === 0) {
  //     toggleLoading(true);
  //     fetch();
  //   }
  //   fetch();
  // }, [contents, currentSubView]);

 

  useEffect(() => {
  
    const fetch = async () => {
      // const response = await getHandler("QuestionsTitleFull");
     
      const response = await getHandler("content-all")
      //console.log("Questions Title =------------->>>>> ", response.data)
      if (response.status === 200) {

         
           setContents(renderableContents(response.data.data));
        toggleLoading(false);
      }
    };
    // if (
    //   loading == false &&
    //   Array.isArray(QuestionTitle) &&
    //   QuestionTitle.length === 0
    // ) {
    //   toggleLoading(true);
    fetch();
    //   }
  }, []);


  return (
    <div className="w-full bg-white rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable data={contents} columns={ColContent} view="content" />
      )}
    </div>
  );
};


