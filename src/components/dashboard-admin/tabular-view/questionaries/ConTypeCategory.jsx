"use client";
import DataTable from "../../table/DataTable";
import {
  useConTypeCategory,
  useLoadingState,
} from "../../../../store/useAdminStore";
import { useEffect } from "react";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import ColContentCategory from "../../table/ColContentCategory";
import { renderableContTypeCategories } from "@/lib/fetchFunctions";

export default function ConTypeCategory() {
  const conTypeCatagories = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

//   useEffect(() => {

// console.log("beboooooooo")
//   }, [])


  // useEffect(() => {
    
  //   const fetch = async () => {
     
  //     const response = await getHandler("content-type-category");
   
  //     if (response.status === 200) {
  //       console.log("beboooooooo  empty", response)
  //       setConTypeCategories(renderableContTypeCategories(response.data.data));
  //       toggleLoading(false);
  //     }

  //   };
  //   if (
  //    loading == false &&
  //     Array.isArray(conTypeCatagories) &&
  //     conTypeCatagories.length === 0
  //   ) {
  //     toggleLoading(true);
  //     fetch();
  //   }
  // }, [conTypeCatagories, loading, setConTypeCategories, toggleLoading]);

  // useEffect(() => {
    
  
  //   const fetch = async () => {
  //     console.log("beboooooooo no empty", conTypeCatagories)
  //     const response = await getHandler("content-type-category");
  //     console.log("response", response)
  //     if (response.status === 200) {
  //       setConTypeCategories(renderableContTypeCategories(response.data.data));
  //       toggleLoading(false);
  //     }
  //   };
  //   if (
  //     loading == false &&
  //     Array.isArray(conTypeCatagories) &&
  //     conTypeCatagories.length === 0
  //   ) {
  //     toggleLoading(true);
  //     fetch();
  //   }
  // }, []);


  useEffect(() => {

    const fetch = async () => {
      // const response = await getHandler("QuestionsTitleFull");
      const response = await getHandler("content-type-category")
      console.log("Questions Title =------------->>>>> ", response.data)
      if (response.status === 200) {
        setConTypeCategories(renderableContTypeCategories(response.data.data));
        toggleLoading(false);
      }
    };
    
    fetch();
   
  }, []);


  return (
    
    <div className="w-full bg-white  rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={conTypeCatagories}
          columns={ColContentCategory}
          view={"content-type-category"}
        />
      )}
    </div>
  );
}
