import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { Badge, Spinner, Tooltip } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import { context } from "../Context/Context";
import { GrFormClose } from "react-icons/gr";
const Timer = ({ data ,delLoading , delcalenderBlock}) => {
  let [status, setStatus] = useState(true);
  let [future, setfuture] = useState(false);
  let totaltime =
    data.hour * 60 * 60 +
    data.minute * 60 +
    data.durationH * 60 * 60 +
    data.durationM * 60+data.durationS;
  let removeTime =
    new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60;
  let secondsintimer = totaltime - removeTime;

  let [timerSecond, setTimersecond] = useState(secondsintimer);
  let [started, setStarted] = useState(false);
  let { light } = useContext(context);
  function gettime() {
   // console.log("inside timer",data.task)
    if (
      data.year == new Date().getFullYear() &&
      data.month === new Date().getMonth() + 1 &&
      data.date == new Date().getDate()
    ) {
      
      let start = data.hour * 60 + data.minute;
      let current =
        Number(new Date().getHours() * 60) + Number(new Date().getMinutes());
      let end = start + data.durationH * 60 + data.durationM;

      if (current >= start && current < end) {
        if (timerSecond < 0) {
          return false;
        }
        return true;
      } else if (
        new Date().getHours() * 60 + new Date().getMinutes() <
        data.hour * 60 + data.minute
      ) {
       
        setfuture(true);
      } else {
        setStatus(false);
      }
    } else if (
      data.year >= new Date().getFullYear() &&
      data.month >= new Date().getMonth() + 1 &&
      data.date > new Date().getDate()
     
    ) {
      
      setfuture(true);
    } else {
     
      setStatus(false);
    }
  }
  useEffect(() => {
   
    if (gettime()) {
      let timer = setInterval(() => {
      setTimersecond((prev) => {
          if (prev == 1) {
            setStatus(false);
            clearInterval(timer)
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  
  }, []);

  const hours = Math.floor(timerSecond / 3600);
  const minutes = Math.floor((timerSecond % 3600) / 60);
  const seconds = timerSecond % 60;

  return (
    <div key={data._id} style={{ display: "flex", justifyContent: "space-between" }}>
      {future == true ? (
        <Badge marginLeft={"150px"} color={light ? "black" : "white"}>
          <CircleIcon color={`orange`} /> Not Started
        </Badge>
      ) : status == false ? (
        <Badge marginLeft={"195px"}>
          {" "}
          <CircleIcon color={`red`} />
          Ended
        </Badge>
      ) : (
        <Badge marginLeft={"180px"}>
          <CircleIcon color={`green.500`} /> {hours} :{" "}
          {minutes < 10 ? `0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </Badge>
      )}
      {
        delLoading?<Spinner size='xs' />:  <Icon as={CloseIcon} onClick={()=>delcalenderBlock(data._id)} style={{ color: `${light?"black":"white"}`,cursor:"pointer"}}   fontSize={"10px"} />
      }
    
    </div>
  );
};

export default Timer;

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);
