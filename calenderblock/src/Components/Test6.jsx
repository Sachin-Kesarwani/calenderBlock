import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {BsFillMicFill,BsFillMicMuteFill } from "react-icons/bs";
const SpeechToText = ({setdata,data, setDisable}) => {
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
      if(finalTranscript.length>=5){
        setDisable(false)
      }else{
        setDisable(true)
      }
     setdata({...data,task:finalTranscript})
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
      {/* {recognition ? (
        <Button onClick={handleStop}>Stop Recording</Button>
      ) : (
        <Button onClick={handleStart}>Start Recording</Button>
      )} */}
       {recognition ? (
        <Button bg={"white"}  borderRadius={"0px 20px 20px 0px"} onClick={handleStop}><BsFillMicFill/></Button>
      ) : (
        <Button bg={"white"}  borderRadius={"0px 20px 20px 0px"}  onClick={handleStart}><BsFillMicMuteFill/></Button>
      )}
      {/* <p>{transcript}</p> */}
    </div>
  );
};

export default SpeechToText;
