import {
  Box,
  FormLabel,
  Select,
  Input,
  option,
  Container,
  Button,
  useToast,
  Icon,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import "./task.css";
import { GrAdd, IconName } from "react-icons/gr";
import { context } from "../Context/Context";
import { useRef } from "react";
import Cookies from 'js-cookie';
let inidata = {
  year: new Date().getFullYear(),
  month: new Date().getMonth()+1,
  // day:new Date().getDay(),
  date: new Date().getDate(),
  hour: new Date().getHours()+1,
  minute: new Date().getMinutes(),
  meridian: new Date().getHours()+1%12>0?2:1,
  task: "",
  importance: 1,
  status: false,
  process: false,
  durationH:0,
  durationM:0,
  durationS:new Date().getSeconds()
 
};
const TaskForm = () => {
  let [data, setdata] = useState(inidata);
  let toast = useToast();
  let [loading,setLoading]=useState(false)
  let {light}=useContext(context)
  let [disabled,setDisable]=useState(true)

  //localStorage.setItem("infoforcalender",JSON.stringify(res.data.data))

  function handleChange(e) {
    if (e.target.name == "date") {
      console.log(e.target.value, typeof e.target.value);
      let [year, month, date] = e.target.value.split("-");
      year = parseInt(year);
      month = parseInt(month);
      date = parseInt(date);

      setdata({ ...data, year, date, month });
    } else if ( e.target.name == "time") {
     
      let [hour, minute] = e.target.value.split(":");
   
      hour = parseInt(hour);
      minute = parseInt(minute);
      hour >=12
        ? setdata({ ...data, meridian: 2, hour: hour, minute })
        : setdata({ ...data, meridian: 1, hour, minute });
    } else if (e.target.name === "importance") {
      e.target.value = Number(e.target.value);
      setdata({ ...data, [e.target.name]: e.target.value });
    } else if (e.target.name == "process") {
      e.target.value == "Not Done"
        ? setdata({ ...data, process: false })
        : setdata({ ...data, process: true });
    }else if(e.target.name=="durationH"){
      console.log(e.target.value,parseInt(e.target.value))
     
       
        let value=(Number(e.target.value))
  
              setdata({ ...data, "durationH": value, });
       
    
     
             
    } else if(e.target.name=="durationM"){
    
        let value=(Number(e.target.value))

        setdata({ ...data, "durationM": value, });
      
    }else{
      if(e.target.name=="task"&&e.target.value.length>=5){
        setDisable(false)
      }else{
        setDisable(true)
      }
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if(data.task.length==0){
      toast({
        title: `Please Fill Task`,
        status: "warning",
        isClosable: true,
        position:"top"
      });
      
    }else{
      posttaskInAPI();
    }
 
  }

  const posttaskInAPI = async () => {
    setLoading(true)
   // console.log(data)
    let token=Cookies.get('calenderToken')
  
    await axios({
      url: "https://crazy-pink-crocodile.cyclic.app/tasks/add",
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((res) => {
        setLoading(false)
        toast({
          title: `${res.data.msg}`,
          status: "success",
          isClosable: true,
          position:"top"
        });
        setdata(inidata)
      })
      .catch((er) => {
        setLoading(false)
        toast({
          title: `${er.response.data.msg}`,
          status: "warning",
          isClosable: true,
          
          position:"top"
        });
      });
  };

  return (
    <div>
      <Heading fontFamily={"initial"}>Add Task</Heading>
      <Box m={"auto"}>
        <Container bg={light?"white":"black"}  borderRadius={"10px"} p={5} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} maxW="md">
          <FormLabel>Your Task :</FormLabel>
          <Input
            id="addingtaskInput"
            placeholder="Enter Your Task Atleast of 5 characters"
            name="task"
            value={data.task}
      
            type="text"
            onChange={handleChange}
            required
            maxLength={"30"}
          />
          <FormLabel>Importance of task :</FormLabel>
          <Select
            id="addingtaskInput"
            placeholder="Choose Imprtannce of Task"
            name="importance"
            // value={data.importance}
            onChange={handleChange}
          >
            <option value="1">Very Important</option>
            <option value="2">Moderate</option>
            <option value="3">Low</option>
          </Select>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
            <FormLabel>
              Date :{" "}
              <Input
                id="addingtaskInput"
                w="100%"
                name="date"
                onChange={handleChange}
                type="date"
          
              />
            </FormLabel>

            <FormLabel>
              Time :{" "}
              <Input
                id="addingtaskInput"
                type="time"
                w="100%"
                placeholder="Minute"
                onChange={handleChange}
                name="time"
              />{" "}
            </FormLabel>
          </div>
          <FormLabel>Duration :</FormLabel>
         <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
         <Select    w="90%"  id="addingtaskInput"   placeholder="Duration In Hours"  name="durationH"  onChange={handleChange}  >
                {/* <option>Duration In Hours</option> */}
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </Select>
                {/* <Input
       
       id="addingtaskInput"
       type="text"
     maxLength="2"
       w="50%"
       placeholder="Duration In Minute"
       onChange={handleChange}
       name="durationM"
     /> */}
     <Select   id="addingtaskInput"    w="90%"
       placeholder="Duration In Minute"     name="durationM"    onChange={handleChange}>
    <option value="0">0</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
      <option value="30">30</option>
      <option value="35">35</option>
      <option value="40">40</option>
      <option value="45">45</option>
      <option value="50">50</option>
      <option value="55">55</option>
      <option value="59">59</option>

     </Select>
         </div>
            
               
          {/* <Input  id="addingtaskInput" name="duration" placeholder="Enter Duration In Hours"/> */}
          <FormLabel>
            Status :{" "}
            <Select
              id="addingtaskInput"
              placeholder="Choose Status of Task"
              onChange={handleChange}
              name="process"
            >
              <option value="Not Done">Not Done</option>
              <option value="Process">Process</option>
            </Select>
          </FormLabel>
          <Button isDisabled={disabled}   _hover={{bg:"#B794F4"}} borderRadius={"20px"} bg={"#B794F4"} color={"white"} w="100%" isLoading={loading} onClick={handleClick}> Add task</Button>
        </Container>
        
      </Box>
   
    </div>
  );
};

export default TaskForm;
