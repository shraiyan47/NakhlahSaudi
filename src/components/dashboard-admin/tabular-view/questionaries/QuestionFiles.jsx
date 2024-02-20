"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
  useQuestionTitle,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColContentFiles from "../../table/ColContentFiles";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableContentFiles } from "@/lib/fetchFunctions";
export default function QuestionFiles() {

 
    const ContentFiles = useQuestionTitle((state) => state.data);
    const setContentFiles = useQuestionTitle((state) => state.setQuestionTitle);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
    console.log("ContentFiles ", ContentFiles)

  
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getWithUrl("api/questions?pagination[page]="+1+"&pagination[pageSize]="+999999+"&populate=*");
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
            setContentFiles(renderableContentFiles(response.data));
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
            columns={ColContentFiles}
            view={"questionTitle"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }