"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
    useContentDetailsByLanguage, useLanguage, useContent,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColContentDetails from "../../table/ColContentDetails";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import {renderableContentDetailsByLanguage} from "@/lib/fetchFunctions";

import ColContentDetailsByLanguage from "../../table/ColContentDetailsByLanguage";
export default function ContentDetailsByLanguage() {

 
    const contentDetailsByLanguage = useContentDetailsByLanguage((state) => state.data);
    const setContentDetailsByLanguage = useContentDetailsByLanguage((state) => state.setContentDetailsByLanguage);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
  

  console.log("contentDetailsByLanguage", contentDetailsByLanguage)
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getHandler("content-details-by-language")
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
          console.log("response", response, response.data.data.data)
          setContentDetailsByLanguage(renderableContentDetailsByLanguage(response.data?.data));
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
            data={contentDetailsByLanguage}
            columns={ColContentDetailsByLanguage}
            view={"content-details-by-language"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }