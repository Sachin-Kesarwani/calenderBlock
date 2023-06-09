import { useToast } from '@chakra-ui/react'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
const PrivateRoutes = ({children}) => {

    let token=Cookies.get('calenderToken')

   let navigate=useNavigate()
   let location = useLocation();
   let toast=useToast()


    if(!token){
        toast({
            title: `Please Login first`,
            status: 'error',
            isClosable: true,
            position:"top"
          })
       // console.log(location.pathname,typeof location.pathname)
   //let tothe=location.pathname ||"/login"

     return <Navigate to="/login" />
    }
  return children
}

export default PrivateRoutes
