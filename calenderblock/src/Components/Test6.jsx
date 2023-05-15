import React, { useState } from "react";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  const handleStart = () => {
    const newRecognition = new window.webkitSpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = "en-US";

    newRecognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript);
    };

    newRecognition.onend = () => {
      setRecognition(null);
    };

    setRecognition(newRecognition);
    newRecognition.start();
  };

  const handleStop = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      {recognition ? (
        <button onClick={handleStop}>Stop Recording</button>
      ) : (
        <button onClick={handleStart}>Start Recording</button>
      )}
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
