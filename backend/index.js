const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const fileUpload = require("express-fileupload")
const {connectWdb} = require("./db")
const userRouter = require("./Routes/User")
const VideoRouter = require("./Routes/Video")
require("dotenv").config()
connectWdb();//DATABASE
app.listen(3000,()=>{
    console.log("listening...")
})
app.use(bodyparser.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//----------------USER MIDDLEWARE--------------
app.use("/user",userRouter)
//---------------------------------------------
//----------------VIDEO MIDDLEWARE--------------
app.use("/video",VideoRouter)
//---------------------------------------------

app.get("/",(req,res)=>{
    console.log("Server is running perfectly...")
    res.status(200).json("Server is running perfectly...")
})