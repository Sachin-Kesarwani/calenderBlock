import { ReactNode } from 'react';
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
} from '@chakra-ui/react';
import mypic from "./mypic.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import TaskForm from './TaskForm';
import AllRoutes from '../AllRoutes/AllRoutes';
import { context } from '../Context/Context';
import { useContext } from 'react';

const Links = [{name:'Dashboard',link:"/"},{ name:'Signup',link:"/signup"}, {name:'login',link:"/login"},{name:"Add task",link:"/taskform"}];

// const NavLink = ({ children }) => (


export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  let navigate=useNavigate()
  let userinfo=JSON.parse(localStorage.getItem("infoforcalender"))
  function logout(){
    localStorage.removeItem("calenderToken")
    localStorage.removeItem("infoforcalender")
     navigate("/signup")
  }
  let {light, changecolor}=useContext(context)
  function handlecolormode(){
    console.log("handleColormode")
    changecolor()
  }
  console.log(userinfo)
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
            <Box ><b>{userinfo?.name||"User"}</b></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((e) => (
                <Button bg={"#38B2AC"} >
 <Link key={e.name} to={e.link}>{e.name}</Link>
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
              <Button onClick={()=>{
                handlecolormode()
                toggleColorMode()}}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <MenuList>
                <MenuItem key="About Developer"><Link to="/about"> About Developer</Link></MenuItem>
                <MenuItem key="logout" onClick={logout}>Logout</MenuItem>
                <MenuDivider />
                <MenuItem key="Link3">Link 3</MenuItem>
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

     
      <AllRoutes/>
    </>
  );
}