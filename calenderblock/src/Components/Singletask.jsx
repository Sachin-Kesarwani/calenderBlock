import { Badge, Box, Spinner, Switch, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import TimeBadge from './TimeBadge'
import { context } from '../Context/Context'
import { useState } from 'react'
import axios from 'axios'
import Timer from './Timer'
import {GrFormClose} from "react-icons/gr";
const Singletask = ({getalltasks,data}) => {
  let {light}=useContext(context)
  let [end,setEnd]=useState(false)
  let [status,setStatus]=useState(data.status)
  let [process,setProcess]=useState(data.process)
  let [loadingProcess,setLoadingprocess]=useState(false)
  let [loadingStatus,setLoadingStatus]=useState(false)
  let [delLoading,setdelLoading]=useState(false)

    

  function handlestatus(id){
    setStatus(!status)
    setLoadingStatus(true)
    handleStatusProcess("status").then(()=>{
      setLoadingStatus(false)
    })
  }
  function handleprocess(id){
    setProcess(!process)
    setLoadingprocess(true)
    handleStatusProcess("process").then(()=>{
      setLoadingprocess(false)
    })
  }

  async function handleStatusProcess(key){
    
    let obj={
      process:`${key=="process"?!data.process:data.process}`,
      status:`${key=="status"?!data.status:data.status}`,
      task:data.task
    }
    let id=data._id
  
return await axios({
  url:`https://crazy-pink-crocodile.cyclic.app/tasks/update/${id}`,
  method:"patch",
 headers:{
  Authorization:`Bearer ${localStorage.getItem("calenderToken")}`
 },
 data:obj
}).then((res)=>{

getalltasks()
}).catch((error)=>{
  
})
  }


  async function delcalenderBlock(id){
    setdelLoading(true)
await axios({
  url:`https://crazy-pink-crocodile.cyclic.app/tasks/delete/${id}`,
  method:"delete",
 headers:{
  Authorization:`Bearer ${localStorage.getItem("calenderToken")}`
 },
}).then((res)=>{
  setdelLoading(false)
  getalltasks()
}).then((er)=>{

})
  }
  useEffect(()=>{
    let start = data.hour * 60 + data.minute;
    let current =
      Number(new Date().getHours() * 60) + Number(new Date().getMinutes());
    let endtime = start + data.durationH * 60 + data.durationM;

    // function getDaysInMonth(year, month) {
    //   return new Date(year, month, 0).getDate();
    // }
    // const daysInmonthPrev = getDaysInMonth(data.year, data.month);
    // console.log(daysInSeptember); 
    if(current>endtime){
     setEnd(true)
     }
  },[])
 
  return (
    <div key={data._id} style={{marginTop:"10px"}}>
 
       <Box margin={"auto"} bg={light?"white":"black"} h={"200px"} boxShadow={" rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"} borderRadius={"5px"} padding={"10px"} w={"300px"}>
    <Timer key={data._id} data={data} delLoading={delLoading} delcalenderBlock={delcalenderBlock} />
     <Text  color={light?"black":"white"} textAlign={"left"}><b>Task</b> : {data.task} </Text>
     <Text  color={light?"black":"white"} textAlign={"left"}><b> Process </b>: {data.process?"Started":"Not Started"}  &nbsp; {loadingProcess?<Spinner size='xs' />:<Switch colorScheme="blue" bg={"black"} borderRadius={"20px"} isChecked={process}  onChange={()=>handleprocess(data._id)}  size='sm'/>}</Text>
     <Text  color={light?"black":"white"} textAlign={"left"}><b> Status </b>: {data.status?"Completed":"Not Completed"} &nbsp; {loadingStatus?<Spinner size='xs' />:<Switch colorScheme="blue" bg={"black"} borderRadius={"20px"} isChecked={status} onChange={()=>handlestatus(data._id)}  size='sm'/>}</Text>
    
     <Text   color={light?"black":"white"} textAlign={"left"}><b>Duration : </b> <Badge  color={light?"black":"black"} bg={"gray.300"}>{data.durationH||data.durationM?` You Decided ${data.durationH}h : ${data.durationM?data.durationM:"0"}m`:"Not Decided"}</Badge></Text>
     <Text  color={light?"black":"white"} textAlign={"left"}><b>Importance</b> : <Badge color={"white"} bg={data.importance==1?"red.400":data.importance==2?"orange.300":"green.300"} > {data.importance==1?"Very Important":data.importance==2?"Moderate":"Low"}</Badge></Text>
     <Text   color={light?"black":"white"} textAlign={"left"}><b>Decided Time : </b><TimeBadge key={data._id} data={data}/></Text>
     {/* {
      data.status==false&&end==true&& <Badge  color="white" margin={"auto"} w="90px" bg={"green.500"} p={1}m={3}>Reshedule</Badge>
     }
       */}
      </Box>
    </div>
  )
}

export default Singletask
