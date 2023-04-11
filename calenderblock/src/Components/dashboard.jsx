import { Box, Heading, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Singletask from './Singletask'
import axios from 'axios'
import Search from './Search'


const Dashboard = () => {

let [alldata,setalldata]=useState([])
let [year,setYear]=useState(new Date().getFullYear())
let [month ,setMonth]=useState(new Date().getMonth()+1)
let [date ,setDate]=useState(new Date().getDate())
let [text,setText]=useState("")
let [loading,setLoading]=useState(false)
   async function getalltasks(){
    setLoading(true)
    let token=localStorage.getItem("calenderToken")||""
    let link=""
    let onlytextsearch=true
    if(date==new Date().getDate()&&month==new Date().getMonth()+1&&year==new Date().getFullYear()){
        onlytextsearch=false
    }
   
    if(year && month&&date &&text.length>0&&onlytextsearch){

      // date=null,month=null,year=null
      link=`https://crazy-pink-crocodile.cyclic.app/tasks/search?year=${year}&month=${month}&date=${date}&task=${text}`
     }else 
 if(text.length>0){

      link=`https://crazy-pink-crocodile.cyclic.app/tasks/search?task=${text}`
    }else {
      link=`https://crazy-pink-crocodile.cyclic.app/tasks/data?year=${year}&month=${month}&date=${date}`
    }
   

await  axios({
    method:"get",
    url:link,
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then((res)=>{

  setLoading(false)
   setalldata(res.data.data)
  
}).catch((er)=>{
  setLoading(false)
})
    }
    useEffect(()=>{
        getalltasks()
    },[date,month,year,text])
    let token=localStorage.getItem("calenderToken")
  return (
    <>
    {
      token? <div>
   
      {
       loading?<Heading fontFamily={"initial"}>Loading...</Heading>:   <Heading fontFamily={"initial"}>Dashboard</Heading>
      }
       <Search setYear={setYear} setMonth={setMonth} setDate={setDate} setText={setText} />
 
       {
     <Box w={"98%"} m={"auto"} display={"grid"} gridTemplateColumns={ {
           sm:"repeat(1,1fr)",
           md: "repeat(2,1fr)",
           lg: "repeat(3,1fr)", 
           xl: "repeat(4,1fr)", 
           '2xl': "repeat(4,1fr)", 
         }} >
               {
          alldata?.map((e)=>{
                   return  <Singletask key={e._id} getalltasks={getalltasks} data={e}/>
                 })
               }
           </Box>
       
             }
     {
       alldata?.length==0&&loading==false?<Heading fontFamily={"initial"} marginTop={"50px"} textAlign={"center"}>Nothing you were decided</Heading>:""
     }
      
     </div>:<Heading fontFamily={"initial"} marginTop={"50px"} textAlign={"center"}>Please Authenticate your self</Heading>
    }
   
    </>
  )
}

export default Dashboard
