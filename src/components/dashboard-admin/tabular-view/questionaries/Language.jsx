"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
    useLanguage,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColContentDetails from "../../table/ColContentDetails";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import {renderableLanguage } from "@/lib/fetchFunctions";
import ColLanguage from "../../table/ColLanguage";
export default function Language() {

 
    const language = useLanguage((state) => state.data);
    const setLanguage = useLanguage((state) => state.setLanguage);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
    console.log("language ", language)

  
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getHandler("language")
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
          console.log("response", response, response.data.data.data)
             setLanguage(renderableLanguage(response.data?.data));
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
      <div className="w-full bg-white  rounded-xl">
        {loading ? (
          <CustomSkeleton />
        ) : (
          <DataTable
            data={language}
            columns={ColLanguage}
            view={"language"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }