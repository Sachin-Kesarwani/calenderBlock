
let express=require("express")
const connection=require("./connection")
const userRoute = require("./Routes/userRoutes")
let cors=require("cors")
const taskRoutes = require("./Routes/taskRoutes")
let app=express()

require("dotenv").config()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Your Calender home route"})
})

app.use("/users",userRoute)
app.use("/tasks",taskRoutes)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("server connected to atlas")
    } catch (error) {
        console.log("error in connection with atlas")
    }
    console.log("server is running")
})