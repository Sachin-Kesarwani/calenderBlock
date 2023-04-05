import { Badge } from '@chakra-ui/react'
import React from 'react'
import { Icon } from '@chakra-ui/react'
const TimeBadge = ({data}) => {
  return <Badge w="70px" marginLeft={"140px"}> <CircleIcon color={`${data.hour%12==9?"red.500":"green.500"}`}/> {` ${data.hour%12} : ${data.minute<10?`0${data.minute}`:data.minute} : ${data.meridian==1?"AM":"PM"}`}</Badge>
}

export default TimeBadge

const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )