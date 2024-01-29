import CustomSelect from "@/components/ui-custom/CustomSelect";
import {
  renderableLearningLevels,
  renderableLessons,
  renderableTaskUnits,
  renderableTasks,
} from "@/lib/fetchFunctions";
import { getHandler } from "@/lib/requestHandler";
import {
  useLearningJourney,
  useLearningLesson,
  useLearningLevel,
  useLearningUnit,
} from "@/store/useAdminStore";
import React, { useEffect, useState } from "react";

export default function QueFilter() {


  //
  return (
    <div className="flex gap-1 items-center max-h-[28px]">
      <CustomSelect
        value={selectedJourney}
        ph={"Select Level"}
        options={journeyData}
        bg="wh"
        onChange={(value) =>
          setSelectedJourney({ id: value.id, title: value.title })
        }
      />

      <CustomSelect
        value={selectedUnit}
        options={filteredUnits}
        bg="wh"
        ph={"Select Task"}
        onChange={(value) =>
          setSelectedUnit({ id: value.id, title: value.title })
        }
      />
      <CustomSelect
        ph={"Select Task Unit"}
        value={selectedLevel}
        options={filteredLevels}
        bg="wh"
        onChange={(value) =>
          setSelectedLevel({ id: value.id, title: value.title })
        }
      />
      <CustomSelect
        ph={"Select Lesson"}
        value={selectedLesson}
        options={filteredLessons}
        bg="wh"
        onChange={(value) =>
          setSelectedLesson({ id: value.id, title: value.title })
        }
      />
    </div>
  );
}
