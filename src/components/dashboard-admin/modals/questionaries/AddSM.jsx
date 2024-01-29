"use client";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "@/components/ui-custom/CustomSelect";
import {
  useLearningJourney,
  useConType,
  useConTypeCategory,
  useContent,
  useQueType,
  useQuestion,
  useTabularView,
  useLearningLesson,
  useLearningLevel,
  useLearningUnit,
} from "../../../../store/useAdminStore";
import { useEffect, useState } from "react";
import {
  getHandler,
  postHandler,
  postMap,
  putHandler,
  putMap,
} from "@/lib/requestHandler";
import EnhancedText from "@/components/ui-custom/EnhancedText";
import {
  renderableContTypeCategories,
  renderableContTypes,
  renderableContents,
  renderableLearningLevels,
  renderableLessons,
  renderableQueType,
  renderableTaskUnits,
  renderableTasks,
} from "@/lib/fetchFunctions";
import { GitCommitHorizontal, Hash } from "lucide-react";
import axios from "axios";

export default function AddSM({ rowData, useForEdit }) {
  const { toast } = useToast();
  //

  //
  const initStateSelection = {
    id: null,
    title: "",
  };
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);

  const [question, setQuestion] = useState(useForEdit ? rowData.question : "");

  const initErrors = {
    err0: "",
  };
  const [error, setError] = useState(initErrors);
  //
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  const [selectedQueType, setSelectedQueType] = useState(
    useForEdit
      ? {
          id: rowData.question_type.id,
          title: rowData.question_type.title,
        }
      : initStateSelection //{ id: 1, title: "MCQ" }
  );
  //  question-type

  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const currentView = useTabularView((state) => state.data.currentView);

  //  -------------------------------------------------------------- journey portion
  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData.level.id,
          title: rowData.level.title,
        }
      : initStateSelection // { id: 3, title: "Advanced" }
  );

  useEffect(() => {
    if (selectedJourney.id != null) {
      useForEdit ? "" : setSelectedUnit(initStateSelection);
      filterUnitsByJourney(selectedJourney.id);
    }
  }, [selectedJourney]);
  //
  //  -------------------------------------------------------------- Task Unit Portion
  const unitData = useLearningUnit((state) => state.data);
  const setUnits = useLearningUnit((state) => state.setUnits);
  //
  function filterUnitsByJourney(id) {
    const filetred = unitData.filter((item) => item.learning_journey.id == id);

    setFilteredUnits(filetred);
  }
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(
    useForEdit
      ? {
          id: rowData.task.id,
          title: rowData.task.title,
        }
      : initStateSelection //{ id: 9, title: "Pokath" }
  );

  useEffect(() => {
    if (selectedUnit.id != null) {
      useForEdit ? "" : setSelectedLevel(initStateSelection);
      filterLevelsByUnit(selectedUnit.id);
    }
  }, [selectedUnit]);
  //
  //  -------------------------------------------------------------- Task Level Portion
  const levelData = useLearningLevel((state) => state.data);
  const setLevels = useLearningLevel((state) => state.setLevels);
  function filterLevelsByUnit(id) {
    setFilteredLevels(
      levelData.filter((item) => item.learning_journey_unit.id == id)
    );
  }
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(
    useForEdit
      ? {
          id: rowData.task_unit.id,
          title: rowData.task_unit.title,
        }
      : initStateSelection // { id: 7, title: "Level adv pokath" }
  );

  useEffect(() => {
    if (selectedLevel.id != null) {
      useForEdit ? "" : setSelectedLesson(initStateSelection);
      filterLessonsByLevel(selectedLevel.id);
    }
  }, [selectedLevel]);

  const fetchMapContent = {
    MCQ: "content-mcq",
    "Fill in the blank": "content-fib",
    "True 0r False": "content-boolean",
    "Sentence Making": "content-sm",
    "Pair Matching": "content-pm",
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler(fetchMapContent[selectedQueType.title]);
      if (response.status === 200) {
        setContents(renderableContents(response.data.data));
      }
    };
    if (selectedQueType.id != null) {
      setError({ ...error, err3: "" });
      fetch();
      selectedQueType.title == "Sentence Making" ? setQuestion("") : "";
    }
  }, [selectedQueType]);
  //
  //  -------------------------------------------------------------- Task Lesson Portion
  const lessonData = useLearningLesson((state) => state.data);
  const setLessons = useLearningLesson((state) => state.setLessons);
  const [selectedLesson, setSelectedLesson] = useState(
    useForEdit
      ? {
          id: rowData.lesson.id,
          title: rowData.lesson.title,
        }
      : initStateSelection // { id: 8, title: "Lesson 2" }
  );
  function filterLessonsByLevel(id) {
    setFilteredLessons(
      lessonData.filter((item) => item.learning_journey_level.id == id)
    );
  }
  const [filteredLessons, setFilteredLessons] = useState([]);

  function handleAdd() {}
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");
      if (response.status === 200) {
        setQueTypes(renderableQueType(response.data.data));
      }
    };
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      fetch();
    }
  }, [queTypeData]);

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
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-unit");
      if (response.status === 200) {
        setUnits(renderableTasks(response.data.data));
      }
    };
    if (Array.isArray(unitData) && unitData.length === 0) {
      fetch();
    }
  }, [unitData]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-level");

      if (response.status === 200) {
        setLevels(renderableTaskUnits(response.data.data));
      }
    };
    if (Array.isArray(levelData) && levelData.length === 0) {
      fetch();
    }
  }, [levelData]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("learning-lesson");

      if (response.status === 200) {
        setLessons(renderableLessons(response.data.data));
      }
    };
    if (Array.isArray(lessonData) && lessonData.length === 0) {
      fetch();
    }
  }, [lessonData]);
  //   hs()
  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    let err_5 = "";
    let err_6 = "";

    if (
      question.length > 2 &&
      selectedLesson.id && 
      smAns.id != null
    ) {
      //
      let formData = new FormData();
      var fileInput = document.getElementById("idInputFile");
      var file = fileInput.files[0];
      formData.append("files.image", file);

      let obj = {
        question: question,
        question_type: { connect: [selectedQueType.id] },
      };
      let obj2 = {
        question: question,
        question_type: { connect: [selectedQueType.id] },
        audio: queAudio,
      };

      // formData.append("data", `{"question":"${question}"}`);
      formData.append(
        "data",
        queAudio.length > 0 ? JSON.stringify(obj2) : JSON.stringify(obj)
      );

      try {
        const queResult = await axios.post(
          "https://api.nakhlah.xyz/api/questions?populate=image",
          formData,
          {
            headers: {
              Authorization:
                "Bearer " +
                "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e",
            },
          }
        );

        if (queResult?.data?.data?.id) {
          const queContResult = useForEdit
            ? await putHandler("question-content", rowData.id, {
                data: {},
              })
            : await postHandler("question-content", {
                data: {
                  question: { connect: [queResult.data.data.id] },
                  question_type: { connect: [selectedQueType.id] },
                  content: { connect: [getQueContent(rightAns)] },
                },
              });

          // alert("queContResult: " + JSON.stringify(queContResult));

          useForEdit
            ? afterUpdate(data)
            : afterAdd({
                id: queResult.data.data.id,
                question: question,
                audio: queAudio,
                question_type: {
                  id: selectedQueType.id,
                  title: selectedQueType.title,
                },
                lesson: {
                  id: selectedLesson.id,
                  title: selectedLesson.title,
                },
                task_unit: {
                  id: selectedLevel.id,
                  title: selectedLevel.title,
                },
                task: {
                  id: selectedUnit.id,
                  title: selectedUnit.title,
                },
                level: {
                  id: selectedJourney.id,
                  title: selectedJourney.title,
                },
              });
          toast({
            title: useForEdit
              ? "Item Updated Succesfully"
              : "Item Added Successfully",
          });
          resetForm();
        } else if (queResult.status == 400) {
          let errors = queResult.data.error.details.errors;
          alert("errors: " + JSON.stringify(errors));
          setError({
            err2: errors[0]?.message,
          });
        }
      } catch (error) {
        alert(JSON.stringify(error.response.data)); // NOTE - use "error.response.data` (not "error")
      }
    }
    //  specific errors
    else {
      if (selectedLesson.id == null) {
        err_0 = "Select A Lesson";
      }
      if (selectedQueType.id == null) {
        err_1 = "Select Question Type";
      }
      if (question.length < 3) {
        err_2 = "Question Too Short";
      }

      if (selectedQueType.title == "True 0r False" && tFAns.id == null) {
        err_3 = "Must Provide A Correct Option";
      }

      setError({
        err0: err_0,
        err1: err_1,
        err2: err_2,
        err3: err_3,
      });
    }
  }

  function getQueContent(rightAns) {
    if (selectedQueType.title == "Sentence Making") {
      return smAns.id;
    }
  }

  function resetForm() {
    setQuestion("");
    setError(initErrors);
    setQueAudio("");
    setImage("");
  }

  const [image, setImage] = useState(null);
  const [queAudio, setQueAudio] = useState("");
  const [smAns, setSmAns] = useState(initStateSelection);

  //   jsx
  return (
    <div className="w-full p-3   rounded-md ">
      {/* {JSON.stringify(tFAns)} */}
      {/* 
        "--" +
        JSON.stringify(selectedUnit) +
        "--" +
        JSON.stringify(selectedLevel) +
        "--" +
        JSON.stringify(selectedLesson) +
        "--" +
        JSON.stringify(selectedQueType) +
        "--" +
        JSON.stringify(tFAns) +
        "--" +
        JSON.stringify(smAns)} */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 py-2 text-black text-sm font-mono"
      >
        {/* sll select learning lesson */}
        <div className="flex flex-col gap-3 rounded-sm   py-0.75 px-2">
          <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
            <GitCommitHorizontal className="w-6 h-6 text-blue-500" /> Select
            Learning Lesson
          </EnhancedText>
          <div className="flex flex-col gap-2 w-2/3">
            <CustomSelect
              label={"Learner Level"}
              value={selectedJourney}
              options={journeyData}
              bg="wh"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <CustomSelect
              label={"Task"}
              value={selectedUnit}
              options={filteredUnits}
              bg="wh"
              onChange={(value) =>
                setSelectedUnit({ id: value.id, title: value.title })
              }
            />

            <CustomSelect
              label={"Task level"}
              value={selectedLevel}
              options={filteredLevels}
              bg="wh"
              onChange={(value) =>
                setSelectedLevel({ id: value.id, title: value.title })
              }
            />

            <CustomSelect
              label={"Task Lesson"}
              value={selectedLesson}
              options={filteredLessons}
              bg="wh"
              onChange={(value) =>
                setSelectedLesson({ id: value.id, title: value.title })
              }
            />
            {/* {error.err0 !== "" && (
              <span className="text-red-700">{error.err0}</span>
            )} */}
          </div>
        </div>

        {/* stq Set the question */}

        <div className="flex flex-col gap-3 rounded-sm    py-0.75 px-2">
          <EnhancedText kind={"four"} color="text-blue-600 font-semibold ">
            <GitCommitHorizontal className="w-6 h-6 text-blue-400" /> Set The
            Question
          </EnhancedText>
          <div className="flex flex-col gap-1 w-2/3">
            <CustomSelect
              label={"Select Question Type"}
              value={selectedQueType}
              options={queTypeData}
              bg="wh"
              onChange={(value) =>
                setSelectedQueType({ id: value.id, title: value.title })
              }
            />
            {/* {error.err1 !== "" && (
              <span className="text-red-700">{error.err1}</span>
            )} */}
          </div>
          <div className="flex flex-col gap-1 w-2/3">
            <span className="">Question</span>
            <CustomInput
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              ph="Enter the question"
              style="py-0.25 px-1"
            />
            {/* <span className="text-red-700">{error.err2}</span> */}
          </div>
          <div className="flex gap-2 flex-col items-start">
            <input
              type="file"
              id="idInputFile"
              name="file"
              onChange={(e) => {
                let files = e.target.files;
                let reader = new FileReader();
                reader.onload = (r) => {
                  setImage(r.target.result);
                };
                reader.readAsDataURL(files[0]);
              }}
            />
            {image && (
              <img
                alt=" image"
                src={image}
                className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
              />
            )}
          </div>
          <div className="flex flex-col gap-1 w-2/3 ">
            <span className="">Attach Audio Text</span>
            <textarea
              value={queAudio}
              onChange={(e) => setQueAudio(e.target.value)}
              rows={2}
              className="py-0.12 px-1 rounded-md border border-slate-400 outline-none"
            />

            {/* <span className="text-red-700">{error.err2}</span> */}
          </div>
        </div>
        {/* sao Set answer option */}
        <div className="flex flex-col gap-2 rounded-md w-2/3 py-0.75 px-2">
          {selectedQueType.id && (
            <>
              <div className="flex gap-3 items-center">
                <EnhancedText
                  kind={"four"}
                  color="text-blue-600 font-semibold "
                >
                  <GitCommitHorizontal className="w-6 h-6 text-blue-500" /> Set
                  Answer Options
                </EnhancedText>
                {/* <span className="text-red-600 font-semibold pt-0.12 ">
                  {error.err3}
                </span> */}
              </div>
              <div className="flex flex-col gap-4 border-blue-400">
                {/* option -1 */}
                {selectedQueType.title == "Sentence Making" && (
                  <div className="flex flex-col gap-3 font-mono text-sm rounded-md border-l-2 border-blue-400 py-3 px-2  ">
                    <div className="flex flex-col gap-1 ">
                      <span className="">
                        Select Sentence That's In Correct Order
                      </span>
                      <CustomSelect
                        value={smAns}
                        label="Select Content"
                        options={contents}
                        onChange={(selected) => setSmAns(selected)}
                        addNewText="New Sentence"
                        addNewAfterClick={handleAdd}
                        bg="wh"
                      />
                      <span className="text-red-700">{error.err2}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="relative px-3   ">
          <div className="sticky bottom-0 bg-white w-2/3">
            <div className="flex flex-col gap-0">
              {error.err0 !== "" && (
                <span className="text-red-700">{error.err0}</span>
              )}
              {error.err1 !== "" && (
                <span className="text-red-700">{error.err1}</span>
              )}
              {error.err2 !== "" && (
                <span className="text-red-700">{error.err2}</span>
              )}
              {error.err3 !== "" && (
                <span className="text-red-700">{error.err3}</span>
              )}
              {error.err4 !== "" && (
                <span className="text-red-700">{error.err4}</span>
              )}
            </div>
            <CustomButton
              txt="Submit"
              type="submit"
              style="text-lg w-full my-1 shadow-sm  py-0.12 h-fit font-semibold text-blue-900 bg-blue-200 leading-1"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
