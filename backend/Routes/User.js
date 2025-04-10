const express = require("express")
const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const CheckAuth = require("../middleware/CheckAuth")
const Video = require("../models/Video")
require("dotenv").config()
const ClientRouter = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
ClientRouter.get("/", (req, res) => {
    console.log("User ROUTER IS WORKING PERFECTLY...")
    res.send("User ROUTER IS WORKING PERFECTLY...")
})

ClientRouter.get("/u/:userid", async (req, res) => {
    try {
        const token = await req.headers.authorization ? req.headers.authorization : false

        const userid = req.params.userid
        let userlive = null
        if (token) {
            try {
                userlive = await jwt.verify(token, process.env.jwtSecret)
            }catch(e){
                console.log(e)
            }
        }
        const user = await User.findOne({ _id: userid }, { LogoUrl: 1, ChannelName: 1, Email: 1, Subscribers: 1,SubscribedBy:1 })
        const videos = await Video.find({ UserId: userid })
        const isSub = userlive? user.SubscribedBy.includes(userlive._id):false
        return res.json({ user, videos ,isSub})
    } catch (e) {
        console.log("error : ", e);
        return res.json({ message: "Error in profile" })
    }
})

ClientRouter.post("/register", async (req, res) => {
    try {
        const ClientAlready = await User.findOne({ Email: req.body.Email })
        if (ClientAlready) {
            console.log("This email is already in use")
            return res.status(401).json({ message: "User Already Exist! Please try another email", })
        }
        const UploadedImage = await cloudinary.uploader.upload(req.files.logo.tempFilePath)
        const HashedPassword = await bcryptjs.hash(req.body.Password, 10)
        const NewClient = new User({
            _id: new mongoose.Types.ObjectId,
            ChannelName: req.body.ChannelName,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Password: HashedPassword,
            LogoId: UploadedImage.public_id,
            LogoUrl: UploadedImage.secure_url,
        })
        const createdClient = await NewClient.save()
        console.log(createdClient)
        res.json({ message: "User registered successfully!" })
        console.log("/register IS WORKING PERFECTLY...")
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Error in register...", error: e })
    }

})
ClientRouter.post("/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const isUser = await User.findOne({ Email: Email })
        if (!isUser) {
            console.log("USER NOT FOUND");
            return res.status(401).json({ message: "User not found" })
        }
        const CheckPassword = await bcryptjs.compare(Password, isUser.Password)
        if (!CheckPassword) {
            console.log("INCORRECT PASSWORD")
            return res.status(401).json({ message: "Incorrect Password" })
        }
        const token = jwt.sign({ _id: isUser._id, Email: isUser.Email, ChannelName: isUser.ChannelName, Phone: isUser.Phone, LogoId: isUser.LogoId }, process.env.jwtSecret)
        return res.json({
            token: token,
            userId: isUser._id,
            channelName: isUser.ChannelName,
            email: isUser.Email,
            subscribers: isUser.Subscribers,
            logoId: isUser.LogoId,
            logoUrl: isUser.LogoUrl,
            subscribedChannels: isUser.SubscribedChannels,
            message: "Logged in successfully"
        })

    }
    catch (e) {
        console.log("ERROR IN /login ..." + e)
        return res.status(500).json({ message: "Error in login ! Please try again", error: e })
    }
})
ClientRouter.put("/profile/:uid", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const veriytoken = await jwt.verify(token, process.env.jwtSecret)
    if (!veriytoken) {
        console.log("TOKEN MISSING")
        return res.json({ message: "TOKEN MISSING ! PLEASE LOG IN " })
    }
    const user = await User.findOne({ _id: veriytoken._id })
    if (!user) {
        console.log("USER NOT EXIST")
        return res.json({ message: "USER NOT EXIST" })
    }
    // console.log(req.files)
    if (req.files) {
        const deletedlogo = await cloudinary.uploader.destroy(user.LogoId);
        const updatedlogo = await cloudinary.uploader.upload(req.files.logo.tempFilePath)
        const UpdatedData = {
            LogoUrl: updatedlogo.secure_url,
            LogoId: updatedlogo.public_id,
            ChannelName: req.body.ChannelName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: req.body.Password,
        }
        const UpdatedProfile = await User.findByIdAndUpdate(user._id, UpdatedData, { new: true })
        console.log(UpdatedProfile)
        return res.json({ message: "PROFILE UPDATED!" })
    } else {
        const UpdatedData = {
            ChannelName: req.body.ChannelName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: req.body.Password,
        }
        const UpdatedProfile = await User.findByIdAndUpdate(user._id, UpdatedData, { new: true })
        console.log(UpdatedProfile)
        return res.json({ message: "PROFILE UPDATED!" })

    }
})
ClientRouter.put("/subscribe/:youtuberid", CheckAuth, async (req, res) => {
    try {

        const token = req.headers.authorization.split(" ")[1]
        const userverify = await jwt.verify(token, process.env.jwtSecret)
        const user = await User.findOne({ _id: userverify._id })
        if (!user || !token) {
            return res.json({ message: "Please Login to Subscribe" })
        }
        const youtuberid = req.params.youtuberid
        const youtuber = await User.findOne({ _id: youtuberid })
        if (!youtuber) {
            console.log("Youtuber dosen't exist ")
            return res.json({ message: "Youtuber dosent exist" })
        }
        // console.log("youtuber",youtuber)
        const alreadysub = youtuber.SubscribedBy.includes(user._id)
        console.log("alreadysub : ", alreadysub)
        if (alreadysub) {
            youtuber.SubscribedBy = youtuber.SubscribedBy.filter(id => { user._id.toString() !== id.toString() })
            console.log("Unsubscribed")
            user.SubscribedChannels = user.SubscribedChannels.filter(id => id.toString() !== youtuber._id.toString())
            youtuber.Subscribers -= 1;
            await user.save()
            await youtuber.save()
            console.log("user", user)
            console.log("youtuber", youtuber)
            return res.json({ message: "Unsubscribed" })
        } else {
            user.SubscribedChannels.push(youtuber._id)
            youtuber.SubscribedBy.push(user._id)
            youtuber.Subscribers += 1;
            await youtuber.save();
            await user.save();
            console.log("user", user)
            console.log("youtuber", youtuber)
            return res.json({ message: "Subscribed" })
        }

        // console.log("/subscribe IS WORKING PERFECTLY...")
    } catch (e) {
        console.log("ERROR WHILE SUBSCRIBING...", e)
        return res.json({ message: "ERROR WHILE SUBSCRIBING" })
    }
})

module.exports = ClientRouter