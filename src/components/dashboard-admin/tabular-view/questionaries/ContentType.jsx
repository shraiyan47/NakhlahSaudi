"use client";
import DataTable from "../../table/DataTable";

import { useConType, useLoadingState } from "../../../../store/useAdminStore";
import { useEffect } from "react";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import ColoumnContentType from "../../table/ColContType";

import React from "react";
import { renderableContTypes } from "@/lib/fetchFunctions";

export default function ContentType() {
  //
  const conTypeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  //
  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type");
      if (response.status === 200) {
        setConTypes(renderableContTypes(response.data.data));
        toggleLoading(false);
      }
    };
    if (
      loading == false &&
      Array.isArray(conTypeData) &&
      conTypeData.length === 0
    ) {
      toggleLoading(true);
      fetch();
    }
  }, []);

  return (
    <div className="w-full bg-white  rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={conTypeData}
          columns={ColoumnContentType}
          view={"content-type"}
        />
      )}
    </div>
  );
}
