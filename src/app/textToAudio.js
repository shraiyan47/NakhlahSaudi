import React, { useRef, useState } from 'react';

function TextToAudio(param) {
  const speechSynthesis = window.speechSynthesis;
  const textInputRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if (speechSynthesis.speaking) {
      return;
    }
    const text = param.audioData;
    const utterance = new SpeechSynthesisUtterance(text);
    // Customize voice, rate, and other options as needed
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div>
      {/* <input type="text" ref={textInputRef} placeholder="Enter text to speak" /> */}
      <button onClick={speak} disabled={isPlaying}>
        {isPlaying ? 'Stop Speaking' : 'Speak'}
      </button>
    </div>
  );
}

export default TextToAudio;