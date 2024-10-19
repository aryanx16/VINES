const express = require("express")
const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const Client = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const ClientRouter = express.Router();
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME , 
    api_key:process.env.API_KEY , 
    api_secret: process.env.API_SECRET,
});
ClientRouter.get("/",(req,res)=>{
    // res.send("Client ROUTER IS WORKING PERFECTLY...")
    console.log("Client ROUTER IS WORKING PERFECTLY...")
})

ClientRouter.post("/register",async(req,res)=>{
    try{
        console.log(req.body);
        const ClientAlready = await Client.findOne({Email:req.body.Email})
        console.log(ClientAlready)
        if(ClientAlready){
            console.log("This email is already in use")
            return res.status(401).json({message:"User Already Exist! Please try another email"})
        }
        const UploadedImage = await cloudinary.uploader.upload(req.files.logo.tempFilePath)
        const HashedPassword = await bcryptjs.hash(req.body.Password,10)
        const NewClient = new Client({
            _id: new mongoose.Types.ObjectId,
            ChannelName:req.body.ChannelName,
            Phone:req.body.Phone,
            Email:req.body.Email,
            Password:HashedPassword,
            LogoId:UploadedImage.public_id,
            LogoUrl:UploadedImage.secure_url,
        })
        const createdClient = await NewClient.save()
        console.log(createdClient)
        res.json({message:"User registered successfully!"})
        console.log("/register IS WORKING PERFECTLY...")
    }
    catch(e){
        return res.status(500).json("Error in register..."+e)
    }
    
})
ClientRouter.post("/login",async(req,res)=>{
    console.log("/login IS WORKING PERFECTLY...")
    try{
        const {Email,Password}=req.body;
        const isUser = await Client.findOne({Email:Email})
        if(!isUser){
            console.log("User found");
            return res.status(401).json("User not found")
        }
        const CheckPassword = await bcryptjs.compare(req.body.Password,isUser.Password)
        if(!CheckPassword){
            console.log("INCORRECT PASSWORD")
            return res.status(401).json({message:"Incorrect Password"})
        }
        const token = jwt.sign({_id:isUser._id,Email:isUser.Email,ChannelName:isUser.ChannelName,Phone:isUser.Phone,LogoId:isUser.LogoId},process.env.jwtSecret)

        return res.json({token:token})
        
    }   
    catch(e){
        console.log("ERROR IN /login ..."+e)
        return res.status(500).json("ERROR IN /login..."+e)
    } 
})
ClientRouter.put("/profile",async(req,res)=>{
    res.send("/profile IS WORKING PERFECTLY...")
    console.log("/profile IS WORKING PERFECTLY...")
    
})
ClientRouter.post("/subscribe",async(req,res)=>{
    res.send("/subscribe IS WORKING PERFECTLY...")
    console.log("/subscribe IS WORKING PERFECTLY...")
})

module.exports=ClientRouter