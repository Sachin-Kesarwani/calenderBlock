let jwt=require("jsonwebtoken");
const { SignupModel } = require("../Model/user.model");

require("dotenv").config()
const taskmiddleware=(req,res,next)=>{
    let token=req?.headers?.authorization?.split(" ")[1]
    jwt.verify(token, process.env.secretkey,async function(err, decoded) {
      
      if(decoded){
       let storeduser=await SignupModel.findOne({_id:decoded.userid})
          
        if(storeduser){
            req.body.userid=decoded.userid
            next()
        }else{
            res.status(400).send({"msg":"User Not Found"})
        }
      }else{
        res.status(400).send({"msg":"Not Authorized"})
      }
       
      });
   
    
}

module.exports=taskmiddleware