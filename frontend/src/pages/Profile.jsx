import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { motion } from "framer-motion";
import toast from 'react-hot-toast'
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const [userdata, setuserdata] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { uid } = useParams();
  const [isSub, setisSub] = useState(false)
  const [subscribers, setsubscribers] = useState(0)
  const navigate = useNavigate()
  
  useEffect(() => {
    const getuserdata = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/u/${uid}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        setuserdata(response.data);
        setisSub(response.data.isSub)
        setsubscribers(response.data.user.Subscribers)
        // setsubscribers(response.data.user.Subscribers)
        console.log(response.data)
      } catch (e) {
        console.error("Error:", e);
        toast.error("Please try again!");
      }
    };

    getuserdata();
  }, [BACKEND_URL,]);
  const handlesubscribe = async (UserId) => {
    console.log("sub??:", !isSub)
    isSub ? setsubscribers(subscribers - 1) : setsubscribers(subscribers + 1)
    setisSub(!isSub)
    try {
      const response = await axios.put(`${BACKEND_URL}/user/subscribe/${uid}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      })
    } catch (e) {
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  if (!userdata || !userdata.user) {
    return (
      <div className="bg-neutral-950  min-h-screen w-full flex items-center justify-center text-white font-mono">
        Loading...
      </div>
    );
  }
  const formatViews = (num) => {
    if (num > 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    if (num < 0) {
      return 0;
    }
    return num;
  };
  return (
    <div className="bg-neutral-950  min-h-screen w-full text-white font-mono">
      <Navbar />
      {/* Top Profile Section */}
      <div className="pt-24 flex  flex-col items-center space-y-6 px-4 md:px-0">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={userdata.user.LogoUrl}
            className="w-40 rounded-full h-40 object-cover shadow-lg border-4 border-white"
            alt={userdata.user.ChannelName || "Profile"}
          />

        </motion.div>

        {/* Name and Subscribers */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-bold">{userdata.user.ChannelName}</h1>
          <p className="text-lg md:text-xl text-gray-400">
            {subscribers} Subscribers
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex space-x-4"
        >
          <button onClick={handlesubscribe} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300">
            {isSub === true ? "Subscribed" : "Subscribe"}
          </button>
          
        </motion.div>
      </div>

      {/* Videos Section */}
      <div className="mt-16 px-4 md:px-16 p-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Videos</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {userdata.videos.map((video, index) => (
            <motion.div
            onClick={()=>{navigate(`/video/${video._id}`)}}
              key={video._id}
              className="bg-neutral-900 p-4 rounded-lg shadow-lg flex flex-col space-y-4"
              whileHover={{ scale: 1.03 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              {/* Video Title */}
              {/* Video Player */}
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={video.ThumbnailUrl}
                  controls
                  className="w-full h-full rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold line-clamp-2 ">{video.Title}</h3>
              <p className="text-neutral-300  flex gap-1 items-center"> {formatViews(video.Views)} Views  • {moment(video.createdAt).fromNow()} </p>
              {/* Video Description */}
              {/* <p className="line-clamp-3 text-gray-400 text-sm">{video.Description}</p> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
