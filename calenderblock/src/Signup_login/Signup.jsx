

import { Box, Button, FormLabel, Heading, Input, Spinner, useToast } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import axios from "axios"
import "./silog.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { context } from '../Context/Context'
let inidata={
    name:"",
    email:"",
    password:""
}
const Signup = () => {
let [signup,setSignup]=useState(inidata)
let [loading,setLoading]=useState(false)
let toast=useToast()
let navigate=useNavigate()
let [disable,setdisables]=useState(false)
let {light}=useContext(context)
let warn=useRef(null)
function handleChange(e){
setSignup({...signup,[e.target.name]:e.target.value})
}
function handleclick(e){
e.preventDefault()
if(signup.name!==""&&signup.email!==""&&signup.password!==""){
  postdataInAPI()
}else{
  setdisables(true)
  setTimeout(()=>{
    setdisables(false)
  },1000)
  toast({
    title: `Please fill all inputs`,
    status: "warning",
    isClosable: true,
    position:"top"
  })
  warn?.current?.play()
  warn.current.volume=0.1
}


   

}

async function postdataInAPI(){
  setLoading(true)
await axios({
  url:"https://crazy-pink-crocodile.cyclic.app/users/signup",
  method:"post",
  data:signup
}).then((res)=>{
  setLoading(false)
  toast({
    title: `${res.data.msg}`,
    status: "success",
    isClosable: true,
  })
  Cookies.set('calenderToken',res.data.token);
  Cookies.set('infoforcalender',JSON.stringify(res.data.data));

  // localStorage.setItem("calenderToken",res.data.token)
  // localStorage.setItem("infoforcalender",JSON.stringify(res.data.data))
 
  navigate("/taskform")
}).catch((er)=>{
 
  setLoading(false)
  warn?.current?.play()
  toast({
    title: `${er.response.data.msg}`,
    status: "warning",
    isClosable: true,
    position:"top"
  })
  navigate("/login")
})
}
  return (
    <div>
      <Heading fontFamily={"initial"}>Signup</Heading>
      <Box  bg={light?"white":"black"} color={"black"} borderRadius={"10px"} p={5} m="auto" w="280px" boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
        <FormLabel color={light?"black":"white"} >Name :</FormLabel>
        <Input color={light?"black":"white"} id="signupInput" name="name" value={signup.name} type='text' placeholder='Please Enter Your Name' onChange={handleChange}  />
        <FormLabel color={light?"black":"white"}>Email :</FormLabel>
        <Input color={light?"black":"white"} id="signupInput" name="email" value={signup.email} type='text' placeholder='Please Enter Your Email' onChange={handleChange}  />
        <FormLabel color={light?"black":"white"}>Password :</FormLabel>
        <Input color={light?"black":"white"} id="signupInput" name="password" value={signup.password} type='password' placeholder='Please Enter Your Password' onChange={handleChange}  />
        <Button  isDisabled={disable} w="100%"_hover={{bg:"#B794F4"}}  borderRadius={"20px"} bg={"#B794F4"} my={5} color={"white"} onClick={handleclick}>{loading?<Spinner size='sm' />:"Signup"}</Button>
      </Box>
      <audio src="./wrong.mp3" ref={warn}/>
    </div>
  )
}

export default Signup
