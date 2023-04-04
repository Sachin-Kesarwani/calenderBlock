

import { Box, Button, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import "./silog.css"
import { useNavigate } from 'react-router-dom'
let inidata={
    name:"",
    email:"",
    password:""
}
const Signup = () => {
let [signup,setSignup]=useState(inidata)
let toast=useToast()
let navigate=useNavigate()
function handleChange(e){
setSignup({...signup,[e.target.name]:e.target.value})
}
function handleclick(e){
e.preventDefault()
if(signup.name!==""&&signup.email!==""&&signup.password!==""){
  postdataInAPI()
}else{
  toast({
    title: `Please fill all inputs`,
    status: "warning",
    isClosable: true,
  })
}


   

}

async function postdataInAPI(){
await axios({
  url:"http://localhost:8080/users/signup",
  method:"post",
  data:signup
}).then((res)=>{
  console.log(res.data)
  toast({
    title: `${res.data.msg}`,
    status: "success",
    isClosable: true,
  })
}).catch((er)=>{
  console.log(er.response.data)
  toast({
    title: `${er.response.data.msg}`,
    status: "warning",
    isClosable: true,
  })
  navigate("/login")
})
}
  return (
    <div>
      <Heading fontFamily={"sans-serif"}>Signup</Heading>
      <Box borderRadius={"10px"} p={5} m="auto" w="280px" boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
        <FormLabel>Name :</FormLabel>
        <Input id="signupInput" name="name" value={signup.name} type='text' placeholder='Please Enter Your Name' onChange={handleChange}  />
        <FormLabel>Email :</FormLabel>
        <Input  id="signupInput" name="email" value={signup.email} type='text' placeholder='Please Enter Your Email' onChange={handleChange}  />
        <FormLabel>Password :</FormLabel>
        <Input  id="signupInput" name="password" value={signup.password} type='password' placeholder='Please Enter Your Password' onChange={handleChange}  />
        <Button borderRadius={"20px"} w="100%" marginTop={"10px"} onClick={handleclick}>Sinup</Button>
      </Box>
    </div>
  )
}

export default Signup
