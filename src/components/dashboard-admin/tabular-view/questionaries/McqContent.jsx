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
import { getHandler, putHandler, getWithUrl } from "@/lib/requestHandler";
import { renderableContents } from "@/lib/fetchFunctions";

export default function McqContent() {
  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  
  
  




  useEffect(() => {
    const fetch = async () => { 
      const response = await getHandler("content-all")
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
        toggleLoading(false);
      }
    };

    if (
      loading == false &&
       Array.isArray(contents) && contents.length === 0
    ) {
      toggleLoading(true);
      fetch();
    }
    fetch();
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
