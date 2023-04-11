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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import "./task.css";
import { GrAdd, IconName } from "react-icons/gr";
import { context } from "../Context/Context";
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
  durationH:1,
  durationM:0,
  durationS:new Date().getSeconds()
 
};
const TaskForm = () => {
  let [data, setdata] = useState(inidata);
  let toast = useToast();
  let [loading,setLoading]=useState(false)
  let {light}=useContext(context)
  //localStorage.setItem("infoforcalender",JSON.stringify(res.data.data))

  function handleChange(e) {
    if (e.target.name == "date") {
      console.log(e.target.value, typeof e.target.value);
      let [year, month, date] = e.target.value.split("-");
      year = parseInt(year);
      month = parseInt(month);
      date = parseInt(date);

      console.log(parseInt(date));
      setdata({ ...data, year, date, month });
    } else if (e.target.name == "time") {
      let [hour, minute] = e.target.value.split(":");
      hour = parseInt(hour);
      minute = parseInt(minute);
      hour > 12
        ? setdata({ ...data, meridian: 2, hour: hour, minute })
        : setdata({ ...data, meridian: 1, hour, minute });
    } else if (e.target.name === "importance") {
      e.target.value = Number(e.target.value);
      setdata({ ...data, [e.target.name]: e.target.value });
    } else if (e.target.name == "process") {
      e.target.value == "Not Done"
        ? setdata({ ...data, process: false })
        : setdata({ ...data, process: true });
    }else if(e.target.name=="duration"){
      let [hour, minute] = e.target.value.split(":");
      hour=parseInt(hour)
      minute=parseInt(minute)
      setdata({ ...data, "durationH": hour,"durationM":minute });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  }

  function handleClick(e) {
    e.preventDefault();
    posttaskInAPI();
  }

  const posttaskInAPI = async () => {
    setLoading(true)
    let token = localStorage.getItem("calenderToken");
    console.log(token);
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
      <Box m={"auto"}>
        <Container bg={light?"white":"black"}  borderRadius={"10px"} p={5} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} maxW="md">
          <FormLabel>Your Task</FormLabel>
          <Input
            id="addingtaskInput"
            placeholder="Enter Your Task"
            name="task"
            value={data.task}
            type="text"
            onChange={handleChange}
            required
            maxLength={"30"}
          />
          <FormLabel>Importance of task</FormLabel>
          <Select
            id="addingtaskInput"
            placeholder="Choose Imprtannce of Task"
            name="importance"
            value={data.importance}
            onChange={handleChange}
          >
            <option value="1">Very Important</option>
            <option value="2">Moderate</option>
            <option value="3">Low</option>
          </Select>
          <Box display={"flex"}>
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
          </Box>
          <FormLabel>Duration </FormLabel>
          <Input
                id="addingtaskInput"
                type="time"
                w="100%"
                placeholder="Enter Duration In Hours"
                onChange={handleChange}
                name="duration"
              />
          {/* <Input  id="addingtaskInput" name="duration" placeholder="Enter Duration In Hours"/> */}
          <FormLabel>
            Status :{" "}
            <Select
              id="addingtaskInput"
              placeholder="Status"
              onChange={handleChange}
              name="process"
            >
              <option value="Not Done">Not Done</option>
              <option value="Process">Process</option>
            </Select>
          </FormLabel>
          <Button   _hover={{bg:"#B794F4"}} borderRadius={"20px"} bg={"#B794F4"} color={"white"} w="100%" isLoading={loading} onClick={handleClick}> Add task</Button>
        </Container>
        
      </Box>
     
    </div>
  );
};

export default TaskForm;
