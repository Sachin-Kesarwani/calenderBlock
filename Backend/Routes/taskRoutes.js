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
      try {
        let alldata=await taskModel.find({userid:userid})
        if(alldata.length>0){
            res.status(200).send({"msg":"Your tasks",data:alldata})
        }else{
            res.status(200).send({"msg":"Not task for you"})
        }
      } catch (error) {
        res.status(400).send({"msg":"Something went wrong"})
      }
})

module.exports=taskRoutes