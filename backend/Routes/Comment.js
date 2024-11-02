const express = require("express")
const CommentRouter = express.Router();
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken")
const CheckAuth = require("../middleware/CheckAuth");
const Video = require("../models/Video");
CommentRouter.get("/",async(req,res)=>{
    try{
        res.json("COMMENT FETCHED SUCCESSFULLY..")
        console.log("/comment is running perfectly")
    }catch(e){
        console.log("ERROR IN ",e)
        return res.status(401).json("ERROR IN COMMENT")
    }
})
CommentRouter.get("/:vid",async(req,res)=>{
    try{
        const VideoId = req.params.vid;
        const isVideo = await Video.findOne({_id:VideoId})
        if(!isVideo){
            console.log("VIDEO NOT FOUND");
            return res.status(301).json("VIDEO NOT FOUND");
        }
        const Comments = await Comment.find({VideoId:VideoId})
        console.log(Comments)
        return res.json({Comments})
    }catch(e){
        console.log("ERROR IN COMMENTS",e);
    }
})
CommentRouter.post("/:vid",CheckAuth,async(req,res)=>{
    try{
        const CommentText = req.body.CommentText;
        const vid = req.params.vid;
        const video = await Video.findOne({_id:vid})
        console.log(video);
        console.log(vid);
        if(!video){
            console.log("VIDEO NOT FOUND");
            return res.status(411).json({message:"VIDEO NOT FOUND"})
        }
        console.log("Video",video);
        const token = req.headers.authorization.split(" ")[1]
        const user = await jwt.verify(token,process.env.jwtSecret)
        console.log("user",user)
        const NewComment = new Comment({
            CommentText:CommentText,
            VideoId:video._id,
            UserId:user._id,
        })
        const AddedComment = await NewComment.save()
        console.log("Comment",AddedComment)
        // console.log(CommentText)
        res.json("COMMENT FETCHED SUCCESSFULLY..")
        console.log("/comment is running perfectly")
    }catch(e){
        console.log("ERROR IN ",e)
        return res.status(401).json("ERROR IN COMMENT")
    }
})
CommentRouter.put("/:cid",CheckAuth, async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const isUser = await jwt.verify(token,process.env.jwtSecret);
    if(!isUser){
        console.log("USER DOSENT EXIST");
        res.status(401).json({message:"USER DOSENT EXIST"})
    }
    const CommentId = req.params.cid;
    const IsComment = await Comment.findOne({_id:CommentId})
    if(!IsComment){
        console.log("COMMENT NOT FOUND");
        return res.status(404).json({message:"COMMENT NOT FOUND"})
    }
    const SameUser = (isUser._id===IsComment.UserId.toString());
    if(!SameUser){
        console.log("YOU CANT EDIT")
        return res.status(300).json({message:"YOU CANT EDIT"})
    }
    const UpdatedComment = req.body.CommentText;
    if(!UpdatedComment){
        console.log("Empty message")
        return res.status(300).json({message:"Empty"})
    }
    const UpdatedData = await Comment.findByIdAndUpdate(CommentId,{CommentText:UpdatedComment},{new:true})
    return res.json({message:"COMMENT UPDATED!"})
})

CommentRouter.delete("/:cid",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const isUser = await jwt.verify(token,process.env.jwtSecret);
    if(!isUser){
        console.log("YOU ARE NOT LOGGED IN ")
        return res.status(401).json({message:"YOU ARE NOT LOGGED IN "})
    }
    const isComment = await Comment.findOne({_id:req.params.cid})
    if(!isComment){
        console.log("COMMENT NOT FOUND")
        return res.status(300).json({message:"COMMENT NOT FOUND"})
    }
    const SameUser = (isUser._id === isComment.UserId.toString())
    console.log(SameUser)
    const DeletedComment = await Comment.findByIdAndDelete({_id:req.params.cid})
    console.log(DeletedComment);
})

CommentRouter.put("/like/:cid",CheckAuth,async(req,res)=>{
    const comment = await Comment.findOne({_id:req.params.cid})
    if(!comment){
        console.log("COMMENT NOT EXIST")
        return res.status(311).json({message:"COMMENT NOT EXIST"})
    }
    const token = req.headers.authorization.split(" ")[1]
    const user = await jwt.verify(token,process.env.jwtSecret)
    const sameuser = user._id === comment.UserId.toString()
    console.log(sameuser)
    const alreadyliked = comment.LikedBy.includes(user._id.toString())
    console.log(alreadyliked);
    const isDisliked = comment.DisLikedBy.includes(user._id.toString())
    if(!alreadyliked && !isDisliked){
        comment.LikedBy.push(user._id);
        comment.Likes+=1;
    }
    else if(!alreadyliked && isDisliked){
        comment.DisLikedBy = comment.DisLikedBy.filter(id=>id.toString()!== user._id.toString());
        comment.DisLikes-=1;
        comment.LikedBy.push(user._id);
        comment.Likes+=1;
    }
    else{
        comment.LikedBy = comment.LikedBy.filter(id=>id.toString()!==user._id.toString())
        comment.Likes-=1;
        // console.log("IN ELSE")
    }
    await comment.save();
    console.log(comment);

})
CommentRouter.put("/dislike/:cid",CheckAuth,async(req,res)=>{
    const comment = await Comment.findOne({_id:req.params.cid})
    if(!comment){
        console.log("COMMENT NOT EXIST")
        return res.status(311).json({message:"COMMENT NOT EXIST"})
    }
    const token = req.headers.authorization.split(" ")[1]
    const user = await jwt.verify(token,process.env.jwtSecret)
    const sameuser = user._id === comment.UserId.toString()
    console.log(sameuser)
    const alreadyliked = comment.LikedBy.includes(user._id.toString())
    console.log(alreadyliked);
    const isDisliked = comment.DisLikedBy.includes(user._id.toString())
    if(!alreadyliked && !isDisliked){
        comment.DisLikedBy.push(user._id);
        comment.DisLikes+=1;
    }
    else if(alreadyliked && !isDisliked){
        comment.LikedBy = comment.LikedBy.filter(id=>id.toString()!== user._id.toString());
        comment.Likes-=1;
        comment.DisLikedBy.push(user._id);
        comment.DisLikes+=1;
    }
    else{
        comment.DisLikedBy = comment.DisLikedBy.filter(id=>id.toString()!==user._id.toString())
        comment.DisLikes-=1;
        // console.log("IN ELSE")
    }
    await comment.save();
    console.log(comment);

})
module.exports=CommentRouter