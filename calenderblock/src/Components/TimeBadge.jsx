import { Badge } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { context } from '../Context/Context'
import { useEffect } from 'react'
const TimeBadge = ({data}) => {

  let {light}=useContext(context)
  let [dotcolor,setdotcolor]=useState("green.500")
  

  function setcolor(){
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
        // if (timerSecond < 0) {
        //   setdotcolor("red.500")
        // }
        setdotcolor("green.500")
      } else if (
        new Date().getHours() * 60 + new Date().getMinutes() <
        data.hour * 60 + data.minute
      ) {
       
        setdotcolor("orange.400")
      } else {
        setdotcolor("red.500")
      }
    } else if (
      data.year >= new Date().getFullYear() &&
      data.month >= new Date().getMonth() + 1 &&
      data.date > new Date().getDate()
     
    ) {
      
      setdotcolor("orange.400")
    } else {
     
      setdotcolor("red.500")
    }
  }
  useEffect(()=>{
    
    setcolor()
  },[])


  return <Badge key={data._id}  color={light?"black":"white"} w="90px">   <CircleIcon color={`${dotcolor}`} />{` ${data.hour%12==0?"12":data.hour%12} : ${data.minute<10?`0${data.minute}`:data.minute} : ${data.meridian==1?"AM":"PM"}`}</Badge>
}

export default TimeBadge

const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )