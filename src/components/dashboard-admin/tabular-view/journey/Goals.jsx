"use client";
import { useEffect, useState } from "react";
import goalColumns from "../../table/ColGoal";
import DataTable from "../../table/DataTable";
import {
  useLearnerGoal,
  useLoadingState,
} from "../../../../store/useAdminStore";
import { getHandler } from "../../../../lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableGoals } from "@/lib/fetchFunctions";

export default function Goals() {
  //
  const learnerGoals = useLearnerGoal((state) => state.data);
  const setGoals = useLearnerGoal((state) => state.setGoals);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-goal");
      if (response.status === 200) {
        setGoals(renderableGoals(response.data.data));
        toggleLoading(false);
      }
    };
    if (Array.isArray(learnerGoals) && learnerGoals.length === 0) {
      toggleLoading(true);
      fetch();
    }
  }, []);

  return (
    <div className="w-full bg-white  rounded-xl">
      {loading ? <CustomSkeleton /> : <span>disabled for a while</span>}
    </div>
  );
}
