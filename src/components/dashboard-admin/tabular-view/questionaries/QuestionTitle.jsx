"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
  useQuestionTitle,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColQuestionTitle from "../../table/ColQuestionTitle";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableQuestionTitle } from "@/lib/fetchFunctions";

export default function QuestionTitle() {

 
  const QuestionTitle = useQuestionTitle((state) => state.data);
  const setQuestionTitle = useQuestionTitle((state) => state.setQuestionTitle);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);
  console.log("Question Title ", QuestionTitle)

  // const [pagination, setPagination] = useState({
  //   pageIndex: 1,
  //   pageSize: 10,
  // });

  // const handlePageChange = (newPageIndex) => {
  //   setPagination((oldPagination) => ({
  //     ...oldPagination,
  //     pageIndex: newPageIndex,
  //   }));
  // };

  // console.log("Pagination ____> ", pagination)

  useEffect(() => {

    const fetch = async () => {
      // const response = await getHandler("QuestionsTitleFull");
      const response = await getWithUrl("api/questions?pagination[page]="+1+"&pagination[pageSize]="+999999+"&populate=*");
      console.log("Questions Title =------------->>>>> ", response.data)
      if (response.status === 200) {
        setQuestionTitle(renderableQuestionTitle(response.data));
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
          view={"questionTitle"}
          // pagination={pagination}
          // onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
