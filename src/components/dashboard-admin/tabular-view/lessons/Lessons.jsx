"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import columnLesson from "../../table/ColLesson";
import {
  useLearningLesson,
  useLoadingState,
} from "../../../../store/useAdminStore";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";
import { renderableLessons } from "@/lib/fetchFunctions";

export default function Lessons() {
  //
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");
      if (response) {
        toggleLoading(false);
      }
      if (response.status === 200) {
        setLessons(renderableLessons(response.data.data));
      }
    };
    if (
      loading == false &&
      Array.isArray(lessonData) &&
      lessonData.length === 0
    ) {
      toggleLoading(true);
      fetch();
    }
  }, []);

  return (
    <div className=" flex-grow w-full bg-white  rounded-xl   ">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={lessonData}
          columns={columnLesson}
          view={"learning-lesson"}
        />
      )}
    </div>
  );
}
