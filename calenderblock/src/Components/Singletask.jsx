import { Badge, Box, Spinner, Switch, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import TimeBadge from "./TimeBadge";
import { context } from "../Context/Context";
import { useState } from "react";
import axios from "axios";
import Timer from "./Timer";
import Cookies from 'js-cookie';

import { GrFormClose } from "react-icons/gr";
const Singletask = ({ getalltasks, data }) => {
  let { light } = useContext(context);
  let [end, setEnd] = useState(false);
  let [status, setStatus] = useState(data.status);
  let [process, setProcess] = useState(data.process);
  let [loadingProcess, setLoadingprocess] = useState(false);
  let [loadingStatus, setLoadingStatus] = useState(false);
  let [delLoading, setdelLoading] = useState(false);
  let [disable,setDisable]=useState(false)
  const switchaudio = useRef(null);
  const deleteaudio = useRef(null);
  function handlestatus(id) {

    setStatus(!status);
    if(data.status==true){
      setProcess(data.process)
    }else{
      setProcess(true)
    }
    setLoadingStatus(true);
    setDisable(true)
    handleStatusProcess("status").then(() => {
      switchaudio?.current?.play()
      setLoadingStatus(false);
      setDisable(false)
    });
  }
  function handleprocess(id) {
   
    setProcess(!process);
    setDisable(true)
    setLoadingprocess(true);
    handleStatusProcess("process").then(() => {
      switchaudio?.current?.play()
    
      setLoadingprocess(false);
      setDisable(false)
    
    });
  }

  async function handleStatusProcess(key) {
  
    let obj={ task: data.task}
    if(key=="process"){
      obj.process=!data.process
    }else if(key=="status"){
      console.log("inside status")
      if(data.status==true){
        console.log("inside if")
        obj.status=false
      }else if(data.status==false){
        console.log("inside else if")
       obj.status=true
        obj.process=true
      }
    }
    
    let id = data._id;
    let token=Cookies.get('calenderToken')||""
    return await axios({
      url: `https://crazy-pink-crocodile.cyclic.app/tasks/update/${id}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: obj,
    })
      .then((res) => {
        getalltasks();
      })
      .catch((error) => {});
  }

  async function delcalenderBlock(id) {
    setdelLoading(true);
    let token=Cookies.get('calenderToken')||""
    deleteaudio?.current?.play()
    await axios({
      url: `https://crazy-pink-crocodile.cyclic.app/tasks/delete/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setdelLoading(false);
        // deleteaudio?.current?.play()
        getalltasks();
       
      })
      .then((er) => {});
  }
  useEffect(() => {

    let start = data.hour * 60 + data.minute;
    let current =
      Number(new Date().getHours() * 60) + Number(new Date().getMinutes());
    let endtime = start + data.durationH * 60 + data.durationM;

    // function getDaysInMonth(year, month) {
    //   return new Date(year, month, 0).getDate();
    // }
    // const daysInmonthPrev = getDaysInMonth(data.year, data.month);
    // console.log(daysInSeptember);
    if (current > endtime) {
      setEnd(true);
    }
 
  }, []);
// console.log(data)
console.log(data.task)
  return (
    <div key={data._id} style={{ marginTop: "10px" }}>
      <Box
        margin={"auto"}
        bg={light ? "white" : "black"}
        h={"210px"}
        boxShadow={
          " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
        }
        borderRadius={"5px"}
        padding={"10px"}
        w={"300px"}
      >
        <Timer
          key={data._id}
          data={data}
          delLoading={delLoading}
          delcalenderBlock={delcalenderBlock}
        />
        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b>Task :</b> {data.task}{" "}
        </Text>
        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b> Process : </b> {data.process ? "Started" : "Not Started"} &nbsp;{" "}
          {loadingProcess ? (
            <Spinner size="xs" />
          ) : (
            <Switch
              colorScheme="blue"
              // bg={"black"}
              borderRadius={"50px"}
              isChecked={process}
              onChange={() => handleprocess(data._id)}
              size="sm"
              isDisabled={disable||status}
            />
          )}
        </Text>
        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b> Status :</b> {data.status ? "Completed" : "Not Completed"} &nbsp;{" "}
          {loadingStatus ? (
            <Spinner size="xs" />
          ) : (
            <Switch
              colorScheme="blue"
        
              borderRadius={"50px"}
              isChecked={status}
              onChange={() => handlestatus(data._id)}
              size="sm"
              isDisabled={disable}
            />
          )}
        </Text>

        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b>Duration : </b>{" "}
          <Badge color={light ? "black" : "black"} bg={"gray.300"}>
            {data.durationH || data.durationM
              ? ` You Decided ${data.durationH}h : ${
                  data.durationM ? data.durationM : "0"
                }m `
              : "Not Decided"}
          </Badge>
        </Text>
        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b>Importance : </b>{" "}
          <Badge
            color={"white"}
            bg={
              data.importance == 1
                ? "red.400"
                : data.importance == 2
                ? "orange.300"
                : "green.300"
            }
          >
            {" "}
            {data.importance == 1
              ? "Very Important"
              : data.importance == 2
              ? "Moderate"
              : "Low"}
          </Badge>
        </Text>
        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b>Decided Time : </b>
          <TimeBadge key={data._id} data={data} />
        </Text>
        <Text color={light ? "black" : "white"} textAlign={"left"}>
          <b>Decided Date : </b>
          <Badge>{`${data.date}-${
            data.month == 1
              ? "Jan"
              : data.month == 2
              ? "Feb"
              : data.month == 3
              ? "Mar"
              : data.month == 4
              ? "Apr"
              : data.month == 5
              ? "May"
              : data.month == 6
              ? "June"
              : data.month == 7
              ? "July"
              : data.month == 8
              ? "Aug"
              : data.month == 9
              ? "Sep"
              : data.month == 10
              ? "Oct"
              : data.month == 11
              ? "Nov"
              : "Dec"
          }-${data.year}`}</Badge>
        </Text>
        {/* {
      data.status==false&&end==true&& <Badge  color="white" margin={"auto"} w="90px" bg={"green.500"} p={1}m={3}>Reshedule</Badge>
     }
       */}
      </Box>
      <audio src="./switch.mp3" ref={switchaudio} />
    
       
       <audio src="./delete.mp3" ref={deleteaudio} />
    </div>
  );
};

export default React.memo(Singletask) ;


