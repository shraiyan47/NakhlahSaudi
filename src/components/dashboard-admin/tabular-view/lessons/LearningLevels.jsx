"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import {
  useLearningJourney,
  useLoadingState,
} from "../../../../store/useAdminStore";
import columnJourney from "../../table/ColJourney";
import { Skeleton } from "@/components/ui/skeleton";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableLearningLevels } from "@/lib/fetchFunctions";

export default function LearningLevels() {


  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies); 

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-journey");
      if (response.status === 200) {
        setJournies(renderableLearningLevels(response.data.data));
      }
    };
    if (Array.isArray(journeyData) && journeyData.length === 0) {
      fetch();
    }
  }, [journeyData]);

  return (
    <div className="w-full bg-white  rounded-xl   ">
      {journeyData.length != 0 ? (
        <DataTable
          data={journeyData}
          columns={columnJourney}
          view={"learning-journey"}
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
