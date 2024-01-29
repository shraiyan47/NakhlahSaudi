"use client";
import { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import {
  useLearnerStartPoint,
  useLoadingState,
} from "../../../../store/useAdminStore";
import ColStartPoint from "../../table/ColStartPoint";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableStartPoint } from "@/lib/fetchFunctions";

export default function StartPoints() {
  //
  const startPoints = useLearnerStartPoint((state) => state.data);
  const setStartPoints = useLearnerStartPoint((state) => state.setStartPoints);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-start-point");
      if (response.status === 200) {
        setStartPoints(renderableStartPoint(response.data.data));
        toggleLoading(false);
      }
    };
    if (
      loading == false &&
      Array.isArray(startPoints) &&
      startPoints.length === 0
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
          data={startPoints}
          columns={ColStartPoint}
          view={"learner-start-point"}
        />
      )}
    </div>
  );
}
