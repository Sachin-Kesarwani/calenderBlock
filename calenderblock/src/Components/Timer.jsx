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
    data.durationM * 60
  let removeTime =
    new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60+new Date().getSeconds();


  let secondsintimer = totaltime - removeTime;
  let start = data.hour * 60 + data.minute;
  let current =Number(new Date().getHours() * 60) + Number(new Date().getMinutes());
  let end = start + data.durationH * 60 + data.durationM;

   let currentTotalsecond=new Date().getHours()*60*60+new Date().getMinutes()*60+new Date().getSeconds()
   let tasktimeInsecond=data.hour*60*60+data.minute*60
  
  let [timerSecond, setTimersecond] = useState(secondsintimer );
  let [waittimer,setwaitTimer]=useState(tasktimeInsecond-currentTotalsecond)
  let [started, setStarted] = useState(false);
  let [waitStarted,setWaitstarted]=useState(false)

  let { light } = useContext(context);
     
  

  function gettime() {
   // console.log("inside timer",data.task)
    if (
      data.year == new Date().getFullYear() &&
      data.month === new Date().getMonth() + 1 &&
      data.date == new Date().getDate()
    ) {
      


   if (current >= start && current < end) {
    console.log("45")
      //  if( currentTotalsecond>=tasktimeInsecond&&currentTotalsecond<totaltime){
        if (timerSecond < 0) {
          return false;
        }
        return true;
      } else if (
        new Date().getHours() * 60 + new Date().getMinutes() <
        data.hour * 60 + data.minute
      ) {
     
     
         if(waittimer<=3600&&waittimer>=0){
          setfuture(true);
          console.log("inside time")
          let wait=setInterval(()=>{
            setWaitstarted(true)
             setwaitTimer((prev)=>{
              if(prev==0){
                clearInterval(wait)
                setfuture(false)
                setStarted(true)
                setWaitstarted(false)
                setTimersecond(Math.floor(secondsintimer/60)*60)
                return 0
              
              }
              return prev-1
             })
          },1000)
         
         }else{
          setfuture(true)
         }
      } else {
        console.log("77")
        setStatus(false);
      }
    } else if (
      data.year >= new Date().getFullYear() &&
      data.month >= new Date().getMonth() + 1 &&
      data.date > new Date().getDate()
     
    ) {
   
      setfuture(true);
      //  setStarted(true)
    } else {
     
      setStatus(false);
    }
  }
 
  useEffect(() => {
   
    if (gettime()) {
      let timer = setInterval(() => {
      setTimersecond((prev) => {
          if (prev == 0) {
            setStatus(false);
            clearInterval(timer)
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

  }, [started]);

  const hours = Math.floor(timerSecond / 3600);
  const minutes = Math.floor((timerSecond % 3600) / 60);
  const seconds = timerSecond % 60;

  const waithours = Math.floor(waittimer/ 3600);
  const waitminutes = Math.floor((waittimer % 3600) / 60);
  const waitseconds = waittimer % 60;
//console.log(hours,minutes,seconds)
// console.log(waittimer,started,data.task)
// console.log(future,status,started)
  return (
    <div key={data._id} style={{ display: "flex", justifyContent: "space-between" }}>
      {future == true ? (
        <Badge marginLeft={`${waitStarted?"80px":"160px"}`} color={light ? "black" : "white"}>
          <CircleIcon color={`orange`} /> {waitStarted?`Starting after ${waithours} : ${waitminutes<10?`0${waitminutes}`:`${waitminutes}`} :  ${waitseconds<10?`0${waitseconds}`:`${waitseconds}`}  `:"Not Stared"}
        </Badge>
      ) : status == false ? (
        <Badge marginLeft={"200px"}>
          {" "}
          <CircleIcon color={`red`} />
          Ended
        </Badge>
      ) : (
        <Badge marginLeft={"185px"}>
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
