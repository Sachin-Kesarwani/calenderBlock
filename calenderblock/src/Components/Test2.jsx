import { Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useRef,useEffect } from 'react'

export const Test2 = () => {
let abort=useRef(null)

    async function getdata(){
        abort.current=new AbortController()
     await axios.get("https://jsonplaceholder.typicode.com/users/5/todos",{
        method:"get",
        signal:abort.current.signal
     }).then((re)=>{
        console.log(re)
     }).catch((er)=>{
        er.name="Cacel because of abort"
        console.log( er.name)
     })
    }
    useEffect(()=>{
        getdata()
    },[])
    function cancelreq(){
     abort.current&&abort.current.abort()
    }
  return (
    <div>
      <Heading>Cancel : <Button onClick={cancelreq}>cncele</Button></Heading>
    </div>
  )
}

export default Test2
