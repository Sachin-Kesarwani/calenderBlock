import { Button } from '@chakra-ui/react';
import React from 'react';
import {AiFillCaretUp} from "react-icons/ai"
const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button borderRadius={"20px"} bg={"#38B2AC"} _hover={{bg:"#38B2AC"}} padding={"0px"}  onClick={handleScrollToTop}><AiFillCaretUp fontSize={"40px"}/></Button>
  );
};

export default ScrollToTopButton;
