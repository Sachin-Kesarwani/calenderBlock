import { ReactNode, useRef } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  SkeletonCircle, 
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  Input,
} from '@chakra-ui/react';
import mypic from "./mypic.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import TaskForm from './TaskForm';
import AllRoutes from '../AllRoutes/AllRoutes';
import { context } from '../Context/Context';
import { useContext } from 'react';
import { useEffect } from 'react';
import "./home.css"
import { Feedback } from './Feedback';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { UploadImageInatlas } from './Imagefile';

const Links = [{name:'Dashboard',link:"/"},{name:"Add task",link:"/taskform"},{ name:'Signup',link:"/signup"}, {name:'Login',link:"/login"}];

// const NavLink = ({ children }) => (


export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  let navigate=useNavigate();
  let warn=useRef(null);
  let lightdark=useRef(null);
  let token=Cookies.get('calenderToken')
  let image=JSON.parse(localStorage.getItem("calende_image"))
  let name=Boolean(Cookies.get('infoforcalender'))?Cookies.get('infoforcalender'):JSON.stringify({name:"User"})
//  console.log(Boolean(Cookies.get('infoforcalender')),"hi",Cookies.get('infoforcalender'))
  let userinfo=JSON.parse( name)
console.log(userinfo,typeof userinfo)
  function logout(){
  
     warn?.current?.play()
    warn.current.volume=1
    localStorage.removeItem("calenderToken")
    localStorage.removeItem("infoforcalender")
    Cookies.remove('infoforcalender');
    Cookies.remove('calenderToken');
    setTimeout(()=>{
      navigate("/signup")
    },100)
 
  }
  let {light, changecolor,setLight}=useContext(context)
  function handlecolormode(){
    lightdark?.current?.play()
    changecolor()
   
  }
  useEffect(()=>{
  if(colorMode=="light"){
    setLight(true)
  }else{
    setLight(false)
  }
  },[colorMode])
  const [selectedFile, setSelectedFile] = useState("");

  function uploadImage(event){
    let reader=new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(event)=>{
     
      setSelectedFile(reader.result);
      localStorage.setItem("calende_image",JSON.stringify(reader.result))
 

    }
    reader.onerror=(er)=>{
      console.log(er)
    }
  }
  let stylediv={
    position: "relative",
    display: "inlineBlock",
    backgroundColor: "#e3e3e3",
    color: "#555",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  }
  let stylefileinput= {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer"
  }


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
      console.log(response.data.data.image.data.data);
      
      const base64String = btoa(String.fromCharCode(...new Uint8Array(response.data.data.image.data.data)));
      setImages( base64String)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{position:"sticky",top:0,background:"#9F7AEA"}}>
      <Box bg= '#9B2C2C' px={4}>
        <Flex h={16} alignItems={'center'}   justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box color={"white"} ><b>{userinfo?.name}</b></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((e,i) => (
                <Button _hover={{bg:"#38B2AC"}} color={"white"} bg={"#38B2AC"} >
 <Link key={i}  to={e.link}>{e.name}</Link>
                </Button>
               
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                  {/* {
      selectedFile==""||selectedFile==null?"":<Image h={"100px"} w={"100px"}  src={selectedFile}/>
      } */}
                <Avatar
                  size={'sm'}
                  src={
                 image|| mypic
                  }
                />
               
              </MenuButton>
              <Button marginLeft={4} onClick={()=>{
                handlecolormode()
                toggleColorMode()}}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <MenuList>
                <MenuItem key="About Developer"><Link to="/about"> About Developer</Link></MenuItem>
                <MenuItem key="logout" onClick={logout}>Logout</MenuItem>
                <MenuDivider />
                <MenuItem key="admin"><Feedback/></MenuItem>
                {
                  token&&  <MenuItem key="image" >
                  <div style={stylediv} class="custom-file-input">
                <UploadImageInatlas/>
                  
  </div>
  
  </MenuItem>
                }
              
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} color={"white"} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {Links.map((e) => (
                <Link key={e.name} to={e.link}>{e.name}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {/* <SkeletonCircle size='5' > */}

      {/* <div id="box"> */}
        {/* <Image w="100%" src="https://m.media-amazon.com/images/I/41HrC4qt6YL.png"/> */}
      
      {/* </div> */}
      
      {/* <div id="box">
        <Image w="100%" src="https://m.media-amazon.com/images/I/41HrC4qt6YL.png"/>
      
      </div> */}
  <audio src="./error.mp3" ref={warn}/>
  <audio src="./switch.mp3" ref={lightdark}/>
    
      {
          images.length>0&&  <img src={`data:image/jpg;base64,${images}`} alt=""/>
        }
    </div>
  );
}


{/* <div style={stylediv} class="custom-file-input">
<span>Choose File</span>
<input onChange={uploadImage}  style={stylefileinput} type="file" id="file-input" />
<Button>Upload</Button>
</div> */}

// accept='image*/'