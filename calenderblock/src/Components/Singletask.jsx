import { Badge, Box, Text } from '@chakra-ui/react'
import React from 'react'
import TimeBadge from './TimeBadge'

const Singletask = ({data}) => {
  return (
    <div>
       <Box margin={"auto"} bg={"white"} boxShadow={"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"} borderRadius={"5px"} padding={"5px"} w={"250px"}>
     <TimeBadge data={data}/>
     <Text textAlign={"left"}>Task : {data.task} </Text>
     <Text textAlign={"left"}>Status :{data.status?"Completed":"Not Completed"}</Text>
      </Box>
    </div>
  )
}

export default Singletask
