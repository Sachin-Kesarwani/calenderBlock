

import { Box, Button, FormLabel, Heading, Input, Spinner, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import "./silog.css"
import { context } from '../Context/Context'
import Cookies from 'js-cookie';
let inidata={
   
    email:"",
    password:""
}
const Login = () => {
let [login,setLogin]=useState(inidata)
let [loading,setLoading]=useState(false)
let toast=useToast()
let {light}=useContext(context)
let navigate=useNavigate()
let warn=useRef(null)
let welcome=useRef(null)
let [disable,setDisable]=useState(false)
function handleChange(e){
setLogin({...login,[e.target.name]:e.target.value})
}
function handleclick(e){
e.preventDefault()
if(login.name!==""&&login.email!==""&&login.password!==""){
  postdataInAPI()
}else{
  setDisable(true)
  setTimeout(()=>{
setDisable(false)
  },1500)
  toast({
    title: `Please fill all input`,
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
  let url=process.env.REACT_APP_API_URL
console.log(url)
await axios({
  url:`${url}/users/login`,
  method:"post",
  data:login
}).then((res)=>{

  Cookies.set('calenderToken',res.data.token);
  Cookies.set('infoforcalender',JSON.stringify(res.data.data));
  let token=Cookies.get('calenderToken')
  let data= JSON.parse(Cookies.get('infoforcalender'))

  // localStorage.setItem("calenderToken",res.data.token)
  // localStorage.setItem("infoforcalender",JSON.stringify(res.data.data))
  toast({
    title: `${res.data.msg}`,
    status: "success",
    isClosable: true,
    position:"top"
  })
  welcome?.current?.play()
  welcome.current.volume=0.1
  setLoading(false)
setTimeout(()=>{
  navigate("/")
},1000)
 
}).catch((er)=>{
  warn?.current?.play()
  warn.current.volume=0.1
  setLoading(false)
  
  toast({
    title: `${er.response.data.msg}`,
    status: "warning",
    isClosable: true,
    position:"top"

  })
  if(er.response.data.msg=="You have not Signup till now"){
navigate("/signup")
  }
})
}



  return (
    <div>
      <Heading fontFamily={"initial"}>Login</Heading>
      <Box  bg={light?"white":"black"} borderRadius={"10px"} p={5} m="auto" w="280px" boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
       
        <FormLabel>Email :</FormLabel>
        <Input  id="signupInput" name="email" value={login.email} type='text' placeholder='Please Enter Your Email' onChange={handleChange}  />
        <FormLabel>Password :</FormLabel>
        <Input  id="signupInput" name="password" value={login.password} type='password' placeholder='Please Enter Your Password' onChange={handleChange}  />
        <Button isDisabled={disable} _hover={{bg:"#B794F4"}}  borderRadius={"20px"} bg={"#B794F4"} my={5} color={"white"} w="100%" onClick={handleclick}>{loading?<Spinner size='sm' />:"Login"}</Button>
      </Box>
      <audio src="./wrong.mp3" ref={warn}/>
      <audio src="./welcome.mp3" ref={welcome}/>
    </div>
  )
}

export default Login
