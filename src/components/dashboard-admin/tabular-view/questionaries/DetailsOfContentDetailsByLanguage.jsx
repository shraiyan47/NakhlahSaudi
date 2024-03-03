"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
    useDetailsOfContentDetailsByLanguage,
  useLoadingState,
} from "../../../../store/useAdminStore";

import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import {renderableDetailsOfContentDetailsByLanguage} from "@/lib/fetchFunctions";
import ColDetailsOfContentDetailsByLanguage from "../../table/ColDetailsOfContentDetailsOfLanguage";


export default function DetailsOfContentDetailsByLanguage() {

 
    const detailsOfContentDetailsByLanguage =  useDetailsOfContentDetailsByLanguage((state) => state.data);
    const setDetailsOfContentDetailsByLanguage =  useDetailsOfContentDetailsByLanguage((state) => state.setDetailsOfContentDetailsByLanguage);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
  

  console.log("contentDetailsByLanguage", detailsOfContentDetailsByLanguage)
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getHandler("details-of-content-details-by-language")
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
          console.log("response", response, response.data.data.data)
          setDetailsOfContentDetailsByLanguage(renderableDetailsOfContentDetailsByLanguage(response.data?.data));
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
            data={detailsOfContentDetailsByLanguage}
            columns={ColDetailsOfContentDetailsByLanguage}
            view={"details-of-content-details-by-language"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }