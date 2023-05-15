import { Box, Heading, Image, Progress, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Singletask from './Singletask'
import axios from 'axios'
import Search from './Search'
import Cookies from 'js-cookie';

const Dashboard = () => {

let [alldata,setalldata]=useState([])
let [year,setYear]=useState(new Date().getFullYear())
let [month ,setMonth]=useState(new Date().getMonth()+1)
let [date ,setDate]=useState(new Date().getDate())
let [text,setText]=useState("")
let [loading,setLoading]=useState(false)
let [getCompleteAlldata,setgetCompleteAlldata]=useState(false)
let toast=useToast()
let token=Cookies.get('calenderToken')

const [progress, setProgress] = useState(0);
   async function getalltasks(alldata=false){
    let url=process.env.REACT_APP_API_URL
    setLoading(true)
    let token=Cookies.get('calenderToken')||""
    console.log(token)
    let link=""
    let onlytextsearch=true
    if(date==new Date().getDate()&&month==new Date().getMonth()+1&&year==new Date().getFullYear()){
        onlytextsearch=false
    }
   if(alldata||getCompleteAlldata){
     link =`${url}/tasks/getall`
   }else if(year && month&&date &&text.length>0&&onlytextsearch){

      // date=null,month=null,year=null
      link=`${url}/tasks/search?year=${year}&month=${month}&date=${date}&task=${text}`
     }else 
 if(text.length>0){

      link=`${url}/tasks/search?task=${text}`
    }else {
      link=`${url}/tasks/data?year=${year}&month=${month}&date=${date}`
    }
   

return await  axios({
    method:"get",
    url:link,
    headers:{
        Authorization:`Bearer ${token}`
    }, onDownloadProgress: progressEvent => {
    
  
    }
}).then((res)=>{

  setLoading(false)
   setalldata(res.data.data)
  
}).catch((er)=>{
  setLoading(false)
})
    }

  async  function getFutureAndPastdata(){
    let token=Cookies.get('calenderToken')||""
    let url=process.env.REACT_APP_API_URL
    setLoading(true)
     await axios({
      url:`${url}/tasks/getall`,
      method:'get',
    headers:{
      Authorization:`Bearer ${token}`
    }
     }).then((res)=>{
      setLoading(false)
      setalldata(res.data.data)
      toast({
        title: `${res.data.msg}`,
        status: "success",
        isClosable: true,
        position:"top"
      })
     }).catch((er)=>{
      setLoading(false)
      toast({
        title: `${er.response.data.msg}`,
        status: "warning",
        isClosable: true,
        position:"top"
      })
     })
    }
    useEffect(()=>{
        getalltasks()
    },[date,month,year,text])

   
  return (
    <>

    {
      token? <div>
   
      {/* {
       loading?<Heading fontFamily={"initial"}>Loading...</Heading>:   <Heading fontFamily={"initial"}>Dashboard</Heading>
      } */}
       
      {
      loading&&<Progress w="100%" marginBottom={"20px"} margin={"auto"} position={"static"}  hasStripe value={100} isAnimated />
    }
     <Heading fontFamily={"initial"}>Dashboard</Heading>
       <Search setgetCompleteAlldata={setgetCompleteAlldata}  getalltasks={getalltasks} getFutureAndPastdata={getFutureAndPastdata} setYear={setYear} setMonth={setMonth} setDate={setDate} setText={setText} />
 
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
