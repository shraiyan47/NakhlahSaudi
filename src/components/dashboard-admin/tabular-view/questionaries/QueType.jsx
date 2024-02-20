"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import { useLoadingState, useQueType } from "../../../../store/useAdminStore";
import columnQueType from "../../table/ColQueType";
import { getHandler,getWithUrl} from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableQueType } from "@/lib/fetchFunctions";

const QueType = () => {
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);


  // console.log("helooooo fr5om quetype")
  // useEffect(() => {
  //   console.log("helooooo fr5om quetype")
  //   const fetch = async () => {
  //     console.log("helooooo fr5om fetch")
  //     const response = await getWithUrl(`api/question-types`);
  //     console.log("quest content type", response.data);
  //     if (response.status === 200) {
  //       setQueTypes(renderableQueType(response.data.data));
  //       toggleLoading(false);
  //     }
  //   };
  //   if (
  //     loading == false &&
  //     Array.isArray(queTypeData) &&
  //     queTypeData.length === 0
  //   ) {
  //     toggleLoading(true);
  //     fetch();
  //   }
  // }, []);





  // useEffect(() => {

  //   const fetch = async () => {
  //     // const response = await getHandler("QuestionsTitleFull");
  //     const response = await getHandler("question-type");
  //   //  console.log("Questions Title =------------->>>>> ", response.data)
  //     if (response.status === 200) {
  //       setQueTypes(renderableQueType(response.data.data));
  //       toggleLoading(false);
  //     }
  //   };
    
  //   fetch();
   
  // }, []);


  useEffect(() => {
    const fetch = async () => { 
      const response = await getHandler("question-type");
      if (response.status === 200) {
        setQueTypes(renderableQueType(response.data.data));
        toggleLoading(false);
      }
    };

    if (
      loading == false &&
      Array.isArray(queTypeData) &&
     queTypeData.length === 0
    ) {
      toggleLoading(true);
      fetch();
    }
    fetch();
  }, []);



  return (
    <div className="w-full h-full bg-white  rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={queTypeData}
          columns={columnQueType}
          view={"question-type"}
        />
      )}
    </div>
  );
};

export default QueType;
