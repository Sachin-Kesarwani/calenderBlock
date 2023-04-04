import { Heading } from '@chakra-ui/react'
import React from 'react'
import TaskForm from './TaskForm'

const Home = () => {
  let time=new Date("April 4 , 2023 01:15:00")
  console.log(typeof time.getHours(),time.getHours()%12,"hour")
  return (
    <div>
    <Heading>Home</Heading>
    <TaskForm/>
    </div>
  )
}

export default Home
