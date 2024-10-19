const mongoose = require("mongoose")
const ClientSchema = new mongoose.Schema({
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
    SubscribedChannels:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client",
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("Client",ClientSchema)