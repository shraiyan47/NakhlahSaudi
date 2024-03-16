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
  useQueContent,
} from "../../../../store/useAdminStore";
import { Fragment, useEffect, useState } from "react";
import {
  getHandler,
  getQuestionUrl,
  getWithUrl,
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
  renderableQuestion,
  renderableQuestionContent,
  renderableQuetions,
  renderableTaskUnits,
  renderableTasks,
} from "@/lib/fetchFunctions";
import { GitCommitHorizontal, Hash } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import CustomSearchableDropdown from "@/components/ui-custom/CustomSearchableDropdown";

export default function AddQuePage({ rowData, useForEdit }) {
  console.log(rowData);
  const { toast } = useToast();
  //

  //
  const initStateSelection = {
    id: null,
    title: "",
  };
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);

  // const [question, setQuestion] = useState(useForEdit ? rowData.question : "");

  const initErrors = {
    err0: "",
  };
  const [error, setError] = useState(initErrors);
  //
  const [questionContentOptions, setQuestionContentOptions] = useState([]);
  console.log(questionContentOptions);
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  const [selectedQueType, setSelectedQueType] = useState(
    useForEdit
      ? {
          id: rowData?.question_type?.id,
          title: rowData?.question_type?.title,
        }
      : rowData?.question_type
      ? {
          id: rowData?.question_type?.id,
          title: rowData?.question_type?.title,
        }
      : initStateSelection //{ id: 1, title: "MCQ" }
  );
  //  question-type

  const contents = useContent((state) => state.data);
  const setContents = useContent((state) => state.setContents);
  const currentView = useTabularView((state) => state.data.currentView);

  const questionsData = useQueContent((state) => state.data);
  const setQuestionData = useQueContent((state) => state.setQueContents);
  const [question, setQuestion] = useState(
    useForEdit
      ? {
          id: rowData?.question?.id,
          title: rowData?.question?.title,
        }
      : initStateSelection // { id: 8, title: "quesion" }
  );
  //  -------------------------------------------------------------- journey portion
  const journeyData = useLearningJourney((state) => state.data);
  const setJournies = useLearningJourney((state) => state.setJournies);
  const [selectedJourney, setSelectedJourney] = useState(
    useForEdit
      ? {
          id: rowData?.level?.id,
          title: rowData?.level?.title,
        }
      : initStateSelection // { id: 3, title: "Advanced" }
  );
  console.log(selectedJourney);
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
          id: rowData?.task?.id,
          title: rowData?.task?.title,
        }
      : initStateSelection //{ id: 9, title: "Pokath" }
  );
  const [questionContentOptionId, setQuestionContentOptionId] = useState(0);
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
          id: rowData?.task_unit?.id,
          title: rowData?.task_unit?.title,
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
    "Fill In The Blank": "content-fib",
    "True Or False": "content-boolean",
    "Sentence Making": "content-sm",
    "Pair Matching": "content-pm",
  };
  useEffect(() => {
    const fetch = async () => {
      // const url = `api/contents?filters[content_type][title][$eq]=${selectedQueType.title}`;
      const url = `api/contents?populate=*`;
      const response = await getWithUrl(url);
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
  useEffect(() => {
    const fetch = async () => {
      console.log(selectedQueType.id);
      const url = getQuestionUrl(selectedQueType.id);
      const response = await getWithUrl(url);
      if (response.status === 200) {
        console.log(response.data.data);
        setQuestionData(renderableQuestion(response.data.data));
        // setQuestion({ id: null, title: "" });
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
          id: rowData?.lesson?.id,
          title: rowData?.lesson?.title,
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

  useEffect(() => {
    const fetch = async () => {
      let url = `api/question-content-options?populate[question_content][populate][0]=question,question_type,content&filters[question_content][id][$eq]=${rowData.question_content}`;
      const response = await getWithUrl(url);
      if (response.status === 200) {
        if (response?.data?.data[0]?.id) {
          let url1 = `api/question-content-options/${response?.data?.data[0]?.id}?populate=*`;
          console.log(url1);
          const response1 = await getWithUrl(url1);
          if (response1.status === 200) {
            console.log(response1.data.data);
            setQuestionContentOptionId(response?.data?.data[0]?.id);
            setQuestionContentOptions(
              response1?.data?.data?.attributes?.contents?.data
            );
          }
        }
      }
    };
    if (rowData.question_content) {
      fetch();
    }
  }, [rowData?.question_content]);
  const initOptionData = {
    content: initStateSelection,
  };
  const initOptions = {
    option1: useForEdit ? { content: rowData?.content } : initOptionData,
    option2:
      (useForEdit && questionContentOptions.length) > 0
        ? {
            content: {
              id: questionContentOptions[0]?.id,
              title: questionContentOptions[0]?.attributes?.title,
            },
          }
        : initOptionData,
    /* optionThree:
      (useForEdit && questionContentOptions.length) > 0
        ? {
            content: {
              id: questionContentOptions[1]?.id,
              title: questionContentOptions[1]?.attributes?.title,
            },
          }
        : initOptionData,
    optionFour:
      (useForEdit && questionContentOptions.length) > 0
        ? {
            content: {
              id: questionContentOptions[2]?.id,
              title: questionContentOptions[2]?.attributes?.title,
            },
          }
        : initOptionData, */
  };
  console.log(initOptions);
  const initRightWrong = {
    option1: useForEdit ? true : false,
    option2: false,
    /* optionThree: false,
    optionFour: false, */
  };

  const [options, setOptions] = useState(initOptions);
  console.log(options);
  const [rightAndWrong, setRightAndWrong] = useState(initRightWrong);
  console.log(rightAndWrong);
  useEffect(() => {
    setOptions({
      option1: useForEdit ? { content: rowData?.content } : initOptionData,
      option2:
        (useForEdit && questionContentOptions.length) > 0
          ? {
              content: {
                id: questionContentOptions[0]?.id,
                title: questionContentOptions[0]?.attributes?.title,
              },
            }
          : initOptionData,
    });
  }, questionContentOptions);
  function handleMark(obj) {
    // setRightAndWrong({ ...rightAndWrong, ...obj });
    const updatedRightAndWrong = {};

    // Iterate over the keys of the passed object
    Object.keys(obj).forEach((key) => {
      // Set the specified option to true
      updatedRightAndWrong[key] = obj[key];

      // Set all other options to false
      Object.keys(rightAndWrong).forEach((option) => {
        if (option !== key) {
          updatedRightAndWrong[option] = false;
        }
      });
    });

    // Update the state
    setRightAndWrong(updatedRightAndWrong);
  }
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

    let rightAns = Object.keys(rightAndWrong).find(
      (item) => rightAndWrong[item] == true
    );
    console.log(rightAns);
    let wrongAns = Object.keys(rightAndWrong).filter(
      (item) => rightAndWrong[item] == false
    );
    console.log(question);
    console.log(tFAns);
    console.log(pairMatchingContents );
    console.log(
      question?.title.length > 2 &&
        selectedLesson.id &&
        ((selectedQueType.title == "MCQ" && wrongAns.length > 0 && rightAns) ||
          (selectedQueType.title == "True Or False" && tFAns.id != null) ||
          (selectedQueType.title == "Sentence Making" && smAns.id != null) ||
          (selectedQueType.title == "Fill In The Blank" &&
            wrongAns.length > 0 &&
            rightAns &&
            question?.title.includes("-") == true || question?.title.includes("_") ))
            || (selectedQueType.title == "Pair Matching" && pairMatchingContents != undefined)
    );
    if (
      question?.title.length > 2 &&
      selectedLesson.id &&
      ((selectedQueType.title == "MCQ" && wrongAns.length > 0 && rightAns) ||
        (selectedQueType.title == "True Or False" && tFAns.id != null) ||
        (selectedQueType.title == "Sentence Making" && smAns.id != null) ||
        (selectedQueType.title == "Fill In The Blank" &&
          wrongAns.length > 0 &&
          rightAns &&
          question?.title.includes("-") == true || question?.title.includes("_")))
        || (selectedQueType.title == "Pair Matching" && pairMatchingContents != undefined)
    ) {
      console.log("called");
      //
      /*  let formData = new FormData();
      var fileInput = document.getElementById("idInputFile");
      var file = fileInput.files[0];
      console.log(file);
      formData.append("files.image", file);
      console.log(formData);
      let obj = {
        question: question,
        question_type: { connect: [selectedQueType.id] },
      };
      let obj2 = {
        question: question,
        question_type: { connect: [selectedQueType.id] },
        audio: queAudio,
      };
      console.log(obj, obj2);
      // formData.append("data", `{"question":"${question}"}`);
      formData.append(
        "data",
        queAudio.length > 0 ? JSON.stringify(obj2) : JSON.stringify(obj)
      );
      console.log(
        "formData : " + JSON.stringify(formData.get("files.image")),
        JSON.stringify(formData.get("data"))
      ); */
      try {
        let content = "";
        if (
          selectedQueType.title == "Fill In The Blank" ||
          selectedQueType.title == "MCQ"
        ) {
          content = getQueContent(rightAns);
        } else if (selectedQueType.title == "True Or False") {
          content = tFAns.id;
        }
        let queContResult;
        if(selectedQueType.title != "Pair Matching"){
          queContResult = useForEdit
          ? await putHandler("question-content", rowData?.question_content, {
              data: {
                question: { connect: [question.id] },
                question_type: { connect: [selectedQueType.id] },
                content: { connect: [content] },
              },
            })
          : await postHandler("question-content", {
              data: {
                question: { connect: [question.id] },
                question_type: { connect: [selectedQueType.id] },
                content: { connect: [content] },
              },
            });
        console.log(queContResult);
        }
        console.log(`title`, selectedQueType.title);
        if (
          selectedQueType.title == "Fill In The Blank" ||
          selectedQueType.title == "MCQ"
        ) {
          console.log(
            "options",
            options,
            "rightAns",
            queContResult,
            queContResult?.data?.data?.id
          );
          const wrongAnsOptions = Object.keys(options).filter(
            (option) => !rightAndWrong[option]
          );
          console.log(wrongAnsOptions);
          const queOptionResult = useForEdit
            ? await putHandler(
                "question-content-option",
                questionContentOptionId,
                {
                  data: {
                    question_content: {
                      connect: [queContResult.data.data.id],
                    },
                    content: {
                      connect: wrongAnsOptions.map(
                        (option) => options[option]?.content.id
                      ),
                    },
                  },
                }
              )
            : await postHandler("question-content-option", {
                data: {
                  question_content: {
                    connect: [queContResult.data.data.id],
                  },
                  contents: {
                    connect: wrongAnsOptions.map(
                      (option) => options[option]?.content.id
                    ),
                  },
                },
              });
          // alert("queOptionResult: " + JSON.stringify(queOptionResult));

          if (queOptionResult.status == 200) {
            const journeyMapResult = useForEdit
              ? await putHandler("journey-map-question", rowData.id, {
                  data: {
                    learning_journey_lesson: {
                      connect: [selectedLesson.id],
                    },
                    question_content: {
                      connect: [queContResult.data.data.id],
                    },
                  },
                })
              : await postHandler("journey-map-question", {
                  data: {
                    learning_journey_lesson: {
                      connect: [selectedLesson.id],
                    },
                    question_content: {
                      connect: [queContResult.data.data.id],
                    },
                  },
                });
            if (journeyMapResult.status == 200) {
              toast({
                title: "Question Added Successfully",
              });
            }
            // alert("journeyMapResult: " + JSON.stringify(journeyMapResult));
          }
        } else if (selectedQueType.title == "True Or False") {
          const journeyMapResult = useForEdit
            ? await putHandler("journey-map-question", rowData.id, {
                data: {
                  learning_journey_lesson: {
                    connect: [selectedLesson.id],
                  },
                  question_content: {
                    connect: [queContResult.data.data.id],
                  },
                },
              })
            : await postHandler("journey-map-question", {
                data: {
                  learning_journey_lesson: {
                    connect: [selectedLesson.id],
                  },
                  question_content: {
                    connect: [queContResult.data.data.id],
                  },
                },
              });
          if (journeyMapResult.status == 200) {
            toast({
              title: "Question Added Successfully",
            });
          }
        }
        else if(selectedQueType.title == "Pair Matching"){
          console.log(pairMatchingContents);
          let contents = Object.keys(pairMatchingContents).map(pairMatching => pairMatchingContents[pairMatching].content.id);

          console.log(contents);
          console.log(contents[0]);
          let contentOptionsList = contents.slice(1);
          console.log(contentOptionsList);
          queContResult = useForEdit
          ? await putHandler("question-content", rowData?.question_content, {
              data: {
                question: { connect: [question.id] },
                question_type: { connect: [selectedQueType.id] },
                content: { connect: [contents[0]] },
              },
            })
          : await postHandler("question-content", {
              data: {
                question: { connect: [question.id] },
                question_type: { connect: [selectedQueType.id] },
                content: { connect: [contents[0]] },
              },
            });
          const queOptionResult = useForEdit
            ? await putHandler(
                "question-content-option",
                questionContentOptionId,
                {
                  data: {
                    question_content: {
                      connect: [queContResult?.data?.data?.id],
                    },
                    contents: {
                      connect: contentOptionsList,
                    },
                  },
                }
              )
            : await postHandler("question-content-option", {
                data: {
                  question_content: {
                    connect: [queContResult?.data?.data?.id],
                  },
                  contents: {
                    connect: contentOptionsList,
                  },
                },
              });
          // alert("queOptionResult: " + JSON.stringify(queOptionResult));

          if (queOptionResult.status == 200) {
            const journeyMapResult = useForEdit
              ? await putHandler("journey-map-question", rowData.id, {
                  data: {
                    learning_journey_lesson: {
                      connect: [selectedLesson.id],
                    },
                    question_content: {
                      connect: [queContResult?.data?.data?.id],
                    },
                  },
                })
              : await postHandler("journey-map-question", {
                  data: {
                    learning_journey_lesson: {
                      connect: [selectedLesson.id],
                    },
                    question_content: {
                      connect: [queContResult?.data?.data?.id],
                    },
                  },
                });
            if (journeyMapResult.status == 200) {
              toast({
                title: "Question Added Successfully",
              });
            }
            // alert("journeyMapResult: " + JSON.stringify(journeyMapResult));
          }
        }

        useForEdit
          ? afterUpdate({
              id: rowData?.id,
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
            })
          : afterAdd({
              id: question.id,
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

        useForEdit
          ? document.getElementById("closeDialog")?.click()
          : document.getElementById("closeDialog")?.click();
      } catch (error) {
        console.log(error);
        alert(JSON.stringify(error)); // NOTE - use "error.response.data` (not "error")
      }
    }
    //  specific errors
    else {
      const optionsHaveContentIDs = Object.keys(options).every(
        (option) => options[option]?.content?.id !== null
      );
      const rightAnsDefined = rightAns !== undefined;
      if (selectedLesson.id == null) {
        err_0 = "Select A Lesson";
      }
      if (selectedQueType.id == null) {
        err_1 = "Select Question Type";
      }
      if (question.length < 3) {
        err_2 = "Question Too Short";
      }
      if (
        question.length > 2 &&
        selectedQueType.title == "Fill In The Blank" &&
        question.includes("-") == false
      ) {
        err_2 = `Put a blank ("-") within question`;
      }
      if (selectedQueType.title == "True 0r False" && tFAns.id == null) {
        err_3 = "Must Provide A Correct Option";
      }
      if (
        selectedQueType.title == "MCQ" ||
        selectedQueType.title == "Fill In The Blank"
      ) {
        if (!optionsHaveContentIDs) {
          err_3 = "Provide all 4 options";
        } else if (!rightAnsDefined) {
          err_3 = "Please mark an option as right answer";
        }
      }

      setError({
        err0: err_0,
        err1: err_1,
        err2: err_2,
        err3: err_3,
        err4: err_4,
        err5: err_5,
        err6: err_6,
      });
    }
  }

  function getQueContent(rightAns) {
    if (
      selectedQueType.title == "Fill In The Blank" ||
      selectedQueType.title == "MCQ"
    ) {
      return options[rightAns].content.id;
    } else if (selectedQueType.title == "True 0r False") {
      return tFAns.id;
    } else if (selectedQueType.title == "Sentence Making") {
      return smAns.id;
    }
  }

  function resetForm() {
    console.log("resetForm is called");
    setSelectedJourney(initStateSelection);
    setSelectedUnit(initStateSelection);
    setSelectedLesson(initStateSelection);
    setSelectedLevel(initStateSelection);

    setSelectedQueType(initStateSelection);
    setOptions(initOptions);
    setTFAns(initStateSelection);
    // setQuestion("");
    setRightAndWrong(initRightWrong);
    setError(initErrors);
    setQueAudio("");
    setImage("");
  }

  const [tFAns, setTFAns] = useState(
    useForEdit ? rowData?.content : initStateSelection
  );
  console.log(tFAns);
  const trueFalseOptions = [
    { id: 31, title: "False" },
    { id: 30, title: "True " },
  ];
  const [image, setImage] = useState(null);
  const [queAudio, setQueAudio] = useState("");
  const [smAns, setSmAns] = useState(initStateSelection);
  const handleAddOption = () => {
    const newOptionKey = `option${Object.keys(options).length + 1}`; // Generate unique key for new option
    setOptions({
      ...options,
      [newOptionKey]: initOptionData,
    });
    setRightAndWrong({
      ...rightAndWrong,
      [newOptionKey]: false,
    });
  };
  //   jsx
  const matchingMethodList = ["language", "category"];
  const [selectedMatchingMethod, setSelectedMatchingMethod] =
    useState("language");
  const handleMatchingOptionMethod = (method) => {
    console.log(method);
    setSelectedMatchingMethod(method);
  };
  const initialPairMatchingObj = {
    option1: {
      content: { id: null, title: "" },
      content_details_by_languages: { id: null, title: "" },
    },
  };
  const [pairMatchingContents, setPairMatchingContents] = useState(
    initialPairMatchingObj
  );
  console.log(pairMatchingContents); 
  const handlePairMatchingContent = async (index, obj) => {
    console.log(obj);
    let contentDetailsByLanguage = await getContentDetailsByLanguage(obj.id);
    console.log(contentDetailsByLanguage);
    setPairMatchingContents({
      ...pairMatchingContents,
      ["option" + index]: {
        ...pairMatchingContents["option" + index],
        content: { id: obj.id, title: obj.title },
        content_details_by_languages: contentDetailsByLanguage,
      },
    });
  };
  const getContentDetailsByLanguage = async (contentId) => {
    const url = `api/content-details-by-languages?populate=*&filters[content][id][$eq]=${contentId}`;
    const response = await getWithUrl(url);
    if (response.status === 200) {
      return {
        id: response.data.data[0]?.id,
        title: response.data?.data[0]?.attributes?.title,
      };
    } else {
      return { id: null, title: "" };
    }
  };
  const handleAddNewContentOption = () => {
    const newOptionKey = `option${
      Object.keys(pairMatchingContents).length + 1
    }`;
    setPairMatchingContents({
      ...pairMatchingContents,
      [newOptionKey]: {
        content: { id: null, title: "" },
        content_details_by_languages: { id: null, title: "" },
      },
    });
  };
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
          <div className="flex flex-col gap-4">
            {/* <CustomSelect
              label={"Learner Level"}
              value={selectedJourney}
              options={journeyData}
              bg="wh"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            /> */}
            <CustomSearchableDropdown
              label={"Learner Level"}
              value={selectedJourney}
              options={journeyData}
              bg="wh"
              onChange={(value) =>
                setSelectedJourney({ id: value.id, title: value.title })
              }
            />
            <CustomSearchableDropdown
              label={"Task"}
              value={selectedUnit}
              options={filteredUnits}
              bg="wh"
              onChange={(value) =>
                setSelectedUnit({ id: value.id, title: value.title })
              }
            />

            <CustomSearchableDropdown
              label={"Task level"}
              value={selectedLevel}
              options={filteredLevels}
              bg="wh"
              onChange={(value) =>
                setSelectedLevel({ id: value.id, title: value.title })
              }
            />

            <CustomSearchableDropdown
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
          <div className="flex flex-col gap-4">
            <CustomSearchableDropdown
              label={"Select Question Type"}
              value={selectedQueType}
              options={queTypeData}
              bg="wh"
              onChange={(value) =>
                setSelectedQueType({ id: value.id, title: value.title })
              }
              // addNewText="New Question Type"
              addNewAfterClick={handleAdd}
            />
            {/* {error.err1 !== "" && (
              <span className="text-red-700">{error.err1}</span>
            )} */}
          </div>
          <div className="flex flex-col gap-4">
            <CustomSearchableDropdown
              label={"Select Question"}
              value={question}
              options={questionsData}
              bg="wh"
              onChange={(value) =>
                setQuestion({ id: value.id, title: value.title })
              }
              // addNewText="New Question"
              addNewAfterClick={handleAdd}
            />
            {/* <span className="text-red-700">{error.err2}</span> */}
          </div>
          {/* <div className="flex gap-2 flex-col items-start">
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

          </div> */}
        </div>

        {/* {JSON.stringify(selectedQueType)} */}
        {/* sao Set answer option */}
        <div className="flex flex-col gap-2 rounded-md py-0.75 px-2">
          {selectedQueType && (
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

                {/* {JSON.stringify(options)} */}

                {selectedQueType.title == "True Or False" && (
                  <div className="flex flex-col gap-3 font-mono text-sm rounded-md border-l-2 border-blue-400 py-3 px-2  ">
                    <div className="flex justify-between pb-1">
                      <span className="px-2 bg-blue-100 rounded-full h-[1.2rem]">
                        Select Correct Option
                      </span>
                    </div>

                    <CustomSearchableDropdown
                      label={"(true/false)"}
                      value={tFAns}
                      options={contents}
                      onChange={(selected) => setTFAns(selected)}
                      bg="wh"
                    />
                  </div>
                )}
                {selectedQueType.title == "Sentence Making" && (
                  <div className="flex flex-col gap-3 font-mono text-sm rounded-md border-l-2 border-blue-400 py-3 px-2  ">
                    <div className="flex flex-col gap-1 ">
                      <span className="">
                        Select Sentence That's In Correct Order
                      </span>
                      <CustomSearchableDropdown
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

                {(selectedQueType.title === "MCQ" ||
                  selectedQueType.title === "Fill In The Blank") && (
                  <>
                    {Object.keys(options).map((option, index) => {
                      console.log(option, options[option]?.content);
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-3 font-mono text-sm rounded-sm border-l-2 border-blue-400 py-3 px-2"
                        >
                          <div className="flex justify-between pb-1">
                            <p className="flex justify-between bg-blue-100 rounded-full h-[1.2rem]">
                              <span className="px-2">Answer Option</span>
                              <span className="px-1 h-full rounded-full bg-blue-200 font-semibold">
                                {index + 1}
                              </span>
                            </p>
                            <div className="flex gap-2 items-center">
                              <input
                                type="checkbox"
                                id={option}
                                checked={rightAndWrong[option]}
                                name={"ans_option"}
                                onChange={(e) =>
                                  handleMark({ [option]: e.target.checked })
                                }
                              />
                              <label htmlFor={option} className="text-sm">
                                Mark as right answer
                              </label>
                            </div>
                          </div>

                          <CustomSearchableDropdown
                            value={options[option]?.content}
                            label="Content"
                            options={contents}
                            onChange={(selected) =>
                              setOptions({
                                ...options,
                                [option]: {
                                  ...options[option],
                                  content: selected,
                                },
                              })
                            }
                            addNewText="New Content"
                            addNewAfterClick={handleAdd}
                            bg="wh"
                          />
                        </div>
                      );
                    })}
                    {/* Button to add new option */}
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-sm"
                    >
                      Add New Option
                    </button>
                  </>
                )}
                {selectedQueType.title === "Pair Matching" && (
                  <div>
                    <div className="flex flex-col gap-3 font-mono text-sm rounded-sm border-l-2 border-blue-400 py-3 px-2">
                      <span className="text-sm">
                        Select a pair matching option method
                      </span>
                      {matchingMethodList.map((matchingMethod) => (
                        <div key={matchingMethod} className="flex items-center">
                          <input
                            type="radio"
                            id={matchingMethod}
                            name="matchingMethodOption"
                            value={matchingMethod}
                            checked={selectedMatchingMethod === matchingMethod}
                            onChange={(e) =>
                              handleMatchingOptionMethod(e.target.value)
                            }
                            className="mr-2" // Add margin to the right
                          />
                          <label
                            htmlFor={matchingMethod}
                            className="cursor-pointer"
                          >
                            By {matchingMethod}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedMatchingMethod === "language" && (
                      <div className="flex gap-4 flex-col md:flex-row md:gap-y-8">
                        {/* Left Column */}
                        <div className="flex-1 gap-2">
                          {/* Selectable Content */}
                          <h3 className="text-lg font-semibold">English</h3>
                          {Object.keys(pairMatchingContents)?.map(
                            (pairMatchingContent, index) => (
                              <CustomSearchableDropdown
                                key={`option-${index}`}
                                value={
                                  pairMatchingContents["option" + index + 1]
                                    ?.content.title
                                }
                                label="Select Content"
                                options={contents}
                                onChange={(selected) =>
                                  handlePairMatchingContent(index + 1, selected)
                                }
                                addNewText="New Pair Matching"
                                addNewAfterClick={handleAdd}
                                bg="white"
                              />
                            )
                          )}
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 gap-2">
                          {/* Display Selected Content Name */}
                          <h3 className="text-lg font-semibold">Arabic</h3>
                          {Object.keys(pairMatchingContents).map(
                            (pairMatchingContent, index) => (
                              <div key={`selected-content-${index}`}>
                                <span>
                                  {pairMatchingContents["option" + (index + 1)]
                                    ?.content?.title
                                    ? pairMatchingContents[
                                        "option" + (index + 1)
                                      ]?.content_details_by_languages?.title
                                    : ""}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddNewContentOption}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-sm"
                    >
                      Add New Content
                    </button>

                    {selectedMatchingMethod == "category" && (
                      <div>
                        <h1>Selected by Category</h1>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="relative px-3   ">
          <div className="sticky bottom-0 bg-white">
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
