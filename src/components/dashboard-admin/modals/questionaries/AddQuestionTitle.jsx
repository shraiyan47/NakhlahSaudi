//"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useQuestionTitle,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState } from "react";
import CustomButton from "@/components/ui-custom/CustomButton";
import CustomInput from "@/components/ui-custom/CustomInput";
import { BASE_URL, config, postMap, putMap } from "@/lib/requestHandler";
import Image from "next/image";
import TextToAudio from "@/app/textToAudio";
import ArabicSpeechResponsiveVoice from "@/app/ArabicResponsiveVoice.js";
import ReactSpeechKit from "@/app/reactSpeechKit";
import * as googleTTS from 'google-tts-api';

export default function AddQuestionTitle({ rowData, useForEdit }) {
  //
  const { toast } = useToast();

  const addEdit = useQuestionTitle((state) => state.addEdit);
  const afterAdd = useQuestionTitle((state) => state.afterAdd);
  const afterUpdate = useQuestionTitle((state) => state.afterUpdate);
  const [questionTitle, setQuestionTitle] = useState(useForEdit ? rowData.questionsTitle : "");
  const [questionAudio, setQuestionAudio] = useState(useForEdit ? rowData.questionsAudio : "");
  const [error, setError] = useState({
    err0: "",
    err1: "",
  });

  const [image, setImage] = useState(
    useForEdit ? BASE_URL + rowData.icon : null
  );

    googleTTS
    .getAllAudioBase64("لِنَذْهَبْ إِلَى السِّيْنَمَا", {
      lang: 'ar',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
      splitPunct: ',.?',
    })
    .then((base64String) => {
      console.log("base 64 String ======>",base64String)
      const decodedData = atob(base64String) // Decode base64 string
      const buffer = new Uint8Array(decodedData.length)
      for (let i = 0; i < decodedData.length; i++) {
        buffer[i] = decodedData.charCodeAt(i)
      }
      const blob = new Blob([buffer], { type: "audio/mpeg" }) // Create a Blob object representing the audio data
      const audioURL = URL.createObjectURL(blob) // Generate a URL for the Blob object
      console.log("audio URL ------> ", audioURL)
      const audio = new Audio(audioURL) // Create a new Audio object using the generated URL
      audio.play() // Play the audio
    })
    .catch(console.error);

  async function handleSubmit(e) {
    e.preventDefault();
    if (questionTitle.length < 3) {
      setError({ ...error, err0: "Too Short" });
    } else if (questionAudio.length < 3) {
      setError({ ...error, err1: "Too Short" });
    } else {
      let formData = new FormData();
      var questionTitleInput = document.getElementById("inputQuestionTitle");
      var questionAudioInput = document.getElementById("idInputQuestionAudio");
      var fileInput = document.getElementById("idInputFile");

      var file = fileInput.files[0];
      formData.append("files.image", file);

      formData.append(
        "data",
        `{"question":"${questionTitleInput.value}", "audio": "${questionAudioInput.value}"}`
      );

      console.log("Question Add : ",formData)

      await fetch(
        useForEdit
          ? putMap["QuestionsTitleFull"] + `/${rowData.id}?populate=*`
          : postMap["QuestionsTitleFull"],
        {
          method: useForEdit ? "PUT" : "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer " +
              "5cb5acf4b96532cdad0e30d900772f5c8b5532d2dbf06e04483a3705c725ffbbdba593340718423a5975e86aa47ca1749de402ec9f3127648dbcec37b190107ba975e669811b2a2f4c8b41c27472d6fdb70e7b0be4f8490c57a406e29aedf47dd05dadb7171788ba9fa2af106d93b4f92423b8e194131891e712857b52e8ceef",
          },
          redirect: "follow",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          alert(JSON.stringify(data));
          let renderable = {
            id: data.data.id,
            questionsTitle: title,
            questionAudio: questionAudio,
            icon: data.data.attributes.icon?.data?.attributes?.formats?.small
              ?.url,
          };

          useForEdit ? afterUpdate(renderable) : afterAdd(renderable);
          toast({
            title: useForEdit ? "Successfully Updated" : "Successfully Added",
          });
          document.getElementById("closeDialog")?.click();
        })
        .catch((error) => {
          alert("err: " + JSON.stringify(error));
          setError(JSON.stringify(error));
        });


    }
  }

  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col ">
            <label>Question Title</label>
            <CustomInput
              id="inputQuestionTitle"
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              ph="Enter Question Title"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error.err0}</span>
          </div>
          <div className="flex flex-col ">
            <label>Audio of Question</label>
            <CustomInput
              id="idInputQuestionAudio"
              type="text"
              value={questionAudio}
              onChange={(e) => setQuestionAudio(e.target.value)}
              ph="Enter Audio Text"
              style="py-0.25 px-1"
            />
            <label>Alif Baa Taa Saa Jim Ha Kha Daal Zaal</label>
            {/* <TextToAudio audioData={questionAudio} /> */}
            <ArabicSpeechResponsiveVoice  audioData={questionAudio} />
            {/* <ReactSpeechKit /> */}
            <span className="text-red-700">{error.err1}</span>
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
              <Image
                alt=" image"
                src={image}
                className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
                width={50}
                height={50}
              />
            )}
          </div>
          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>
      </DialogHeader>
    </>
  );
}
