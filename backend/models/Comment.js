const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    VideoId:{type:mongoose.Schema.Types.ObjectId,ref:"Video",required:true},
    UserId:{type:mongoose.Schema.Types.ObjectId,ref:"Client",required:true},  
    CommentText:{type:String,required:true},
    Likes:{type:Number,default:0},
    LikedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"Client"}],
    DisLikedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"Client"}],
    DisLikes:{type:Number,default:0},
},{timestamps:true})

module.exports = mongoose.model("Comment",CommentSchema)