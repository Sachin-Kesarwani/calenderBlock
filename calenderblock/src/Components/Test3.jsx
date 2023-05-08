import { Heading, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Test3 = () => {
let [loading,setloading]=useState(false)
let [data,setdata]=useState([])
async function getdata(){
    setloading(true)
  await axios.get("https://jsonplaceholder.typicode.com/todos")
  .then((res)=>{
    setdata(res.data)
    setloading(false)
    console.log(res.data)
  }).catch((er)=>{
    setloading(false)
    console.log(er)
  })
}
useEffect(()=>{
    getdata()
},[])
  return (
    <div style={{display:"flex",border:"1px solid red",width:"300px",height:"300px"}} >
     {
        loading?<Spinner/>:data.map((e)=>{
            return <Heading>hello</Heading>
        })
     }
    </div>
  )
}

export default Test3
