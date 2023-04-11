let mongoose=require("mongoose")


let taskSchema=mongoose.Schema({

    year:{type:Number,required:true}, 
    month:{type:Number,required:true},
    date:{type:Number,required:true},
    hour:{type:Number,required:true},
    task:{type:String,required:true},
    minute:{type:Number,required:true},
    meridian:{type:Number,required:true},
    importance:{type:Number,required:true},
    process:{type:Boolean,required:true},
    status:{type:Boolean,required:true},
    userid:{type:String,required:true},
    durationH:{type:Number,required:true},
    durationM:{type:Number,required:false},
    duration:String,
    durationS:Number
})

let taskModel=mongoose.model("task",taskSchema)

module.exports=taskModel