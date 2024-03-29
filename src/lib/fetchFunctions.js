// export async function fetchQueTypes() {
//   const response = await getHandler("question-type");
//   console.log(response.data);
//   if (response.status === 200) {
//     const data = response.data.data.map((item) => {
//       return {
//         id: item.id,
//         title: item.attributes.title,
//       };
//     });
//     setQueTypes(data);
//   }
// }
//

// ---------------------------------------- LEARNING JOURNEY

export function renderableGoals(arr) {
  const renderable = arr.map((item) => {
    console.log("renderable", arr);
    return {
      id: item.id,
      time: item.attributes?.time,
      icon: item.attributes.icon?.data?.attributes?.url,
    };
  });
  return renderable;
}

export function renderablePurpose(arr) {
  const renderable = arr.map((item) => {
    return {
      id: item.id,
      purpose: item.attributes.purpose,
      icon: item.attributes.icon?.data?.attributes?.formats?.thumbnail?.url,
    };
  });
  return renderable;
}

export function renderableStartPoint(arr) {
  return arr.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      subtitle: item.attributes.subtitle,
      icon: item.attributes.icon?.data?.attributes?.url,
    };
  });
}

export function renderableLearnerLevel(arr) {
  return arr.map((item) => {
    return {
      id: item.id,
      level: item.attributes.title,
      icon: item.attributes.icon?.data?.attributes?.url,
    };
  });
}

// ---------------------------------------- LEARNING LESSON

export function renderableLearningLevels(arr) {
  const renderable = arr.map((item) => {
    return {
      id: item?.id,
      title: item?.attributes?.title,
    };
  });
  return renderable;
}

export function renderableTasks(arr) {
  return arr.map((item) => {
    // //alert("item: " + JSON.stringify(item));
    const { learning_journey } = item.attributes;
    return {
      id: item.id,
      title: item.attributes.title,
      learning_journey: {
        id: learning_journey.data?.id,
        title: learning_journey.data?.attributes.title,
      },
    };
  });
}

export function renderableTaskUnits(arr) {
  return arr.map((item) => {
    const { learning_journey_unit } = item?.attributes;
    const { learning_journey } = learning_journey_unit?.data?.attributes;
    return {
      id: item?.id,
      title: item?.attributes?.title,
      learning_journey_unit: {
        id: learning_journey_unit?.data?.id,
        title: learning_journey_unit?.data?.attributes?.title,
        learning_journey: {
          id: learning_journey?.data?.id,
          title: learning_journey?.data?.attributes?.title,
        },
      },
    };
  });
}

export function renderableLessons(arr) {
  return arr
    ?.filter((theData) => {
      return theData != null;
    })
    .map((item) => {
      const learning_journey_level = item?.attributes?.learning_journey_level;

      const learning_journey_unit =
        learning_journey_level?.data?.attributes?.learning_journey_unit;
      const learning_journey =
        learning_journey_unit?.data?.attributes?.learning_journey;

      return {
        id: item.id,
        title: item.attributes?.title,
        learning_journey_level: {
          id: learning_journey_level?.data?.id,
          title: learning_journey_level?.data?.attributes?.title,
          learning_journey_unit: {
            id: learning_journey_unit?.data?.id,
            title: learning_journey_unit?.data?.attributes?.title,
            learning_journey: {
              id: learning_journey?.data?.id,
              title: learning_journey?.data?.attributes?.title,
            },
          },
        },
      };
    });
}

// ---------------------------------------- QUESTIONARIES

export function renderableQuestionTitle(arr) {
  const data = arr.data;
  console.log(" F F => ", data)
  return data.map((item) => {
    return {
      id: item.id,
      questionsTitle: item.attributes.question,
    };
  });
}

