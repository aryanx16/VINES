const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ChannelName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Phone:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    LogoUrl:{
        type:String,
        required:true,
    },
    LogoId:{
        type:String,
        required:true,
    },
    Subscribers:{
        type:Number,
        default:0,
    },
    SubscribedBy:[{type:mongoose.Schema.Types.ObjectId , ref:"User"}],
    SubscribedChannels:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)