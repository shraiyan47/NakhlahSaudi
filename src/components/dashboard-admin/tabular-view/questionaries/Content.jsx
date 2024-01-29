"use client";
import DataTable from "../../table/DataTable";
import ColContent from "../../table/ColContent";
import {
  useContent,
  useLoadingState,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, putHandler } from "@/lib/requestHandler";
import { renderableContents } from "@/lib/fetchFunctions";

const requestKeyMap = {
  "Sentence Making": "content-sm",
  "Pair Matching": "content-pm",
  "True Or False": "content-tof",
  MCQ: "content-mcq",
  "Fill In The Blank": "content-fitb",
};

const Content = () => {
  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);
  const currentSubView = useTabularView((state) => state.data.currentSubView);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler(requestKeyMap[currentSubView]);
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
        toggleLoading(false);
      }
    };
    if (loading == false) {
      toggleLoading(true);
      fetch();
    }
  }, [currentSubView]);

  return (
    <div className="w-full bg-white rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable data={contents} columns={ColContent} view="content" />
      )}
    </div>
  );
};

export default Content;
