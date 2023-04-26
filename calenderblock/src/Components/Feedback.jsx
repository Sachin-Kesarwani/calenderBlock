import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Textarea, useDisclosure, useToast } from "@chakra-ui/react"

import React, { useContext, useRef, useState } from "react"
import { context } from "../Context/Context";
import emailjs from '@emailjs/browser';
import { Form } from "react-router-dom";
import "./feedback.css"
export function Feedback() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let [loading,setLoading]=useState(false)
    let { light } = useContext(context);
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
     let toast=useToast()
    let  YOUR_SERVICE_ID="service_unrv3vr"
    let YOUR_TEMPLATE_ID="template_qrr2j7j"
    let  YOUR_PUBLIC_KEY="i_CVxtE2EKCrln1q8"
  
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();
  if(form.current.user_email.value!=""&&form.current.from_name.value!==""&&form.current.subject.value!==""&&form.current.message.value!==""){
    postEmail()
  }else{
    toast({
      title: `Please fill all input`,
      status: "warning",
      isClosable: true,
      position:"top"
    })
  }
 
   
  };


  function postEmail(){
    emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID,form.current, YOUR_PUBLIC_KEY)
    .then((result) => {
      toast({
        title: `Thank You`,
        status: "success",
        isClosable: true,
        position:"top"
      })
    }, (error) => {
       
    });
  }
    return (
      <>
        <p onClick={onOpen}>FeedBack</p>
    
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your Feedback</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <Box bg={light?"white":"black"} borderRadius={"10px"} p={5}  w="100%" boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"}>
            <form ref={form} onSubmit={sendEmail}>
            <label>Subject</label>
            <input id="fedbackinput" type="text" name="subject"  ></input>
            <label>Name</label>
            <input  id="fedbackinput" type="text" name="from_name"  ></input>
            <label>Email</label>
            <input  id="fedbackinput" type="email" name="user_email" ></input>
            <label>Message</label>
            <textarea style={{width:"100%",border:"1px solid rgb(85, 47, 47)"}} name="message"></textarea>
            <input  id="fedbackinput" type="submit" value="Send" ></input>
   
            </form>
       {/* <FormLabel>Name :</FormLabel>
       <Input  id="signupInput" name="email" type='text' placeholder='Please Enter Your Name' onChange={handleChange}  />
       <FormLabel>Email :</FormLabel>
       <Input  id="signupInput" name="password"  type='password' placeholder='Enter Your Email' onChange={handleChange}  />
       <FormLabel>Your Message :  <Textarea placeholder='Please Write Your Message Here' /></FormLabel>
       <Button _hover={{bg:"#B794F4"}}  borderRadius={"20px"} bg={"#B794F4"} my={5} color={"white"} w="100%" onClick={handleclick}>{loading?<Spinner size='sm' />:"Send"}</Button> */}
     </Box>
             
            </ModalBody>
  
            {/* <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    )
  }