"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
//
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, Plus } from "lucide-react";
//
import AddGoal from "../modals/journey/AddGoal";
import AddPurpose from "../modals/journey/AddPurpose";
import AddStartingPoint from "../modals/journey/AddStartPoint";
import AddLearnerLevel from "../modals/journey/AddLearnerLevel";
import AddJourney from "../modals/lessons/AddJourney";
import AddTaskUnit from "../modals/lessons/AddTaskUnit";
import AddLevel from "../modals/lessons/AddLevel";
import AddLesson from "../modals/lessons/AddLesson";
import AddQueType from "../modals/questionaries/AddQueType";
import AddContentType from "../modals/questionaries/AddContentType";
import AddConTypeCategory from "../modals/questionaries/AddConTypeCategory";
import AddContent from "../modals/questionaries/AddContent";
import AddQueContent from "../modals/questionaries/AddQueContent";
import AddQueContOption from "../modals/questionaries/AddQueContOption";
import { useTabularView } from "@/store/useAdminStore";
import CustomButton from "@/components/ui-custom/CustomButton";
import QueFilter from "../tabular-view/questionaries/QueFilter";

const viewMap = {
  // learning journey
  "learning-journey": "id_learning_journey",
  "learning-unit": "id_learning_unit",
  "learning-level": "id_learning_level",
  "learning-lesson": "id_learning_lesson",
  // get-start or ?
  "learner-goal": "id_learner_goal",
  "learner-purpose": "id_learner_purpose",
  "learner-start-point": "id_learner_start_point",
  "learner-level": "id_learner_level",
  // questionaries
  "question-type": "id_question_type",
  "content-type": "id_content_type",
  "content-type-category": "id_content_type_category",
  question: "id_question",
  content: "id_content",
  "question-content": "id_question_content",
  "question-content-option": "id_question_content_option",
};

export default function DataTableHeader({ table, view, filter }) {
  const currentView = useTabularView((state) => state.data.currentView);
  const currentSubView = useTabularView((state) => state.data.currentSubView);
  const setTabularView = useTabularView((state) => state.setTabularView);
  const addWhat = currentView.slice(0, currentView.length - 1);

  return (
    <div className="flex items-center justify-between py-3  ">
      {filter && (
        <div className="flex items-center border-b border-slate-300 rounded-none">
          <Filter className="w-5 h-5 text-slate-600 border-0" />

          <Input
            placeholder={`Filter ${currentView}`}
            value={table.getColumn(viewMap[view])?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(viewMap[view])?.setFilterValue(event.target.value)
            }
            className="max-h-[28px] max-w-[350px] min-w-[220px] text-center text-slate-700 px-3 py-1 placeholder:text-slate-500 "
          />
        </div>
      )}
      {currentView == "Questions" ? (
        <CustomButton
          style={
            "flex gap-1 justify-center rounded-sm max-h-[28px] text-sm font-semibold font-sans bg-wh hover:bg-slate-50 hover:shadow-sm hover:drop-shadow-sm border border-slate-300  text-slate-600 py-0.25 px-3"
          }
          click={() =>
            setTabularView({
              currentAct: "add",
            })
          }
          startIcon={<Plus className="w-5 h-5 mx-1" />}
          txt={currentSubView}
        />
      ) : (
        <div className="flex items-center gap-4">
          {/* modal button add new item */}
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="flex gap-1 justify-center rounded-sm max-h-[28px] text-sm font-semibold font-sans bg-wh hover:bg-slate-50 hover:shadow-sm hover:drop-shadow-sm border border-slate-300  text-slate-600 py-0.25 px-3">
                <Plus className="w-5 h-5 mx-1" />
                <span className="">{`${addWhat}`}</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
              {/* <AddNewItem  title={title}  isJourney={false}/> */}
              {view == "learning-journey" && <AddJourney title={view} />}
              {view == "learning-level" && <AddLevel title={view} />}
              {view == "learning-lesson" && <AddLesson title={view} />}
              {view == "learning-unit" && <AddTaskUnit title={view} />}
              {view == "learner-goal" && <AddGoal title={view} />}
              {view == "learner-purpose" && <AddPurpose title={view} />}
              {view == "learner-start-point" && (
                <AddStartingPoint title={view} />
              )}
              {view == "learner-level" && <AddLearnerLevel title={view} />}
              {view == "question-type" && <AddQueType title={view} />}
              {view == "content-type" && <AddContentType title={view} />}
              {view == "content-type-category" && (
                <AddConTypeCategory title={view} />
              )}
              {/* {view == "question" && <AddQuestion title={view} />}{" "} */}
              {view == "content" && <AddContent title={view} />}
              {view == "question-content" && <AddQueContent title={view} />}
              {view == "question-content-option" && (
                <AddQueContOption title={view} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
