import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import "./silog.css"
let inidata={
    name:"",
    email:"",
    password:""
}
const Signup = () => {
let [signup,setSignup]=useState(inidata)

function handleChange(e){
setSignup({...signup,[e.target.name]:e.target.value})
}
function handleclick(e){
e.preventDefault()
console.log(signup)
}
  return (
    <div>
      <Box p={5} m="auto" w="280px" boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
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