const x = {
  id: 142,
  attributes: {
    createdAt: "2024-03-12T06:19:26.774Z",
    updatedAt: "2024-03-12T06:19:26.774Z",
    question: {
      data: {
        id: 165,
        attributes: {
          question: "Select Similar Word",
          createdAt: "2024-03-12T06:09:05.428Z",
          updatedAt: "2024-03-12T06:09:05.428Z",
        },
      },
    },
    content: {
      data: {
        id: 164,
        attributes: {
          title: "Pen",
          createdAt: "2024-03-11T07:38:30.478Z",
          updatedAt: "2024-03-11T07:38:30.478Z",
        },
      },
    },
    question_type: {
      data: {
        id: 17,
        attributes: {
          title: "Pair Matching",
          createdAt: "2024-01-10T12:35:19.896Z",
          updatedAt: "2024-02-06T03:45:39.067Z",
        },
      },
    },
  },
};

export function renderableQuestionContent(arr) {
  const data = arr.data;
  return data.map((item) => {
    return {
      id: item.id,
      questionsTitle: item?.attributes?.question?.data?.attributes?.question,
      questionsContent: item?.attributes?.content?.data?.attributes?.title,
      questionsType: item?.attributes?.question_type?.data?.attributes?.title,
      // totalData: item.meta.pagination.total
    };
  });
}

// -----------------------------------------content files

export function renderableQueType(arr) {
  return arr.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
    };
  });
}

export function renderableQuetions(arr) {
  return arr.map((item) => {
    console.log(item);
    const { question } = item.attributes?.question_content?.data?.attributes;
    // const content = item.attributes?.question_content?.data?.attributes?.content?.data?.attributes?.title;
    const question_content = item.attributes?.question_content?.data;
    const content =
      item.attributes?.question_content?.data?.attributes?.content?.data;
    const contentAudio =
      item.attributes?.question_content?.data?.attributes?.content?.data
        ?.attributes?.audio;
    const { question_type } =
      item.attributes?.question_content?.data?.attributes;
    const learning_journey_lesson = item?.attributes?.learning_journey_lesson;
    const learning_journey_level =
      learning_journey_lesson?.data?.attributes?.learning_journey_level;
    const learning_journey_unit =
      learning_journey_level?.data?.attributes?.learning_journey_unit;
    const learning_journey =
      learning_journey_unit?.data?.attributes?.learning_journey;
    //
    console.log(question_content);
    return {
      id: item.id,
      question: {
        id: question.data?.id,
        title: question.data?.attributes?.question,
      },
      content: {
        id: content?.id,
        title: content?.attributes?.title,
      },
      question_content: question_content?.id,
      contentAudio,
      audio: question.data?.attributes?.audio,
      question_type: {
        id: question_type?.data?.id,
        title: question_type?.data?.attributes?.title,
      },
      lesson: {
        id: learning_journey_lesson?.data?.id,
        title: learning_journey_lesson?.data?.attributes.title,
      },
      task_unit: {
        id: learning_journey_level?.data?.id,
        title: learning_journey_level?.data?.attributes?.title,
      },
      task: {
        id: learning_journey_unit?.data?.id,
        title: learning_journey_unit?.data?.attributes?.title,
      },
      level: {
        id: learning_journey?.data?.id,
        title: learning_journey?.data?.attributes?.title,
      },
    };
  });
}

export function renderableContents(arr) {
  const renderable = arr?.map((item) => {
    console.log("arr", arr)
    return {
      id: item.id,
      audio: item.attributes?.audio,
      title: item.attributes?.title,
      language: {
        id: item.attributes?.language?.data?.id,
        title: item.attributes?.language?.data?.attributes?.name,
      },
      content_type: {
        id: item.attributes?.content_type?.data?.id,
        title: item.attributes?.content_type?.data?.attributes?.title,
      },
      content_type_category: {
        id: item.attributes?.content_type_category?.data?.id,
        title: item.attributes?.content_type_category?.data?.attributes?.title,
      },
      icon: item.attributes?.image?.data?.attributes?.url,
    };
  });
  return renderable;
}

