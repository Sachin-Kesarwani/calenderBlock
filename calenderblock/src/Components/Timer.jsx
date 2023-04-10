import { CheckCircleIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Icon } from '@chakra-ui/react'
import { context } from "../Context/Context";
const Timer = ({ data }) => {
  
  let [status,setStatus]=useState(true)
  let [future,setfuture]=useState(false)
  let totaltime=((data.hour*60*60)+(data.minute*60)+(data.durationH*60*60)+(data.durationM*60))
  let removeTime=new Date().getHours()*60*60+new Date().getMinutes()*60
  let secondsintimer=totaltime-removeTime
 
  let [timerSecond,setTimersecond]=useState(secondsintimer)
  let [started,setStarted]=useState(false)
  let {light}=useContext(context)
  function gettime() {
  
    if (
      data.year == new Date().getFullYear() &&
      data.month === new Date().getMonth()+1 &&
      data.date== new Date().getDate()
     
    ){
      
        if( data.hour <= new Date().getHours() &&
        (data.hour * 60 + data.minute+data.durationH*60+data.durationM) >
          new Date().getHours() * 60 + new Date().getMinutes()){
           if(timerSecond<0){
            return false
           }
          return true
         
        }else  if( new Date().getHours() < data.hour ){
          
          setfuture(true)
        }else{
          
           setStatus(false)
        }
      
    }else if(  data.year >= new Date().getFullYear() &&
    data.month >= new Date().getMonth()+1 &&
    data.date> new Date().getDate()){
        setfuture(true)
    }else{
setStatus(false)

    }
     
  }
  useEffect(() => {
   
    if( gettime()){
      let timer= setInterval(() => {

            setTimersecond((prev)=>{
                if(prev==1){
                    setStatus(false)
                    return 0
                   
                }
              return  prev-1
            })

          
        }, 1000);

     
    }


  }, []);

  const hours = Math.floor(timerSecond/ 3600);
  const minutes = Math.floor((timerSecond% 3600) / 60);
  const seconds = timerSecond% 60;

 
  return future==true? <Badge marginLeft={"160px"}  color={light?"black":"white"} ><CircleIcon color={`orange`}/> Not Started</Badge >:status==false?<Badge marginLeft={"160px"}> <CircleIcon color={`red`}/>Ended</Badge>:
    <Badge marginLeft={"160px"}><CircleIcon color={`green.500`}/> {hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</Badge>
 
  
};

export default Timer;



const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )

