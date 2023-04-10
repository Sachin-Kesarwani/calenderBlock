import { Badge } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { context } from '../Context/Context'
import { useEffect } from 'react'
const TimeBadge = ({data}) => {

  let {light}=useContext(context)
  let [dotcolor,setdotcolor]=useState("green.500")
  
  useEffect(()=>{
  
     if(data.hour+data.durationH<=new Date().getHours()&&data.minute+data.durationM<=new Date().getMinutes()){
      setdotcolor("red.500")
     }
  },[])

console.log(dotcolor)
  return <Badge  color={light?"black":"white"} w="90px"> <CircleIcon color={dotcolor}/> {` ${data.hour%12} : ${data.minute<10?`0${data.minute}`:data.minute} : ${data.meridian==1?"AM":"PM"}`}</Badge>
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