import { Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Singletask from './Singletask'
import axios from 'axios'

const Dashboard = () => {

let [alldata,setalldata]=useState([])
   async function getalltasks(){
    let token=localStorage.getItem("calenderToken")||""
await  axios({
    method:"get",
    url:"http://localhost:8080/tasks/data",
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
      {
        alldata?.map((e)=>{
          return  <Singletask data={e}/>
        })
      }
    
    </div>
  )
}

export default Dashboard
