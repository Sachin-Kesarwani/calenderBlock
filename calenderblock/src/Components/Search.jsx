import { Button, FormLabel, Heading, Input, Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import "./search.css"
import { useThrottle } from 'use-throttle';
import { context } from '../Context/Context';
const Search = ({setgetCompleteAlldata,getalltasks, setYear, setMonth,setDate,setText,getFutureAndPastdata}) => {
  let { light } = useContext(context);
    let [search,setSearch]=useState("")
    const throttledText = useThrottle(search, 2000);
    let [loading,setLoading]=useState(false)
function handleChange(e){
    if(e.target.name=="date"){
        let [year, month, date] = e.target.value.split("-");
        setYear(parseInt(year))
        setMonth(parseInt(month))
        setDate(parseInt(date))
        setgetCompleteAlldata(false)
    }else  {
       setSearch(e.target.value)
       
    }

}
function handleClick(){
  setLoading(true)
  setgetCompleteAlldata(true)
 
    getalltasks(true).then((res)=>{
      setLoading(false)
    })

}

useEffect(()=>{
  setText(throttledText)
  setgetCompleteAlldata(false)
},[ throttledText])

  return (
    <div id="serachBox">
        <FormLabel>Search     <Input id="serachinput" border={light?"1px solid black":"1px solid white"} type='text' placeholder='Enter Task for search' name="text" onChange={handleChange}/></FormLabel>
   
      <FormLabel>Date   <Input border={light?"1px solid black":"1px solid white"}   id="serachinput" type='date' placeholder='Enter Date  for search'name="date"  onChange={handleChange}/></FormLabel>
      <FormLabel>All Data  <Input type='submit' w="100%" bg={"green.300"} onClick={()=> handleClick()}  id="serachinput" cursor={"pointer"} value={loading?"Getting...":"Get All Data"} /></FormLabel>
      
    </div>
  )
}

export default Search
