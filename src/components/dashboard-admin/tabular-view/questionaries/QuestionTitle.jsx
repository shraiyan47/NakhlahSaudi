"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
  useQuestionTitle,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColQuestionTitle from "../../table/ColQuestionTitle";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableQuestionTitle } from "@/lib/fetchFunctions";

export default function QuestionTitle() {
  //
  const QuestionTitle = useQuestionTitle((state) => state.data);
  const setQuestionTitle = useQuestionTitle((state) => state.setQuestionTitle);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {

    const fetch = async () => {
      const response = await getHandler("QuestionsTitleFull");
      console.log("Questions Title =------------->>>>> ", response.data.data)
      if (response.status === 200) {
        setQuestionTitle(renderableQuestionTitle(response.data.data));
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
          data={QuestionTitle}
          columns={ColQuestionTitle}
          view={"learner-start-point"}
        />
      )}
    </div>
  );
}
