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
ClientRouter.post("/subscribe/:youtuberid",async(req,res)=>{
    try{

        const token = req.headers.authorization.split(" ")[1]
        const userverify = await  jwt.verify(token,process.env.jwtSecret)
        const user = await Client.findOne({_id:userverify._id})
        if(!user || !token){
            return res.json({message:"Please Login to Subscribe"})
        }
        const youtuberid = req.params.youtuberid
        const youtuber = await Client.findOne({_id:youtuberid})
        if(!youtuber){
            console.log("Youtuber dosen't exist ")
            return res.json({message:"Youtuber dosent exist"})
        }
        // console.log("youtuber",youtuber)
        const alreadysub = youtuber.SubscribedBy.includes(user._id)
        console.log("alreadysub : ",alreadysub)
        if(alreadysub){
            youtuber.SubscribedBy=youtuber.SubscribedBy.filter(id=>{user._id.toString()!== id.toString()})
            console.log("Unsubscribed")
            user.SubscribedChannels=user.SubscribedChannels.filter(id=>id.toString()!== youtuber._id.toString())
            youtuber.Subscribers-=1;
            await user.save()
            await youtuber.save()
            console.log("user", user)
            console.log("youtuber",youtuber)
            return res.json({message:"Unsubscribed"})
        }else{
            user.SubscribedChannels.push(youtuber._id)
            youtuber.SubscribedBy.push(user._id)
            youtuber.Subscribers+=1;
            await youtuber.save();
            await user.save();
            console.log("user",user)
            console.log("youtuber",youtuber)
            return res.json({message:"Subscribed"})
        }
        
        // console.log("/subscribe IS WORKING PERFECTLY...")
    }catch(e){
        console.log("ERROR WHILE SUBSCRIBING...",e)
        return res.json({message:"ERROR WHILE SUBSCRIBING"})
    }
})

module.exports=ClientRouter