import { Box, FormLabel, Select,Input,option } from '@chakra-ui/react'
import React, { useState } from 'react'


let inidata={
    year:new Date().getFullYear(),
    month:new Date().getMonth(),
    day:new Date().getDay(),
    date:"",
    hour:"",
    minute:"",
    meridian:"",
    task:"",
    importance:"",
    status:"Not Done"
    
   
}
const TaskForm = () => {
   let [data,setdata]=useState(inidata)

   function handleChange(){

   }
  return (
    <div>
      <Box>
      <FormLabel>Your Task</FormLabel>
      <Input placeholder="Enter Your Task" name="task" value={data.task} type={"text"} onChange={handleChange} required/>
      <FormLabel>Importance of task</FormLabel>
      <Select placeholder='Choose Imprtannce of Task' name="importance" value={data.importance} onChange={handleChange}>
        <option value="3">
        Very Important
        </option>
        <option value="2">
       Moderate
        </option>
        <option value="1">
       Low
        </option>
      </Select>
      </Box>
    </div>
  )
}

export default TaskForm
