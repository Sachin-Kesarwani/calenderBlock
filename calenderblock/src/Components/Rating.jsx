import { Button, Heading, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Rating = () => {
    let [loading,setloading]=useState(false)
let [data,setdata]=useState([])
async function getdata(){
    setloading(true)
  await axios.get("https://jsonplaceholder.typicode.com/todos")
  .then((res)=>{
   let newdata= res.data.map((e)=>{
        return {...e,rate:1}
    })
    setdata( newdata)
    setloading(false)
    console.log( newdata)
  }).catch((er)=>{
    setloading(false)
    console.log(er)
  })
}
useEffect(()=>{
    getdata()
},[])
function checgerate(id,star){
  let newdata=data.map((e)=>{
    return e.id!=id?e:{...e,rate:star}
  })
  setdata(newdata)
}
  return (
    <div>
    

      {
        loading?<Spinner/>:data?.map((e)=>{
            return<div>
                  <Button onClick={()=>checgerate(e.id,1)}>*</Button>
      <Button onClick={()=>checgerate(e.id,2)}>**</Button>
      <Button onClick={()=>checgerate(e.id,3)}>***</Button>
      <Button onClick={()=>checgerate(e.id,4)}>****</Button>
      <Button onClick={()=>checgerate(e.id,5)}>*****</Button>
      <Heading>{e.title}</Heading>
      <Button bg={"red"}>{e.rate}</Button>
                </div>
        })
      }
    </div>
  )
}

export default Rating
