import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Singletask from './Singletask'
import axios from 'axios'


const Dashboard = () => {

let [alldata,setalldata]=useState([])
let [year,setYear]=useState(new Date().getFullYear())
let [month ,setMonth]=useState(new Date().getMonth()+1)
let [date ,setDate]=useState(new Date().getDate())
   async function getalltasks(){
    let token=localStorage.getItem("calenderToken")||""
await  axios({
    method:"get",
    url:`http://localhost:8080/tasks/data?year=${year}&month=${month}&date=${date}`,
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then((res)=>{
   console.log(res)
   setalldata(res.data.data)
}).catch((er)=>{
console.log(er)
})
    }
    useEffect(()=>{
        getalltasks()
    },[])
  return (
    <div>
      <Heading>dashboard</Heading>
      <Box w={"98%"} m={"auto"} display={"grid"} gridTemplateColumns={ {
  sm:"repeat(1,1fr)",
  md: "repeat(2,1fr)",
  lg: "repeat(3,1fr)", 
  xl: "repeat(4,1fr)", 
  '2xl': "repeat(4,1fr)", 
}} >
      {
        alldata?.map((e)=>{
          return  <Singletask getalltasks={getalltasks} data={e}/>
        })
      }
      </Box>
    
     
    </div>
  )
}

export default Dashboard
