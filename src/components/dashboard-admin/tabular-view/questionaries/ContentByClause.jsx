"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
     useContentByClause,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColContentDetails from "../../table/ColContentDetails";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import {renderableContentByClause} from "@/lib/fetchFunctions";
import ColContentByClause from "../../table/ColContentByClause";

export default function ContentsByClause() {

 
    const contentByClause = useContentByClause((state) => state.data);
    const setContentByClause = useContentByClause((state) => state.setContentByClause);
  
    const loading = useLoadingState((state) => state.loading);
    const toggleLoading = useLoadingState((state) => state.toggleLoading);
  

  console.log("contentByClause111", contentByClause)
    useEffect(() => {
  
      const fetch = async () => {
        // const response = await getHandler("QuestionsTitleFull");
        const response = await getHandler("content-by-clause")
        //console.log("Questions Title =------------->>>>> ", response.data)
        if (response.status === 200) {
          console.log("response", response, response.data.data.data)
          setContentByClause(renderableContentByClause(response.data?.data));
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
            data={contentByClause}
            columns={ColContentByClause}
            view={"content-by-clause"}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }