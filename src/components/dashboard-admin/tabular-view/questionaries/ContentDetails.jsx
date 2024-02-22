"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
  useContentDetails,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColContentDetails from "../../table/ColContentDetails";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableContentDetails } from "@/lib/fetchFunctions";
export default function ContentDetails() {

 
    const ContentFiles = useContentDetails((state) => state.data);
    const setContentFiles = useContentDetails((state) => state.setContents);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
    console.log("ContentFiles ", ContentFiles)

  
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getHandler("content-details")
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
          console.log("response", response, response.data.data.data)
             setContentFiles(renderableContentDetails(response.data?.data));
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
            data={ContentFiles}
            columns={ColContentDetails}
            view={"content-details"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }