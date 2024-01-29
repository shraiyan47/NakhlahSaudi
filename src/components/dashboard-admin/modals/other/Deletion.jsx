
"use client"
import React, { useState } from "react";
import {
  useLearningJourney,
  useLearningUnit,
  useLearningLevel,
  useLearningLesson,
  useQueType,
  useConType,
  useConTypeCategory,
  useLearnerPurpose,
  useLearnerLevel,
  useLearnerStartPoint,
  useLearnerGoal,
  useQuestion,
  useContent,
  useQueContent,
  useQueContOption,
} from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import CustomButton from "../../../ui-custom/CustomButton";
import { deleteHandler } from "@/lib/requestHandler";
import { useToast } from "@/components/ui/use-toast";

export default function Deletion({ rowData, what }) {
  const { toast } = useToast();

  const [error, setError] = useState("");

  const afterDelete = {
    "learner-purpose": useLearnerPurpose((state) => state.afterDelete),
    "learner-goal": useLearnerGoal((state) => state.afterDelete),
    "learner-start-point": useLearnerStartPoint((state) => state.afterDelete),
    "learner-level": useLearnerLevel((state) => state.afterDelete),
    "learning-journey": useLearningJourney((state) => state.afterDelete),
    "learning-unit": useLearningUnit((state) => state.afterDelete),
    "learning-level": useLearningLevel((state) => state.afterDelete),
    "learning-lesson": useLearningLesson((state) => state.afterDelete),
    "question-type": useQueType((state) => state.afterDelete),
    "content-type": useConType((state) => state.afterDelete),
    "content-type-category": useConTypeCategory((state) => state.afterDelete),
    question: useQuestion((state) => state.afterDelete),
    content: useContent((state) => state.afterDelete),
    "question-content": useQueContent((state) => state.afterDelete),
    "question-content-option": useQueContOption((state) => state.afterDelete),
  };

  function onSuccess() {
    document.getElementById("closeDialog")?.click();
    toast({
      title: "Deleted successfully",
    });
  }

  function handleDeletion() {
    deleteHandler({ key: what, id: rowData.id })
      .then((response) => {
        afterDelete[what](rowData.id);
        onSuccess();
      })
      .catch((err) => {
        setError("Error in deleion");
      });
  }

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <p className="text-center flex flex-col gap-1">
        <span>
          You are deleting the
          <span className="capitalize ms-2">{what}:</span>
        </span>
        <span className="text-lg underline font-semibold ">
          {rowData.title}
        </span>
      </p>

      <div className="flex flex-col gap-1 w-full">
        <p className="text-center text-base  text-orange-900  ">
          Confirm To Delete ?
        </p>
        <CustomButton
          click={handleDeletion}
          txt="Delete"
          style={
            "px-3 py-0.25 text-center text-base font-bold text-orange-800 drop-shadow-sm border border-slate-400 w-full"
          }
        />
        <p className="text-red-600 font-semibold text-center">{error}</p>
      </div>
    </div>
  );
}
