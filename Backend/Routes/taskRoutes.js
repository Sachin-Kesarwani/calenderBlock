let { Router } = require("express");
const Cryptr = require('cryptr');
let taskRoutes = Router();
let taskmiddleware = require("../Middleware/task.middle");

require("dotenv").config()
const taskModel = require("../Model/task.model");
taskRoutes.get("/", (req, res) => {
  res.status(200).send({ msg: "Home of tasks" });
});

taskRoutes.post("/add", taskmiddleware, async (req, res) => {

  let data = req.body;

  const cryptr = new Cryptr(process.env.secretkey);
  data.task=cryptr.encrypt(data.task);
  if (data.durationH + data.hour >= 24) {
    let min = 24 * 60 - (data.hour * 60 + data.minute);
    data.durationH = Math.floor(min / 60);
    data.durationM = min % 60;
  } else if (data.durationH + data.hour < 24) {
    data.durationH = data.durationH;
    data.durationM = data.durationM;
  }


  try {
    let postdata = new taskModel(data);
    await postdata.save();
    res.status(200).send({ msg: "Sucessfully Added" });
  } catch (error) {
    res.status(400).send({ msg: "Somethin is missing" });
  }
});

taskRoutes.get("/data", taskmiddleware, async (req, res) => {
  let { userid } = req.body;
  let { year, month, date } = req.query;
 
 
  
  try {
    const cryptr = new Cryptr(process.env.secretkey);
    let alldata = await taskModel.find({ userid: userid, year, month, date });
    if (alldata.length > 0) {
      for(let i=0;i<alldata.length;i++){
        alldata[i].task=cryptr.decrypt(alldata[i].task)
      }
      res.status(200).send({ msg: "Your tasks", data: alldata });
    } else {
      res.status(200).send({ msg: "Not task for you",data:[] });
    }
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});


taskRoutes.get("/search",taskmiddleware,async(req,res)=>{
    let {task,date,month,year}=req.query
    const cryptr = new Cryptr(process.env.secretkey);
    let { userid } = req.body;
     if(!date && !month &&!year){
  
      
      try {

        let alldata=await taskModel.find( {userid: userid})
    
        if(alldata.length>0){
      
          for(let i=0;i<alldata.length;i++){
            alldata[i].task=cryptr.decrypt(alldata[i].task)

          }
          let newdata=alldata.filter((e)=>e.task.toLowerCase().includes(task.toLowerCase()))
         console.log(newdata)
          res.status(200).send({msg:"Serched task",data:newdata})
        }else{
          res.status(200).send({msg:"Nothing matched with this task1",data:[]})
        }
       
     } catch (error) {
      console.log(error)
      res.status(400).send({msg:"Something went wrong"})
     }
 }else{
  console.log("inside else",typeof year,year,typeof date ,date,typeof month,month,typeof task ,task)
  try {
    let alldata=await taskModel.find({userid:userid,date,month,year})
    console.log("alldata")
    if(alldata.length>0){
  
      for(let i=0;i<alldata.length;i++){
        alldata[i].task=cryptr.decrypt(alldata[i].task)

      }
      let newdata=alldata.filter((e)=>e.task.toLowerCase().includes(task.toLowerCase()))
     console.log(newdata)
      res.status(200).send({msg:"Serched task",data:newdata})
    }else{
      res.status(200).send({msg:"Nothing matched with this task1",data:[]})
    }
   
 } catch (error) {
  console.log(error)
  res.status(400).send({msg:"Something went wrong"})
 }
 }
    
    //  let data=await moviemodel.find({Title:{$regex:s,$options:"i"}})
})


taskRoutes.patch("/update/:id", taskmiddleware, async (req, res) => {
  let data = req.body;
  let id = req.params.id;

  let task = data.task;
  delete data.userid;
  delete data.task;

  try {
    await taskModel.findByIdAndUpdate({ _id: id }, data);
    let newdata = await taskModel.find({ _id: id });

    res
      .status(200)
      .send({
        msg: `Your task ${task} has Successfully updated`,
        data: newdata,
      });
  } catch (error) {
    res.status(400).send({ msg: `Something went wrong with ${task} task` });
  }
});

taskRoutes.delete("/delete/:id", taskmiddleware, async (req, res) => {
  let id = req.params.id;

  try {
    await taskModel.findByIdAndDelete({ _id: id });


    res
      .status(200)
      .send({
        msg: `Remove From Calender`,
     
      });
  } catch (error) {
    res.status(400).send({ msg: `Something went wrong ` });
  }
});

module.exports = taskRoutes;
