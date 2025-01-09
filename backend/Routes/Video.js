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

VideoRouter.get("/subscribed",CheckAuth,async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const user = await jwt.verify(token,process.env.jwtSecret)
        const Subscribedchannels = await User.find({})
        return res.json({message:"Videos fetched successfully",subscribedVideos:subscribedVideos})
    }catch(e){
        return res.json({message:"Please try again",error:e})
    }
})
VideoRouter.get("/search",async(req,res)=>{
    try{
        const query = req.query.q;
        if(!query){
            return res.status(400).json({message:"Invalid Query"})
        }
        console.log(query)
        const results = await Video.find({
            $or: [
                { Title: { $regex: query, $options: 'i' } },
                { Description: { $regex: query, $options: 'i' } },
                { Tags: { $regex: query, $options: 'i' } },
                { Category: { $regex: query, $options: 'i' } }
            ]
        }).limit(20).populate('UserId') // Limit to 20 results
        console.log(results);
        return res.json(results)
    }catch(e){
        return res.json({message:"Please try again",error:e})
    }
})
VideoRouter.get("/fullvideo/:vid",async(req,res)=>{
    try{
        const token =await req.headers.authorization ? req.headers.authorization :false
        // console.log(token)
        // console.log(req.headers.authorization)
        let user = null
        if(token){
            try{
                user = await jwt.verify(token,process.env.jwtSecret)
            }catch(e){
                console.log("invalid token",e)
                return res.status(401).json({message:"Please login"})
            }
        }
        const vid = req.params.vid
        // console.log("video idddd ",vid)
        const video =await Video.findById(vid).populate('UserId')
        // console.log("KDJFKF")
        if(!video){
            return res.json({message:"Video not found"})
        }
        video.Views+=1;
        await video.save()
        const isSub = user? video.UserId.SubscribedBy.includes(user._id):false
        const isLike = user ? video.LikedBy.includes(user._id):false
        const isDislike = user ? video.DislikedBy.includes(user._id):false
        return res.json({video:video,isSub:isSub,isLike:isLike,isDisLike:isDislike})
    }catch(e){
        console.log(e)
        return res.json({message:"Error in video"})
    }
})
VideoRouter.post("/",CheckAuth,async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,process.env.jwtSecret)
        // console.log(req.files.Video.tempFilePath);
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
            ThumbnailUrl:UploadedThumbnail.secure_url,
            ThumbnailId:UploadedThumbnail.public_id,
            Category:req.body.Category,
        })
        const CreatedVideo = await newvideo.save();
        return res.json({message:"Vidoe Uploaded successfully!"})
    }catch(e){
        console.log("ERROR IN UPLOADIND VIDEO..."+e)
        return res.status(400).json({message:"ERROR IN UPLOADING VIDEO...",error:e})
    }
})
VideoRouter.get("/ownvideos",CheckAuth,async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const user = await jwt.verify(token,process.env.jwtSecret)
        const videos =await Video.find({UserId:user._id}).populate('UserId')
        return res.json({videos:videos})
    }catch(e){
        console.log(e)
        return res.json({message:"Unable to fetch videos"})
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
        if(user._id!=video.UserId){
            console.log("USER DOSENT HAVE ACCESS TO EDIT THIS VIDEO")
            return res.status(401).json({message:"You dont have acccess to edit this video"})
        }
        if(req.files){
            await cloudinary.uploader.destroy(video.ThumbnailId)
            const UpdatedThumbnail = await cloudinary.uploader.upload(req.files.Thumbnail.tempFilePath)
            const UpdatedData = {
                Title:req.body.Title,
                Description:req.body.Description,
                Category:req.body.Category,
                Tags:req.body.Tags.split(","),
                ThumbnailId:UpdatedThumbnail.public_id,
                ThumbnailUrl:UpdatedThumbnail.secure_url,  
            }
            const UpdatedVideo = await Video.findByIdAndUpdate(VideoId,UpdatedData,{new:true})
        }else{
            const UpdatedData = {
                Title:req.body.Title,
                Description:req.body.Description,
                Category:req.body.Category,
                Tags:req.body.Tags.split(","),
            }
            const UpdatedVideo = await Video.findByIdAndUpdate(req.params.VideoId,UpdatedData)
        }
        console.log("/upload working perfectly...")
    }catch(e){
        console.log("ERROR IN UPDATING VIDEO..."+e)
        return res.status(401).json({message:"Token invalid"})
    }
})
VideoRouter.delete("/:vid",async(req,res)=>{
    try{
        // console.log("video id :::: ",req.params.vid)
        // if (!mongoose.Types.ObjectId.isValid(req.params.vid)) {
        //     console.log("herreee")
        //     return res.status(400).json({ message: "Invalid Video ID" });
        // }
        const video = await Video.findById(req.params.vid)
        if(!video){
            console.log("VIDEO NOT FOUND...")
            return res.json({message:"VIDEO NOT FOUND"})
        }
        // console.log("video::::" ,video)
        const token = await req.headers.authorization.split(" ")[1]
        const verifyToken = await jwt.verify(token,process.env.jwtSecret)
        if(!verifyToken){
            return res.json({message:"INVALID TOKEN"})
        }
        console.log(verifyToken)
        console.log(video)
        try{
        if(verifyToken._id != video.UserId){
            return res.json({message:"YOU DONT HAVE ACCESS TO DELETE THIS VIDEO"})
        }

            const deletedVideo = await cloudinary.uploader.destroy(video.VideoId,{resource_type:'video'})
            const deletedThumbnail = await cloudinary.uploader.destroy(video.ThumbnailId,{resource_type:'image'})
        }catch(e){
            console.log("in cloudinary fault",e)
            return res.json({message:"An error occured !! Please try again!"})
        }
        const deletedVideoData = await Video.findByIdAndDelete(req.params.vid)
        console.log(deletedVideoData);
        console.log("/delte working perfectly...")
        return res.json({message:"Deleted"})
    }catch(e){
        console.log("EjhjRROR WHILE DELETING THE VIDEO..dd.",e)
        return res.status(401).json({message:"ERROR WHILE DELETING VIDEO...",error:e})
    }
})
VideoRouter.put("/like/:vid",CheckAuth,async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        if(!token){
            console.log("TOKEN ERROR WHILE LIKING THE VIDEO")
            return res.json({message:"TOKEN ERROR WHILE LIKING THE VIDEO"})
        }
        const user =await jwt.verify(token,process.env.jwtSecret)
        // console.log(user)
        if(!user){
            return res.json({message:"User not found"})
        }
        const video = await Video.findById(req.params.vid);
        
        console.log(video)
        console.log(video.LikedBy)
        const isLiked = video.LikedBy.includes(user._id)
        const isDisliked = video.DislikedBy.includes(user._id)
        console.log(isLiked)
        if(!isLiked && !isDisliked){
            video.LikedBy.push(user._id)
            video.Likes+=1;
        }else if(isDisliked){
            video.DislikedBy = video.DislikedBy.filter(uid=>uid.toString()!==user._id.toString())
            video.Dislikes-=1;
            video.LikedBy.push(user._id)
            video.Likes+=1;
        }else if(isLiked){
            video.LikedBy = video.LikedBy.filter(uid=>uid.toString()!== user._id.toString())
            video.Likes-=1;
        }
        await video.save()
        
        console.log("likedby",video.LikedBy)
        console.log("Dislikedby",video.DislikedBy)
        console.log("/upload working perfectly...")
    }catch(e){
        console.log("ERROR WHILE LIKING THE VIDEO",e)
        return res.json({message:"ERROR WHILE LIKING THE VIDEO"})
    }
})
VideoRouter.put("/dislike/:vid",CheckAuth,async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        if(!token){
            console.log("TOKEN ERROR WHILE LIKING THE VIDEO")
            return res.json({message:"TOKEN ERROR WHILE LIKING THE VIDEO"})
        }
        const user =await jwt.verify(token,process.env.jwtSecret)
        // console.log(user)
        if(!user){
            return res.json({message:"User not found"})
        }
        const video = await Video.findById(req.params.vid);
        // console.log(video)
        console.log(video.LikedBy)
        const isLiked = video.LikedBy.includes(user._id)
        const isDisLiked = video.DislikedBy.includes(user._id)
        console.log(isLiked)
        console.log(isDisLiked)
        if(!isLiked && !isDisLiked){
            video.DislikedBy.push(user._id)
            video.Dislikes+=1;
        }
        else if(isLiked){
            video.LikedBy = video.LikedBy.filter(uid=>uid.toString()!== user._id.toString())
            video.Likes-=1;
            video.DislikedBy.push(user._id)
            video.Dislikes+=1;
        }else if(isDisLiked){
            video.DislikedBy = video.DislikedBy.filter(uid=>uid.toString()!== user._id.toString())
            video.Dislikes-=1;
        }
        
        await video.save()
        console.log("likedby",video.LikedBy)
        console.log("Dislikedby",video.DislikedBy)
        console.log(video.LikedBy)
        console.log("/upload working perfectly...")
    }catch(e){
        console.log("ERROR WHILE LIKING THE VIDEO",e)
        return res.json({message:"ERROR WHILE LIKING THE VIDEO"})
    }
})
VideoRouter.put("/views/:vid",async(req,res)=>{
    try{
        const vid = req.params.vid;
        const video = await Video.findById({_id:vid})
        if(!video){
            return res.json({message:"VIDEO NOT FOUND"})
        }
        console.log(video);
        video.Views+=1;
        await video.save();
        console.log(video);
        res.send("Found")
    }catch(e){
        console.log("ERROR IN VIEWS API ... "+e);
        res.send("ERROR IN VIEWS")
    }
    console.log("/upload working perfectly...")
})
VideoRouter.get("/all",async(req,res)=>{
    try{

        const AllVideos = await Video.find({}).populate('UserId')
        // console.log(AllVideos)
        res.send(AllVideos)
    }
    catch(e){
        console.log("ERROR IN WHILE FETCHING VIDEOS...",e);
        res.send({message:'ERROR IN FETCHING VIDEOS...'});
    }
})
VideoRouter.get("/tags/:tags",async(req,res)=>{
    try{
        const tags= req.params.tags;
        const VideosByCategory  = await Video.find({Tags:{$in:tags}})
        console.log(VideosByCategory)
    }catch(e){
        console.log("ERROR IN FETCHING VIDEOS BY CATEGORY",e)
        return res.json({message:"ERROR IN FETCHING VIDEOS BY CATEGORY"})
    }
    console.log("/upload working perfectly...")
})
VideoRouter.get("/:category",(req,res)=>{
    console.log("/upload working perfectly...",e)
})




module.exports = VideoRouter