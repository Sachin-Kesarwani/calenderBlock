

let mongoose=require("mongoose")

let signupShema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

let loginSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

let SignupModel=mongoose.model("users",signupShema)
let loginModel=mongoose.model("users",signupShema)

module.exports={SignupModel,loginModel}