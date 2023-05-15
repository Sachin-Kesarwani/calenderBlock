import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import Cookies from 'js-cookie';
import { useState } from 'react';
import Camera from "./Test5";
export function UploadImageInatlas() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePath, setImagePath] = useState("");
    const [images, setImages] = useState([]);
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleFileUpload = async () => {
      let token=Cookies.get('calenderToken')||""
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      try {
        const response = await axios.post(`https://nutty-lime-gorilla.cyclic.app/users/uploadphoto`, formData, {
          headers: { "Content-Type": "multipart/form-data" ,   Authorization:`Bearer ${token}`},
        });
        console.log(response.data.data.image.data.data);
        
        const base64String = btoa(String.fromCharCode(...new Uint8Array(response.data.data.image.data.data)));
        setImages( base64String)
      } catch (error) {
        console.error("error");
      }
    };
    return (
      <>
        <Button onClick={onOpen}>Add Image</Button>
       
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Image</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody pb={6}>
            {/* <input type="file" onChange={handleFileSelect} /> */}
        {/* <button onClick={handleFileUpload}>Upload</button> */}
        <Camera onClose={onClose}/>
            </ModalBody>
  
         
          </ModalContent>
        </Modal>
      </>
    )
  }