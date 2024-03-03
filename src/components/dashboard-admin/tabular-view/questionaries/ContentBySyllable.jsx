"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
    useContentBySyllable,
  useLoadingState,
} from "../../../../store/useAdminStore";

import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import {renderableContentBySyllable} from "@/lib/fetchFunctions";
import ColContentBySyllable from "../../table/ColContentByClause";

export default function ContentsBySyllable() {

 
    const contentBySyllable = useContentBySyllable((state) => state.data);
    const setContentBySyllable = useContentBySyllable((state) => state.setContentBySyllable);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
  

  console.log("ccontentBySyllable", contentBySyllable)
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getHandler("content-by-syllable")
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
          console.log("response", response, response.data.data.data)
          setContentBySyllable(renderableContentBySyllable(response.data?.data));
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
            data={contentBySyllable}
            columns={ColContentBySyllable}
            view={"content-by-syllable"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }