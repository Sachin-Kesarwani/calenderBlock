import { Badge, Box, Spinner, Switch, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import TimeBadge from './TimeBadge'
import { context } from '../Context/Context'
import { useState } from 'react'
import axios from 'axios'
import Timer from './Timer'

const Singletask = ({getalltasks,data}) => {
  let {light}=useContext(context)
  let [end,setEnd]=useState(false)
  let [status,setStatus]=useState(data.status)
  let [process,setProcess]=useState(data.process)
  let [loadingProcess,setLoadingprocess]=useState(false)
  let [loadingStatus,setLoadingStatus]=useState(false)
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
  url:`http://localhost:8080/tasks/update/${id}`,
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
  useEffect(()=>{
    if(data.hour+data.durationH<=new Date().getHours()&&data.minute+data.durationM<=new Date().getMinutes()){
     setEnd(true)
     }
  },[])
  return (
    <div style={{marginTop:"10px"}}>
 
       <Box margin={"auto"} bg={light?"white":"black"} h={"230px"} boxShadow={" rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"} borderRadius={"5px"} padding={"10px"} w={"300px"}>
       <Timer data={data}/>
     <Text color={light?"black":"white"} textAlign={"left"}><b>Task</b> : {data.task} </Text>
     <Text  color={light?"black":"white"} textAlign={"left"}><b> Process </b>: {data.process?"Started":"Not Started"}  &nbsp; {loadingProcess?<Spinner size='xs' />:<Switch colorScheme="blue" bg={"black"} borderRadius={"20px"} isChecked={process}  onChange={()=>handleprocess(data._id)}  size='sm'/>}</Text>
     <Text  color={light?"black":"white"} textAlign={"left"}><b> Status </b>: {data.status?"Completed":"Not Completed"} &nbsp; {loadingStatus?<Spinner size='xs' />:<Switch colorScheme="blue" bg={"black"} borderRadius={"20px"} isChecked={status} onChange={()=>handlestatus(data._id)}  size='sm'/>}</Text>
    
     <Text   color={light?"black":"white"} textAlign={"left"}><b>Duration : </b> <Badge  color={light?"black":"black"} bg={"gray.300"}>{data.durationH||data.durationM?` You Decided ${data.durationH}h : ${data.durationM?data.durationM:"0"}m`:"Not Decided"}</Badge></Text>
     <Text  color={light?"black":"white"} textAlign={"left"}><b>Importance</b> : <Badge color={"white"} bg={data.importance==1?"red.400":data.importance==2?"orange.300":"green.300"} > {data.importance==1?"Very Important":data.importance==2?"Moderate":"Low"}</Badge></Text>
     <Text   color={light?"black":"white"} textAlign={"left"}><b>Decided Time : </b><TimeBadge data={data}/></Text>
     {
      data.status==false&&end==true&& <Badge  color="white" margin={"auto"} w="90px" bg={"green.500"} p={1}m={3}>Reshedule</Badge>
     }
      
      </Box>
    </div>
  )
}

export default Singletask
