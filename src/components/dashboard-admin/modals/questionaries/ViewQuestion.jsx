import React, { useEffect, useState } from "react";
import { Volume1Icon } from "lucide-react";
import { getWithUrl } from "@/lib/requestHandler";

const ViewQuestion = ({ rowData }) => {
  const { level, task, lesson, question_type, question, content } = rowData;
  console.log(question_type);
  const [text, setText] = useState(question?.title || "");
  const [speaking, setSpeaking] = useState(false);
  const [questionContentOptions, setQuestionContentOptions] = useState([]);
  const synth = window.speechSynthesis;
  console.log(questionContentOptions);
  const speakText = () => {
    if (synth.speaking) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
    };

    synth.speak(utterance);
  };

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

  return (
    <div className="max-w-md mx-auto mt-4">
      {/* Part 1: Level, Unit, Lesson */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2"> Learning Lesson</h2>
        <div className="flex flex-wrap">
          <div className="w-full mb-2">
            <span className="font-bold text-lg mr-2">Level:</span>
            <span className="text-lg">{level?.title}</span>
          </div>
          <div className="w-full mb-2">
            <span className="font-bold text-lg mr-2">Unit:</span>
            <span className="text-lg">{task?.title}</span>
          </div>
          <div className="w-full mb-2">
            <span className="font-bold text-lg mr-2">Lesson:</span>
            <span className="text-lg">{lesson?.title}</span>
          </div>
        </div>
      </div>

      {/* Part 2: Question Type, Question */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2">Question</h2>
        <div className="flex flex-wrap">
          <div className="w-full mb-2">
            <span className="font-bold text-lg mr-2">Question Type:</span>
            <span className="text-lg">{question_type?.title}</span>
          </div>
          <div className="w-full mb-2">
            <span className="font-bold text-lg mr-2">Question:</span>
            <span className="text-lg">{question?.title}</span>
          </div>
          <button
            onClick={speakText}
            disabled={text.trim() === "" || speaking}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Speak <Volume1Icon className="inline-block ml-1 w-6 h-6" />
          </button>
        </div>
      </div>
      {(question_type?.title == "MCQ" || question_type?.title == "Fill In The Blank") && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-2xl font-bold mb-2">Question Options</h2>
            <div className="flex flex-wrap">
              {/* Display question options here */}
              {questionContentOptions.map((option, index) => (
                <div key={index} className="w-full mb-2">
                  <span className="font-bold text-lg mr-2">
                    Option {index + 1}:
                  </span>
                  <span className="text-lg">{option?.attributes?.title}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Part 3: Question Correct Answer */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">Answer</h2>
            <div className="flex flex-wrap">
              <div className="w-full">
                <span className="font-bold text-lg mr-2">Correct Answer:</span>
                <span className="text-lg">{content?.title}</span>
              </div>
            </div>
          </div>
        </>
      )}
      {
        question_type?.title == "True Or False" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">Answer</h2>
            <div className="flex flex-wrap">
              <div className="w-full">
                <span className="font-bold text-lg mr-2">Correct Answer:</span>
                <span className="text-lg">{content?.title}</span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ViewQuestion;
