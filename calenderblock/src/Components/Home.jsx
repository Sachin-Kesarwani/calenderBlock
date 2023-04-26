import { ReactNode, useRef } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  
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
const Links = [{name:'Dashboard',link:"/"},{ name:'Signup',link:"/signup"}, {name:'Login',link:"/login"},{name:"Add task",link:"/taskform"}];

// const NavLink = ({ children }) => (


export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  let navigate=useNavigate();
  let warn=useRef(null);
  let lightdark=useRef(null);

  let userinfo= JSON.parse(Cookies.get('infoforcalender')||JSON.stringify({name:"User"}))

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

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box ><b>{userinfo?.name}</b></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((e,i) => (
                <Button bg={"#38B2AC"} >
 <Link key={i} to={e.link}>{e.name}</Link>
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
                <Avatar
                  size={'sm'}
                  src={
                  mypic
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
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {Links.map((e) => (
                <Link key={e.name} to={e.link}>{e.name}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <div id="box">
        <Image w="100%" src="https://m.media-amazon.com/images/I/41HrC4qt6YL.png"/>
      
      </div>
  <audio src="./error.mp3" ref={warn}/>
  <audio src="./switch.mp3" ref={lightdark}/>
      <AllRoutes/>
    </>
  );
}