import { Badge, Button, Container, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import resume from "../Images/resume.pdf";
import mypic from "./mypic.jpg"
const About = () => {
  function redirect() {
    window.open(
      "https://drive.google.com/file/d/1zztPdp7ZZE-dTh7X4-V7oOVyuHH7TVXH/view",
      "_blank",
      "noreferrer"
    );
  }
  function redirecttolinkedin(){
    window.open(
      "https://www.linkedin.com/in/sachin-kesarwani-079002247/",
      "_blank",
      "noreferrer"
    );
  }
  function redirecttogithub(){
    window.open(
      "https://www.linkedin.com/in/sachin-kesarwani-079002247/",
      "_blank",
      "noreferrer"
    );
  }
  return (
    <div>
     <Heading>About Developer</Heading>
   
     <Container >
   <Text textAlign={"justify"}>
   Highly motivated and eager to learn new things. Hard-working , creative , proactive , and specialized in HTML , CSS ,JavaScript and Javascript framework React JS for frontend and MongoDB , ExpressJS and NodeJS for backend. Keep improving skill day by day. Ability to adapt in both self-starting and collaborative environments.
   </Text>
  </Container>
  <Button bg={"purple.400"} _hover={{bg:"purple.400"}} m={3} onClick={redirecttolinkedin}>Linkedin</Button>
  <Button  bg={"purple.400"} _hover={{bg:"purple.400"}} m={3} onClick={redirecttogithub}>Github</Button>
  <a
            href={resume}
   
            target="_blank"
            download="Sachin-Kesarwani.pdf"
          >
  <Button  bg={"purple.400"} _hover={{bg:"purple.400"}} color={"white"} onClick={redirect}>Resume</Button>
  </a>
  <div style={{display:"flex",justifyContent:"center",flexDirection:"column",width:"400px",margin:"auto"}}>
  <Text textAlign={"left"}><b>Contact me : </b>sachin.kesarwani67890@gmail.com</Text>
  <Text textAlign={"left"}><b>Contact number : </b>8470980680</Text>
  </div>
 
    </div>
  )
}

export default About
