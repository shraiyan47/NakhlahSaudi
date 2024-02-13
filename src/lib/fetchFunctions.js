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

    console.log("renderable", arr)
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
      icon: item.attributes.icon?.data?.attributes?.formats?.small?.url,
    };
  });
}

export function renderableLearnerLevel(arr) {
  return arr.map((item) => {
    return {
      id: item.id,
      level: item.attributes.level,
      icon: item.attributes.icon?.data?.attributes?.formats?.small?.url,
    };
  });
}

// ---------------------------------------- LEARNING LESSON

export function renderableLearningLevels(arr) {
  const renderable = arr.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
    };
  });
  return renderable;
}

export function renderableTasks(arr) {
  return arr.map((item) => {
    // alert("item: " + JSON.stringify(item));
    const { learning_journey } = item.attributes;
    return {
      id: item.id,
      title: item.attributes.title,
      learning_journey: {
        id: learning_journey.data.id,
        title: learning_journey.data.attributes.title,
      },
    };
  });
}

export function renderableTaskUnits(arr) {
  return arr.map((item) => {
    const { learning_journey_unit } = item.attributes;
    const { learning_journey } = learning_journey_unit.data.attributes;
    return {
      id: item.id,
      title: item.attributes.title,
      learning_journey_unit: {
        id: learning_journey_unit.data.id,
        title: learning_journey_unit.data.attributes.title,
        learning_journey: {
          id: learning_journey.data.id,
          title: learning_journey.data.attributes.title,
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
  return arr.map((item) => {
    return {
      id: item.id,
      questionsTitle: item.attributes.question,
      questionsAudio: item.attributes.audio,
      icon: item.attributes.image?.data?.attributes?.formats?.small?.url,
    };
  });
}

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
    const { question } = item.attributes?.question_content?.data?.attributes;
    const content = item.attributes?.question_content?.data?.attributes?.content?.data?.attributes?.title;
    const contentAudio = item.attributes?.question_content?.data?.attributes?.content?.data?.attributes?.audio;
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
    return {
      id: item.id,
      question: question.data?.attributes?.question,
      content,
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
 
    return {
      id: item.id,
      audio: item.attributes?.audio,
      title: item.attributes?.title,
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
