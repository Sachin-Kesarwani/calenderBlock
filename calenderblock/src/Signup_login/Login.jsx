

import { Box, Button, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import "./silog.css"
let inidata={
   
    email:"",
    password:""
}
const Login = () => {
let [login,setLogin]=useState(inidata)
let toast=useToast()
let navigate=useNavigate()
function handleChange(e){
setLogin({...login,[e.target.name]:e.target.value})
}
function handleclick(e){
e.preventDefault()
if(login.name!==""&&login.email!==""&&login.password!==""){
  postdataInAPI()
}else{
  console.log("please all data")
}


   

}

async function postdataInAPI(){
await axios({
  url:"http://localhost:8080/users/login",
  method:"post",
  data:login
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
  if(er.response.data.msg=="You have not Signup till now"){
navigate("/signup")
  }
})
}
  return (
    <div>
      <Heading fontFamily={"sans-serif"}>Signup</Heading>
      <Box borderRadius={"10px"} p={5} m="auto" w="280px" boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
       
        <FormLabel>Email :</FormLabel>
        <Input  id="signupInput" name="email" value={login.email} type='text' placeholder='Please Enter Your Email' onChange={handleChange}  />
        <FormLabel>Password :</FormLabel>
        <Input  id="signupInput" name="password" value={login.password} type='password' placeholder='Please Enter Your Password' onChange={handleChange}  />
        <Button borderRadius={"20px"} w="100%" marginTop={"10px"} onClick={handleclick}>Login</Button>
      </Box>
    </div>
  )
}

export default Login
