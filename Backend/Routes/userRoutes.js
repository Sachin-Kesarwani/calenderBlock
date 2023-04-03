


let {Router}=require("express")
const { SignupModel } = require("../Model/user.model")
let userRoute=Router()
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
userRoute.get("/",(req,res)=>{
    res.status(200).send({"msg":"Sinup and Login Basic Route"})
})

userRoute.post("/signup",async(req,res)=>{
    let data=req.body
    try {
        let storeddata=await SignupModel.find({email:data.email})
        if(storeddata.length==0){
            bcrypt.hash(data.password, 8,async function(err, hash) {
                data.password=hash
                let postdata=new SignupModel(data)
                await postdata.save()
                delete data.password
                let token = jwt.sign({ key: 'sachin' }, process.env.secretkey);
                 res.status(200).send({"msg":"Successfully Signup",data:data,token,token})
            });
        }else{
            res.status(200).send({"msg":"User Exist , Please Login "})
        }
    } catch (error) {
        res.status(200).send({"er":"Something went wrong in Signup"})
    }
})


userRoute.post("/login",async(req,res)=>{
    let data=req.body
    console.log(data)
    try {
    
        let storeddata=await SignupModel.find({email:data.email})
        if(storeddata.length>0){
            console.log(storeddata[0].password,data.password)
            bcrypt.compare(data.password,storeddata[0].password, function(err, result) {
                console.log(result,"result")
                if(result){
                    let data=storeddata[0]
        
                    console.log(data)
                     let token = jwt.sign({ key: 'sachin' }, process.env.secretkey);
                     res.status(200).send({"msg":"Successfully Signup",data:{email:data.email,name:data.name},token,token})
                }else{
                    res.status(200).send({"msg":"password is wrong"})
                }
            });

        
        }else{
            res.status(200).send({"msg":"You have not Signup till now"})
        }
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong in login"})
    }
})
module.exports=userRoute