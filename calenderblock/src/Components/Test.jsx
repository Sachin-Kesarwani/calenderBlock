import React, { useState } from 'react';
import axios from 'axios';
import { Image } from '@chakra-ui/react';
import { deflate } from 'pako';
function Upload() {
  const [selectedFile, setSelectedFile] = useState("");
 const handleFileInputChange = (e) => {
   
    let reader=new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=(event)=>{
     
      setSelectedFile(reader.result);
      localStorage.setItem("calende_image",JSON.stringify(reader.result))
  console.log(reader.result)

    }
    reader.onerror=(er)=>{
      console.log(er)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append('image', selectedFile);
fetch('http://localhost:8080/users/uploadimage',{
  method:"POST",
  crossDomain:true,
  headers:{
    "Content-Type":"application/json",
    accept:"application/json",
    "Access-Control-Allow-Origin":"*",
  },
  body:JSON.stringify({base64:selectedFile})
}).then((res)=>{
  res.json()
}).then((res)=>{
  console.log("ok")
}).catch((er)=>{
  console.log("No")
})
    // axios.post('http://localhost:8080/users/uploadimage',{
    //   headers:{
    //     "Content-Type":"application/json"
    //   },data:{base64:selectedFile}
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setSelectedFile(null);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
console.log(selectedFile)
let ca={
  position: "relative",
  display: "inlineBlock",
  backgroundColor: "#e3e3e3",
  color: "#555",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer"
}
let cd= {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer"
}
  return (
    // <div>
    //   <h2>Upload an Image</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" accept='image*/' onChange={handleFileInputChange} />
    //     <button type="submit" disabled={!selectedFile}>Upload</button>
    //   </form>
    //   {
    //   selectedFile==""||selectedFile==null?"":<Image h={"100px"} w={"100px"}  src={selectedFile}/>
    //   }

<div style={ca} class="custom-file-input">
  <span>Choose File</span>
  <input style={cd} type="file" id="file-input" />
</div>

    // </div>
  );
}

export default Upload;
