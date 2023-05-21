import { Button, Input, Text ,Box, Checkbox} from '@chakra-ui/react'
import React, { useState } from 'react'

let task={
    subtask:"",
    status:false
}
const Test7 = () => {
let [subtaksarr,setsubtaskarr]=useState([])
let [subtask,setsubtask]=useState(task)
    function handlesubtasks(e,ind){
     
   
    }

    function create(){
    let arr=[...subtaksarr,task]
    setsubtaskarr(arr)
    }
   function handleChange(e,ind){
    let arr=  subtaksarr.map((ei,i)=>{
        if(i==ind){
            return {...ei,subtask:e.target.value}
        }else{
            return ei
        }
    })
setsubtaskarr(arr)
   }
   function deleteinput(ind){
    console.log(ind,subtaksarr)
   let arr=subtaksarr.filter((e,i)=>i!==ind)
   console.log(arr)
  setsubtaskarr(arr)
   }
   console.log(subtaksarr)
  return (
    <div>
    <Box w={"350px"} margin={"auto"} >
    {
        subtaksarr.length>0&&subtaksarr.map((e,i)=>{
            return <Box display={"flex"} my={2} justifyContent={"center"} w={"300px"}>
                  <Checkbox mx={2} defaultChecked/>
                <Input type='text' value={e.subtask} onChange={(e)=>handleChange(e,i)} />
              
               <Button mx={3} onClick={()=>deleteinput(i)}>X</Button>
            </Box>
        })
      }
    </Box>
      
        <Button onClick={()=>create()}>Add Sub Task +</Button>
    </div>
  )
}

export default Test7
