"use client";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomSelect from "@/components/ui-custom/CustomSelect";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  useConType,
  useConTypeCategory,
  useQueType,
  useQuestion,
} from "../../../../store/useAdminStore";
import { useEffect, useState } from "react";
import { getHandler, postHandler, putHandler } from "@/lib/requestHandler";
import CustomSelect2 from "@/components/ui-custom/CustomSelect2";
import QueConOption from "../../tabular-view/questionaries/QueConOption";

export default function AddQuestion({ rowData, useForEdit }) {
  const { toast } = useToast();
  const initStateSelection = {
    id: null,
    title: "",
  };
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);
  //
  const catagoriesData = useConTypeCategory((state) => state.data);
  const setConTypeCategories = useConTypeCategory(
    (state) => state.setConTypeCategories
  );
  //
  const conTypeData = useConType((state) => state.data);
  const setConTypes = useConType((state) => state.setConTypes);
  //
  const afterUpdate = useQuestion((state) => state.afterUpdate);
  const afterAdd = useQuestion((state) => state.afterAdd);

  // function filterContentTypes(id) {
  //   setFilteredConTypes(
  //     conTypeData.filter((item) => item.learning_journey_unit.id == id)
  //   );
  // }

  const [question, setQuestion] = useState(useForEdit ? rowData.question : "");
  const [content, setContent] = useState(useForEdit ? rowData.content : "");
  //  answer options
  const [ansOptions, setAnsOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  // for question content
  const [selectedQueContCategory, setSelectedQueContCategory] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  const [selectedQueConType, setSelectedQueConType] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  // for answer otion
  const [selectedAnsContCategory, setSelectedAnsContCategory] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  const [selectedAnsConType, setSelectedAnsConType] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );
  const [selectedQueType, setSelectedQueType] = useState(
    useForEdit
      ? {
          id: rowData.id,
          title: rowData.title,
        }
      : initStateSelection
  );

  const [filteredConTypes, setFilteredConTypes] = useState([]);

  const [error, setError] = useState({
    err0: "",
    err1: "",
    err2: "",
    err3: "",
    err4: "",
    err5: "",
    err6: "",
    err7: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let err_0 = "";
    let err_1 = "";
    let err_2 = "";
    let err_3 = "";
    let err_4 = "";
    let err_5 = "";
    let err_6 = "";
    let err_7 = "";
    if (
      // selectedQueContCategory.id !== null &&
      // selectedQueConType.id !== null &&
      // selectedAnsContCategory.id !== null &&
      // selectedAnsConType.id !== null &&
      // selectedQueType.id !== null &&
      question.length > 2
      // content.length > 0 &&
      // option1 !== "" &&
      // option2 !== "" &&
      // option3 !== "" &&
      // option4 !== ""
    ) {
      const queResult = await postHandler("question", {
        data: { question: question },
      });
      alert("queResult:: " + JSON.stringify(queResult));
      const contResult = await postHandler("content", {
        data: {
          title: content,
          content_type: {
            connect: [selectedQueConType.id],
          },
          content_type_category: {
            connect: [selectedQueContCategory.id],
          },
        },
      });
      alert("contResult:: " + JSON.stringify(contResult));

      const opt1Result = await postHandler("content", {
        data: {
          title: ansOptions.option1,
          content_type: {
            connect: [selectedAnsConType.id],
          },
          content_type_category: {
            connect: [selectedAnsContCategory.id],
          },
        },
      });
      alert("opt1Result:   " + JSON.stringify(opt1Result));
      const opt2Result = await postHandler("content", {
        data: {
          title: ansOptions.option2,
          content_type: {
            connect: [selectedAnsConType.id],
          },
          content_type_category: {
            connect: [selectedAnsContCategory.id],
          },
        },
      });
      alert("opt2Result:   " + JSON.stringify(opt2Result));
      const opt3Result = await postHandler("content", {
        data: {
          title: ansOptions.option3,
          content_type: {
            connect: [selectedAnsConType.id],
          },
          content_type_category: {
            connect: [selectedAnsContCategory.id],
          },
        },
      });
      alert("opt3Result:   " + JSON.stringify(opt3Result));
      const opt4Result = await postHandler("content", {
        data: {
          title: ansOptions.option4,
          content_type: {
            connect: [selectedAnsConType.id],
          },
          content_type_category: {
            connect: [selectedAnsContCategory.id],
          },
        },
      });
      alert("opt4Result:   " + JSON.stringify(opt4Result));

      const queContResult = await postHandler("question-content", {
        data: {
          question: {
            connect: [queResult.data.data.id],
          },
          question_type: {
            connect: [selectedQueType.id],
          },
          content: {
            connect: [contResult.data.data.id],
          },
        },
      });

      const queOptionResult = await postHandler("question-content-option", {
        data: {
          question_content: {
            connect: [queContResult.data.data.id],
          },
          content: {
            connect: [
              opt1Result.data.data.id,
              opt2Result.data.data.id,
              opt3Result.data.data.id,
              opt4Result.data.data.id,
            ],
          },
        },
      });
      alert("queOptionResult: " + JSON.stringify(queOptionResult));

      // postHandler("question", {
      //   data: { question: question },
      // })
      //   .then((queResult) => {
      //     alert("queResult:: " + JSON.stringify(queResult));
      //     postHandler("content", {
      //       data: {
      //         title: content,
      //         content_type: {
      //           connect: [selectedQueConType.id],
      //         },
      //         content_type_category: {
      //           connect: [selectedQueContCategory.id],
      //         },
      //       },
      //     })
      //       .then((contResult) => {
      //         alert("contResult :: " + JSON.stringify(contResult));
      //         postHandler("question-content", {
      //           data: {
      //             question: {
      //               connect: [queResult.data.data.id],
      //             },
      //             question_type: {
      //               connect: [selectedQueType.id],
      //             },
      //             content: {
      //               connect: [contResult.data.data.id],
      //             },
      //           },
      //         })
      //           .then((queContResult) => {
      //             alert("queContResult  :: " + JSON.stringify(queContResult));

      //             postHandler("question-content-option", {
      //               data: {
      //                 question_content: {
      //                   connect: [queContResult.data.data.id],
      //                 },
      //                 content: {
      //                   connect: [5],
      //                 },
      //               },
      //             })
      //               .then((queConOptResult) => {})
      //               .catch((err) => {});
      //             useForEdit ? afterUpdate(data) : afterAdd(data);
      //             toast({
      //               title: useForEdit
      //                 ? "Item Updated Succesfully"
      //                 : "Item Added Successfully",
      //             });
      //             document.getElementById("closeDialog")?.click();
      //           })
      //           .catch((err3) => {
      //             alert("err: " + JSON.stringify(err3));
      //             let errors = result.data.error.details.errors;
      //             setError({
      //               err0: "errors[0].message",
      //               err1: "errors[1]?.message",
      //               err2: "errors[2]?.message",
      //               err3: "errors[3]?.message",
      //               err4: "errors[4]?.message",
      //             });
      //           });
      //       })
      //       .catch((err2) => alert(JSON.stringify(err2)));
      //   })
      //   .catch((err1) => alert(JSON.stringify(err1)));
    }

    //  specific errors
    else {
      if (selectedQueType.id == null) {
        err_0 = "Select Question Type First";
      }
      if (question.length < 3) {
        err_1 = "Too Short";
      }
      if (selectedQueContCategory.id == null) {
        err_2 = "Select content type category";
      }
      if (selectedQueConType.id == null) {
        err_3 = "Select content type";
      }
      if (content.length < 3) {
        err_4 = "Too Short";
      }
      if (selectedAnsContCategory.id == null) {
        err_5 = "Select content type category";
      }
      if (selectedAnsConType.id == null) {
        err_6 = "Select content type";
      }
      if (option1 == "" || option2 == "" || option3 == "" || option4 == "") {
        err_7 = "Must provide all 4 options";
      }
      setError({
        err0: err_0,
        err1: err_1,
        err2: err_2,
        err3: err_3,
        err4: err_4,
        err5: err_5,
        err6: err_6,
        err7: err_7,
      });
    }
  }

  //  question-type
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setQueTypes(data);
      }
    };
    if (Array.isArray(queTypeData) && queTypeData.length === 0) {
      fetch();
    }
  }, [queTypeData]);

  // content-type-category
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type-category");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypeCategories(data);
      }
    };
    if (Array.isArray(catagoriesData) && catagoriesData.length === 0) {
      fetch();
    }
  }, [catagoriesData]);

  // content-type
  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("content-type");
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            id: item.id,
            title: item.attributes.title,
          };
        });
        setConTypes(data);
      }
    };
    if (Array.isArray(conTypeData) && conTypeData.length === 0) {
      fetch();
    }
  }, [conTypeData]);

  return (
    <>
      <DialogHeader className="">
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Question
        </DialogTitle>
        <DialogDescription className="textNormal textSecondaryColor">
          Start from top to {useForEdit ? "update" : "add"} question
        </DialogDescription>
        <div className="overflow-y-scroll h-[430px] pr-4 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 py-2 text-black text-lg"
          >
            <p className="   text-lg text-blue-600">Set The Question</p>
            <div className="flex flex-col gap-1">
              <CustomSelect
                label={"Select Question Type"}
                value={selectedQueType}
                options={queTypeData}
                bg="wh"
                onChange={(value) =>
                  setSelectedQueType({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err0}</span>
            </div>
            <div className="flex flex-col ">
              <label className=" ">The Question</label>
              <CustomInput
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                ph="Question ?"
              />
              <span className="text-red-700">{error.err1}</span>
            </div>

            <p className="   text-lg text-blue-600">Set Question Content</p>
            <div className="flex flex-col gap-1">
              <CustomSelect
                bg="wh"
                label={"Content Type Categoy"}
                value={selectedQueContCategory}
                options={catagoriesData}
                onChange={(value) =>
                  setSelectedQueContCategory({
                    id: value.id,
                    title: value.title,
                  })
                }
              />
              <span className="text-red-700">{error.err2}</span>
            </div>
            <div className="flex flex-col gap-1">
              <CustomSelect
                label={"Content Type"}
                value={selectedQueConType}
                options={conTypeData}
                bg="wh"
                onChange={(value) =>
                  setSelectedQueConType({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err3}</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex justify-between">
                <span>Question content</span>
              </label>
              <CustomInput
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ph="Content"
              />
              <span className="text-red-700">{error.err4}</span>
            </div>
            <p className="   text-lg  text-blue-600">Set Answer options</p>

            <div className="flex flex-col gap-1">
              <CustomSelect
                bg="wh"
                label={"Content Type Categoy"}
                value={selectedAnsContCategory}
                options={catagoriesData}
                onChange={(value) =>
                  setSelectedAnsContCategory({
                    id: value.id,
                    title: value.title,
                  })
                }
              />
              <span className="text-red-700">{error.err5}</span>
            </div>
            <div className="flex flex-col gap-1">
              <CustomSelect
                label={"Content Type"}
                value={selectedAnsConType}
                options={conTypeData}
                bg="wh"
                onChange={(value) =>
                  setSelectedAnsConType({ id: value.id, title: value.title })
                }
              />
              <span className="text-red-700">{error.err6}</span>
            </div>

            <CustomInput
              label={1}
              type="text"
              value={ansOptions.option1}
              onChange={(e) =>
                setAnsOptions({ ...ansOptions, ...{ option1: e.target.value } })
              }
              ph="Content"
            />

            <div className="flex gap-1">
              <CustomInput
                label={2}
                type="text"
                value={ansOptions.option2}
                onChange={(e) =>
                  setAnsOptions({
                    ...ansOptions,
                    ...{ option2: e.target.value },
                  })
                }
                ph="Content"
              />
            </div>
            <div className="flex gap-1">
              <CustomInput
                label={3}
                type="text"
                value={ansOptions.option3}
                onChange={(e) =>
                  setAnsOptions({
                    ...ansOptions,
                    ...{ option3: e.target.value },
                  })
                }
                ph="Content"
              />
            </div>
            <div className="flex gap-1">
              <CustomInput
                label={4}
                type="text"
                value={ansOptions.option4}
                onChange={(e) =>
                  setAnsOptions({
                    ...ansOptions,
                    ...{ option4: e.target.value },
                  })
                }
                ph="Content"
              />
            </div>
            <span className="text-red-700 ">{error.err7}</span>

            <div className="sticky bottom-0 bg-white py-1 w-full ">
              <CustomButton
                txt={useForEdit ? "UPDATE" : "ADD"}
                type="submit"
                style="text-base w-full mt-2 font-semibold text-blue-800 bg-slate-100 leading-1"
              />
            </div>
          </form>
        </div>
      </DialogHeader>
    </>
  );
}
