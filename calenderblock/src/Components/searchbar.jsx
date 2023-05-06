import { Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const Searchbar = () => {

    useEffect(()=>{
    getdata()
    },[])

    function getdata()
  return (
    <div>
      <Input placeholder='serach'/>
    </div>
  )
}

export default Searchbar
