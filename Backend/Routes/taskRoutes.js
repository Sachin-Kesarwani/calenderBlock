let {Router}=require("express")

let taskRoutes=Router()
let taskmiddleware=require("../Middleware/task.middle")
const taskModel = require("../Model/task.model")
taskRoutes.get("/",(req,res)=>{
    res.status(200).send({"msg":"Home of tasks"})
})


taskRoutes.post("/add",taskmiddleware,async(req,res)=>{
          console.log(req.body,"12")
          let data=req.body
          console.log(data)
     
          if(data.durationH + data.hour>=24){
            let min=(24*60)-(data.hour*60+data.minute)
            data.durationH=Math.floor(min/60)
            data.durationM=min%60
          }else if (data.durationH+data.hour<24){
            data.durationH= data.durationH
            data.durationM=data.durationM
          }
         console.log(data)

        try {
            let postdata=new taskModel(data)
           await  postdata.save()
            res.status(200).send({"msg":"Sucessfully Added"})
        } catch (error) {
            res.status(400).send({"msg":"Somethin is missing"})
        }
})

taskRoutes.get("/data",taskmiddleware,async(req,res)=>{
    let {userid}=req.body
    let {year,month,date}=req.query
    console.log(year,"year",month,"month",date,"date")
      try {
        let alldata=await taskModel.find({userid:userid,year,month,date})
        if(alldata.length>0){
            res.status(200).send({"msg":"Your tasks",data:alldata})
        }else{
            res.status(200).send({"msg":"Not task for you"})
        }
      } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
      }
})

taskRoutes.patch("/update/:id",taskmiddleware,async(req,res)=>{
 
     let data=req.body
     let id=req.params.id
   
     let task=data.task
     delete data.userid
     delete data.task

  
     try {

          await taskModel.findByIdAndUpdate({_id:id},data)
       let newdata=await taskModel.find({_id:id})

          res.status(200).send({"msg":`Your task ${task} has Successfully updated`,data:newdata})
     } catch (error) {
      
      res.status(400).send({"msg":`Something went wrong with ${task} task`})
     }
})

module.exports=taskRoutes