"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import colLearningLevel from "../../table/ColLearningLevel";
import {
  useLearningLevel,
  useLoadingState,
} from "../../../../store/useAdminStore";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableTaskUnits } from "@/lib/fetchFunctions";

export default function TaskUnits() {
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");
      if(response){
        toggleLoading(false);
      }
      if (response.status === 200) {
        setLevels(renderableTaskUnits(response.data.data));
        
      }
    };
    if (
      loading == false &&
      Array.isArray(levelData) &&
      levelData.length === 0
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
          data={levelData}
          columns={colLearningLevel}
          view={"learning-level"}
        />
      )}
    </div>
  );
}
