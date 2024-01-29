"use client";
import React, { useEffect, useState } from "react";
import DataTable from "../../table/DataTable";
import ColLearnerLevel from "../../table/ColLearnerLevel";
import {
  useLearnerLevel,
  useLoadingState,
} from "../../../../store/useAdminStore";

import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableLearnerLevel } from "@/lib/fetchFunctions";

const LearnerLevel = () => {
  const learnerLevels = useLearnerLevel((state) => state.data);
  const setLearnerLevels = useLearnerLevel((state) => state.setLevels);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learner-level");
      if (response.status === 200) {
        setLearnerLevels(renderableLearnerLevel(response.data.data));
        toggleLoading(false);
      }
    };
    if (
      loading == false &&
      Array.isArray(learnerLevels) &&
      learnerLevels.length === 0
    ) {
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
          data={learnerLevels}
          columns={ColLearnerLevel}
          view={"learner-level"}
        />
      )}
    </div>
  );
};

export default LearnerLevel;
