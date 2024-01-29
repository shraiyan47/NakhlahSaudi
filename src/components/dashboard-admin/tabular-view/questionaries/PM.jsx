"use client";
import DataTable from "../../table/DataTable";
import ColQuestion from "../../table/ColQuestion";
import { useLoadingState, useQuestion } from "../../../../store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler, getWithUrl } from "@/lib/requestHandler";
import { renderableQuetions } from "@/lib/fetchFunctions";

export default function PM (){
   //
   const questionData = useQuestion((state) => state.data);
   const setQuestions = useQuestion((state) => state.setQuestions);
   //
   const selectedJourney = useQuestion((state) => state.selectedJourney);
   const selectedUnit = useQuestion((state) => state.selectedUnit);
   const selectedLevel = useQuestion((state) => state.selectedLevel);
   const selectedLesson = useQuestion((state) => state.selectedLesson);
   //
   const loading = useLoadingState((state) => state.loading);
   const toggleLoading = useLoadingState((state) => state.toggleLoading);
   //
   useEffect(() => {
     const fetchQuestions = async () => {
       let url =
         "api/journey-map-question-contents?populate[question_content][populate]=*&filters[question_content][question_type][title][$eq]=MCQ&populate[learning_journey_lesson][populate][learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey";
       if (selectedJourney.id) {
         url += `&filters[learning_journey_lesson][learning_journey_level][learning_journey_unit][learning_journey][title][$eq]=${selectedJourney.title}`;
       }
       if (selectedUnit.id) {
         url += `&filters[learning_journey_lesson][learning_journey_level][learning_journey_unit][title][$eq]=${selectedUnit.title}`;
       }
       if (selectedLevel.id) {
         url += `&filters[learning_journey_lesson][learning_journey_level][title][$eq]=${selectedLevel.title}`;
       }
       if (selectedLesson.id) {
         url += `&filters[learning_journey_lesson][title][$eq]=${selectedLesson.title}`;
       }
       const response = await getWithUrl(url);
       
       if (response) {
         toggleLoading(false);
       }
       if (response.status === 200) {
         setQuestions(renderableQuetions(response.data.data));
       }
     };
     if (loading == false) {
       toggleLoading(true);
       fetchQuestions();
     }
   }, [selectedJourney, selectedUnit, selectedLevel, selectedLesson]);

  return (
    <div className="w-full bg-white rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={questionData}
          columns={ColQuestion}
          view={"question"}
          filter={"Questions"}
        />
      )}
    </div>
  );
};

 