export function renderableContentDetails(arr) {
  const renderable = arr?.map((item) => {
    console.log("fetchfuction", arr);
    return {
      id: item.id,
      title: item.attributes?.title,
      language: {
        id: item.attributes?.language?.data?.id,
        title: item.attributes?.language?.data?.attributes?.name,
      },
      content: {
        id: item.attributes?.content?.data?.id,
        title: item.attributes?.content?.data?.attributes?.title,
      },
      contentAudio: item.attributes?.audio,
      icon: item.attributes.image?.data?.attributes?.url,
      // totalData: item.meta.pagination.total
    };
  });

  console.log("fetchfuntion", renderable);
  return renderable;
}

// export function renderableQuestionContent(arr) {
//   return arr?.map((item) => {
//     return {
//       id: item.id,
//       title: item.attributes?.question?.data?.attributes?.question,
//     };
//   });
// }

export function renderableQuestion(arr) {
  return arr?.map((item) => {
    return {
      id: item.id,
      title: item.attributes?.question,
    };
  });
}
export function renderableLanguage(arr) {
  const renderable = arr?.map((item) => {
    console.log("fetchfuction", arr);
    return {
      id: item.id,
      title: item.attributes?.name,
      country: item.attributes?.country,

      // totalData: item.meta.pagination.total
    };
  });

  console.log("fetchfuntion", renderable);
  return renderable;
}

export function renderableContentDetailsByLanguage(arr) {
  const renderable = arr?.map((item) => {
    console.log("fetchfuction", arr);
    return {
      id: item.id,
      title: item.attributes?.title,
      content: {
        id: item.attributes?.content?.data?.id,
        title: item.attributes?.content?.data?.attributes?.title,
      },
      language: {
        id: item.attributes?.language?.data?.id,
        title: item.attributes?.language?.data?.attributes?.name,
      },

      // totalData: item.meta.pagination.total
    };
  });

  console.log("fetchfuntion", renderable);
  return renderable;
}
export function renderableDetailsOfContentDetailsByLanguage(arr) {
  const renderable = arr?.map((item) => {
    console.log("fetchfuction", arr);
    return {
      id: item.id,
      title: item.attributes?.title,
      audio: item.attributes?.audio,
      content_details_by_language: {
        id: item.attributes?.content_details_by_language?.data?.id,
        title:
          item.attributes?.content_details_by_language?.data?.attributes?.title,
      },
      icon: item.attributes.image?.data?.attributes?.url,

      // totalData: item.meta.pagination.total
    };
  });

  console.log("fetchfuntion", renderable);
  return renderable;
}
export function renderableContentByClause(arr) {
  const renderable = arr?.map((item) => {
    console.log("fetchfuction", arr);
    return {
      id: item.id,
      title: item.attributes?.title,
      sequence: item.attributes?.sequence,
      content: {
        id: item.attributes?.contents?.data[0]?.id,
        title: item.attributes?.contents?.data[0]?.attributes?.title,
      },
      language: {
        id: item.attributes?.language?.data?.id,
        title: item.attributes?.language?.data?.attributes?.name,
      },
      content_details_by_language: {
        id: item.attributes?.content_details_by_language?.data?.id,
        title:
          item.attributes?.content_details_by_language?.data?.attributes?.title,
      },

      // totalData: item.meta.pagination.total
    };
  });

  console.log("fetchfuntion", renderable);
  return renderable;
}
export function renderableContentBySyllable(arr) {
  const renderable = arr?.map((item) => {
    console.log("fetchfuction", arr);
    return {
      id: item.id,
      title: item.attributes?.title,
      sequence: item.attributes?.sequence,
      content: {
        id: item.attributes?.contents?.data[0]?.id,
        title: item.attributes?.contents?.data[0]?.attributes?.title,
      },
      language: {
        id: item.attributes?.language?.data?.id,
        title: item.attributes?.language?.data?.attributes?.name,
      },
      content_details_by_language: {
        id: item.attributes?.content_details_by_language?.data?.id,
        title:
          item.attributes?.content_details_by_language?.data?.attributes?.title,
      },

      // totalData: item.meta.pagination.total
    };
  });

  console.log("fetchfuntion", renderable);
  return renderable;
}
export function renderableContTypes(arr) {
  return arr?.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
    };
  });
}

export function renderableContTypeCategories(arr) {
  return arr?.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
    };
  });
}
