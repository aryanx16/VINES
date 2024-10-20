const express = require("express")
const CheckAuth = require("../middleware/CheckAuth")
const cloudinary = require("cloudinary").v2
const jwt = require('jsonwebtoken')
require("dotenv").config()
const VideoRouter = express.Router()
const Video =  require("../models/Video")
const { default: mongoose } = require("mongoose")
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME , 
    api_key:process.env.API_KEY , 
    api_secret: process.env.API_SECRET,
})
VideoRouter.post("/",CheckAuth,async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,process.env.jwtSecret)
        
        const UploadedVideo = await cloudinary.uploader.upload(req.files.Video.tempFilePath,{
            resource_type:'video'
        })
        const UploadedThumbnail = await cloudinary.uploader.upload(req.files.Thumbnail.tempFilePath,{
            resource_type:"image"
        })
        const newvideo = new Video({
            _id:new mongoose.Types.ObjectId,
            Title: req.body.Title,
            UserId:user._id,
            Description:req.body.Description,
            VideoUrl:UploadedVideo.secure_url,
            VideoId:UploadedVideo.public_id,
            Tags:req.body.Tags.split(","),
            ThumbailUrl:UploadedThumbnail.secure_url,
            ThumbailId:UploadedThumbnail.public_id,
            Category:req.body.Category,
        })
        const CreatedVideo = await newvideo.save();
        console.log(CreatedVideo);
        // console.log(UploadedThumbnail)
        // console.log(UploadedVideo)
        console.log("/upload working perfectly...")
    }catch(e){
        console.log("ERROR IN UPLOADIND VIDEO..."+e.message)
        return res.status(400).json({message:"ERROR IN UPLOADING VIDEO..."})
    }
})
VideoRouter.put("/:VideoId",async(req,res)=>{
    try{
        const VideoId = req.params.VideoId;
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,process.env.jwtSecret)
        const video = await Video.findById({_id:VideoId})
        if(!video){
            return res.json({message:"Video not found"})
        }
        console.log(video)
        if(user._id!=video.UserId){
            console.log("USER DOSENT HAVE ACCESS TO EDIT THIS VIDEO")
            return res.status(401).json({message:"You dont have acccess to edit this video"})
        }
        if(req.files){
            await cloudinary.uploader.destroy(video.ThumbailId)
            const UpdatedThumbnail = await cloudinary.uploader.upload(req.files.Thumbnail.tempFilePath)
            const UpdatedData = {
                Title:req.body.Title,
                Description:req.body.Description,
                Category:req.body.Category,
                Tags:req.body.Tags.split(","),
                ThumbailId:UpdatedThumbnail.public_id,
                ThumbailUrl:UpdatedThumbnail.secure_url,  
            }
            console.log(UpdatedData)
            const UpdatedVideo = await Video.findByIdAndUpdate(VideoId,UpdatedData,{new:true})
            console.log(UpdatedVideo)
        }else{
            const UpdatedData = {
                Title:req.body.Title,
                Description:req.body.Description,
                Category:req.body.Category,
                Tags:req.body.Tags.split(","),
            }
            const UpdatedVideo = await Video.findByIdAndUpdate(req.params.VideoId,UpdatedData)
            console.log(UpdatedVideo)
        }
        console.log("/upload working perfectly...")
    }catch(e){
        console.log("ERROR IN UPDATING VIDEO..."+e)
        return res.status(401).json({message:"Token invalid"})
    }
})
VideoRouter.delete("/",(req,res)=>{
    console.log("/upload working perfectly...")
})
VideoRouter.get("/",(req,res)=>{
    console.log("/upload working perfectly...")
})
VideoRouter.get("/:id",(req,res)=>{
    console.log("/upload working perfectly...")
})
VideoRouter.get("/:category",(req,res)=>{
    console.log("/upload working perfectly...")
})
VideoRouter.get("/:tags",(req,res)=>{
    console.log("/upload working perfectly...")
})

module.exports = VideoRouter