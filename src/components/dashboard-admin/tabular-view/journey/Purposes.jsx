"use client";
import DataTable from "../../table/DataTable";
import { LearningPurposeGetAllItem_URL } from "../../../../lib/url";
import { useEffect, useState } from "react";
import {
  useLearnerPurpose,
  useLoadingState,
} from "../../../../store/useAdminStore";
import { getHandler } from "../../../../lib/requestHandler";
import columnPurpose from "../../table/ColPurpose";
import { Skeleton } from "@/components/ui/skeleton";
import { renderableGoals, renderablePurpose } from "@/lib/fetchFunctions";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";

export default function Purposes() {
  const purposes = useLearnerPurpose((state) => state.data);
  const setPurposes = useLearnerPurpose((state) => state.setPurposes);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-purpose");
      if (response.status === 200) {
        setPurposes(renderablePurpose(response.data.data));
        toggleLoading(false);
      }
    };
    if (loading == false && Array.isArray(purposes) && purposes.length === 0) {
      toggleLoading(true);
      fetch();
    }
  }, []);

  return (
    <div className="w-full  bg-white  rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={purposes}
          columns={columnPurpose}
          view={"learner-purpose"}
        />
      )}
    </div>
  );
}
