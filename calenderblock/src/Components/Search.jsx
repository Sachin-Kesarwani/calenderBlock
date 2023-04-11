import { Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "./search.css"
import { useThrottle } from 'use-throttle';
const Search = ({ setYear, setMonth,setDate,setText}) => {

    let [search,setSearch]=useState("")
    const throttledText = useThrottle(search, 2000);
function handleChange(e){
    if(e.target.name=="date"){
        let [year, month, date] = e.target.value.split("-");
        setYear(parseInt(year))
        setMonth(parseInt(month))
        setDate(parseInt(date))
     
    }else  {
       setSearch(e.target.value)
       
    }

}

useEffect(()=>{
  setText(throttledText)
},[ throttledText])

  return (
    <div id="serachBox">
      <Input id="serachinput" type='text' placeholder='Enter Task for search' name="text" onChange={handleChange}/>
       <Input   id="serachinput" type='date' placeholder='Enter Date  for search'name="date"  onChange={handleChange}/>
    </div>
  )
}

export default Search
