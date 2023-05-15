import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@chakra-ui/react";


let src1="https://e7.pngegg.com/pngimages/674/524/png-clipart-professional-computer-icons-avatar-job-avatar-heroes-computer.png"
let src2="https://p7.hiclipart.com/preview/234/927/779/user-computer-icons-login-google-account-others-thumbnail.jpg"
const Camera = ({onClose}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  let    [cameraon,setCameraon]=useState(false)
  let [videos,setVideo]=useState(true)
  let [take,setTake]=useState(false)
  let [upload,setupload]=useState()
  let [stopcamera,setStopcamera]=useState(false)
  let [demoimage,setDemoImage]=useState(src1)
  let [demo,setdemo]=useState(true)
  const startCamera = async () => {
    setVideo(true)
    setImageUrl(null)
    setVideo(true)
    setTake(true)
     setupload(false)
     setStopcamera(true)
    setdemo(false)

    try {
      // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const stream= await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      videoRef.current.srcObject = stream;
      setCameraon(true)
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  const stopCamera = () => {
   
     if(videoRef.current==null){
      return
     }
    const stream = videoRef.current.srcObject;
     if (stream) {
       const tracks = stream.getTracks();
       tracks.forEach(track => track.stop());
       videoRef.current.srcObject = null;
      
        setCameraon(false);
       setTake(false)
       setupload(false)
      setdemo(true)
     }
   
  };
  

  const previewPicture = () => {
    setShowPreview(true);
  };

  const takePicture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const url = canvas.toDataURL();
    stopCamera()
    setImageUrl(url);
  
    setVideo(false)
    setTake(false)
    setupload(true)
 
  };

function uploadurl(){
  localStorage.setItem("calende_image",JSON.stringify(imageUrl)) 
  onClose()
}


function Cancel(){
 
       stopCamera()
       onClose()
      
}




  return (
    <div>
  

     {imageUrl&& <img src={imageUrl} alt="Taken Picture" />}
     {
      videos&&demo==false  ? <video  ref={videoRef} style={{width:"100%",height:"100%",border:"2px solid teal"}} autoPlay />:""
     }
{
  demo&&!imageUrl?<img src={src2} style={{borderRadius:"50%",margin:"auto"}} alt="Taken Picture" />:""
}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Box display={"flex"} marginTop={"10px"}>
      {
        cameraon==false?  <Button mx={2} bg={"green.500"} _hover={{bg:"green.500"}}  color={"white"} onClick={()=>startCamera()}>Start Camera</Button>:  <Button mx={2} color={"white"} bg={"red.600"} _hover={{bg:"red.600"}}  onClick={()=>stopCamera()}>Stop Camera</Button>
      }
    
      {/* {!showPreview && <Button mx={2} bg={"cyan.500"}  _hover={{bg:"cyan.500"}} onClick={previewPicture}>Preview Picture</Button>} */}
    
 
    <div style={{display:"flex"}}>
      {
   take?<Button color={"white"}bg={"green.500"} _hover={{bg:"green.500"}}onClick={takePicture}>Take Picture</Button>:null
      }
      {
        upload? <Button mx={2}  bg={"teal.300"} _hover={{bg:"teal.300"}}onClick={uploadurl}>Upload</Button>:null
      }
   
    
   
      {/* */}
    </div>
    
       
    
      </Box>
      <Button display={"flex"} bg={"red.700"} onClick={Cancel} _hover={{bg:"red.700"}} color={"white"} marginLeft={"auto"}>Cancel</Button>
    </div>
  );
};

export default Camera;
