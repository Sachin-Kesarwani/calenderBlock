import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import Cookies from 'js-cookie';
export function UploadImage() {
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
      const response = await axios.post("http://localhost:8080/users/uploadphoto", formData, {
        headers: { "Content-Type": "multipart/form-data" ,   Authorization:`Bearer ${token}`},
      });
      console.log(response);
      setImagePath(response.data);
      setSelectedFile(null);
    //   getdata()
    } catch (error) {
      console.error(error);
    }
  };

//   async function getdata(){
  
//    await axios.get("http://localhost:5000/get").then((res)=>{
//     console.log(res.data)
//     setImages(res.data)
//    }).catch((er)=>{
//     console.log(er)
//    })
     
  
//   };
// useEffect(()=>{
//     getdata()
// },[])
// console.log(images)
  return (
    <div>
      <h1>Image Upload Example</h1>
      <div>
        <h2>Upload Image:</h2>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {imagePath && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imagePath} alt="uploaded" />
        </div>
      )}
      <div>
        <h2>Images:</h2>
        <button>Get Images</button>
        {images.length>0&&images.map((image) => (
          <div key={image._id}>
            <img src={"http://localhost:8080/"+image.image} alt="gallery" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImage;
