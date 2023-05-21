import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    let newRecognition;

    const handleStart = () => {
      newRecognition = new window.webkitSpeechRecognition();
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

        if (finalTranscript) {
          newRecognition.stop();
        }
      };

      newRecognition.onend = () => {
        setRecognition(null);
      };

      setRecognition(newRecognition);
      newRecognition.start();
    };

    handleStart();

    return () => {
      if (newRecognition) {
        newRecognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [transcript]);

  const handleStop = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      {recognition ? (
        <Button onClick={handleStop} disabled={isSpeaking}>
          Stop Recording
        </Button>
      ) : (
        <Button onClick={() => setRecognition(new window.webkitSpeechRecognition())} disabled={isSpeaking}>
          Start Recording
        </Button>
      )}
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
