"use client";
import DataTable from "../../table/DataTable";
import ColContent from "../../table/ColContent";
import {
  useContent,
  useLoadingState,
  useTabularView,
  useConType
} from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, putHandler,getWithUrl } from "@/lib/requestHandler";
import { renderableContents } from "@/lib/fetchFunctions";
const requestKeyMap = {
  "all-content": "content-all",
  "Sentence Making": "content-sm",
  "Pair Matching": "content-pm",
  "True Or False": "content-tof",
 "MCQ": "content-mcq",
  "Fill In The Blank": "content-fitb",
};

export default function TOFcontent() {
  const contents = useContent((state) => state.data);
  const conType = useConType((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  


  console.log("conType", conType, contents)
  useEffect(() => {
    const fetchQuestions = async () => {
      let url ="api/contents?populate=*&filters[content_type][id][$eq]=2"
     
      const response = await getWithUrl(url);
      
      if (response) {
        toggleLoading(false);
      }
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
      }
    };
    if (loading == false) {
      toggleLoading(true);
      fetchQuestions();
    }
  }, []);
  

  return (
    <div className="w-full bg-white rounded-xl">
    {loading ? (
      <CustomSkeleton />
    ) : (
      <DataTable data={contents} columns={ColContent} view="content" />
    )}
  </div>
  );
}
