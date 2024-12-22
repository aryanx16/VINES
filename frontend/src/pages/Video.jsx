import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import moment from 'moment'
import { motion } from 'framer-motion'
import VideoLoader from '../loaders/VideoLoader'
// Add loader 
const Video = () => {
  const { vid } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState({})
  const [channelName, setchannelName] = useState("")
  const [subscribers, setsubscribers] = useState(0)
  const [allvideos, setallvideos] = useState([])
  const [isSub, setisSub] = useState(false)
  const [isLike, setisLike] = useState(false)
  const [likes, setlikes] = useState(0)
  const [dislikes, setdislkes] = useState(0)
  const [isDislike, setisDislike] = useState(false)
  const [loader, setloader] = useState(true)
  const [views, setviews] = useState(0)
  console.log(vid)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    getvideo()
    getallvideo()
    // console.log(video, "KJfdkfjdkfj")
  }, [vid])
  const handleClick = async (vid) => {
    // console.log("onclidkckkk",vid)
    navigate(`/video/${vid}`)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  const getvideo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/fullvideo/${vid}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      console.log(response)
      if (response.status === 200) {
        setVideo(response.data.video)
        setchannelName(response.data.video.UserId.ChannelName)
        setsubscribers(response.data.video.UserId.Subscribers)
        setisSub(response.data.isSub)
        setisLike(response.data.isLike)
        setisDislike(response.data.isDisLike)
        setlikes(response.data.video.Likes)
        setdislkes(response.data.video.Dislikes)
        setviews(response.data.video.Views)
      }

    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message || "Please try again!")
    }
  }
  const getallvideo = async () => {
    try {
      // console.log("jjjjjjjjjjjjjjjjjjjjj",video)
      const response = await axios.get(`${BACKEND_URL}/video/all`)
      if (response.status === 200) {
        // console.log("kdfjdkfdf",response)
        setallvideos(response.data)
        setloader(false)
      }
    } catch (e) {
      console.log("Error while getting all videos", e)
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const handlesubscribe = async (UserId) => {
    console.log("sub??:", !isSub)
    isSub ? setsubscribers(subscribers - 1) : setsubscribers(subscribers + 1)
    setisSub(!isSub)
    try {
      const response = await axios.put(`${BACKEND_URL}/user/subscribe/${UserId}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      })
      // console.log(response)
      // setissub(!issub)
    } catch (e) {
      toast.error(e.response?.data?.message || "Please try again")
      // console.log(e)
    }
  }
  const handleLike = async (vid) => {
    try {
      if (isDislike) {
        setisDislike(false);
        const newIsLike = !isLike;
        setisLike(newIsLike);
        setdislkes(dislikes - 1)
        // const currlikes = likes
        setlikes(likes + 1)
        console.log("likes::", likes)
      } else {
        const newIsLike = !isLike;
        isLike ? setlikes(likes - 1) : setlikes(likes + 1)
        setisLike(newIsLike);
      }
      console.log(isLike)
      const response = await axios.put(`${BACKEND_URL}/video/like/${vid}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
      // console.log("like")
    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const handleDislike = async (vid) => {
    const currdislike = !isDislike;
    try {
      if (isLike) {
        setisLike(false)
        setisDislike(currdislike)
        setdislkes(dislikes + 1)
        setlikes(likes - 1)
      } else {
        isDislike ? setdislkes(dislikes - 1) : setdislkes(dislikes + 1)
        setisDislike(currdislike)
      }
      const response = await axios.put(`${BACKEND_URL}/video/dislike/${vid}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      })
    } catch (e) {
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const formatViews = (num) => {
    if (num > 1e9) {
      return (num / 1e9).toFixed(1) + 'B'
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
  }
  return (

    <div>
      {loader ? <div className='pt-20 bg-neutral-900'>
        <Navbar />
        <VideoLoader />
      </div> : <div>
        <div className='pt-20 bg-neutral-950'>

          <Navbar />
          <div className="text-white bg-neutral-950 min-h-screen w-full px-4 py-4 sm:px-14 font-mono">
            <div className='grid grid-cols-3 '>
              {/* left video section */}
              <div className='text-red-50  col-span-3 lg:col-span-2'>
                <video controls className='rounded-lg shadow-2xl shadow-neutral-700 w-full mb-2' src={video.VideoUrl}></video>
                {/* below video */}
                <div className='text-xl px-2  line-clamp-2'>{video.Title}</div>
                <div className='text-sm text-neutral-400 pl-2 pb-1'> {formatViews(video.Views)} views • {moment(video.createdAt).fromNow()}</div>
                <div className='flex px-2 gap-4  items-center justify-between'>
                  {/* below videoo left side */}
                  <div className='flex gap-4 items-center'>
                    <motion.img whileHover={{ scale: 1.1 }} className='w-12 h-12 rounded-full object-cover' src={video.UserId?.LogoUrl} alt="logo" />
                    {/* channelname & subs */}
                    <div className='flex flex-col'>
                      <div className=' flex'>{channelName}</div>
                      <div className=' flex text-sm text-neutral-400'>{subscribers} Subscribers</div>
                    </div>
                    {/* sub btn */}
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }} onClick={() => { handlesubscribe(video.UserId._id) }} className={`hidden  sm:block ${isSub ? 'bg-gradient-to-l from-purple-300 to-purple-500 shadow-lg shadow-purple-300' : 'bg-gradient-to-l px-3 transition-all duration-500 from-cyan-500 to-blue-500 shadow-lg shadow-sky-300'} text-center w-36  text-white  p-1 px-2 rounded-full`}>
                      <button className=''>{isSub ? 'Subscribed' : ' Subscribe '}</button>
                    </motion.div>
                  </div>
                  {/* below video right side */}
                  <div className='flex cursor-pointer border-neutral-600 items-center gap-4 px-2 border md:px-5 md:py-1 bg-neutral-800 rounded-full bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-blue-500/30'>
                    {/* like */}
                    <div className='flex' onClick={() => { handleLike(video._id) }}>
                      {isLike ? (

                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                      )}
                      {likes}

                    </div>
                    <div>|</div>
                    {/* dislike */}
                    <div onClick={() => { handleDislike(video._id) }} className='flex'>
                      {isDislike ? (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" /></svg>)}
                      {dislikes}
                    </div>
                  </div>
                </div>

                <motion.li onClick={() => { handlesubscribe(video.UserId._id) }} className={`p-1 sm:hidden block font-mono ${isSub ? 'bg-gradient-to-l from-purple-300 to-purple-500 shadow-lg shadow-purple-300' : 'bg-gradient-to-l from-cyan-500 to-blue-500 shadow-lg shadow-sky-300'}   flex justify-center items-center font-bold gap-1  rounded-full  hover:bg-gradient-to-r m-3  `} whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}>{isSub ? 'Subscribed' : 'Subscribe'}</motion.li>

              </div>
              {/* right recommended videos */}
              <div className='col-span-3 lg:col-span-1 flex flex-col gap-2 pl-4 pt-4 sm:pt-0'>
                <h2 className="text-lg font-semibold ">Recommended Videos</h2>
                {/* <div className='flex flex-col gap-2'></div> */}
                {allvideos.map(vid => {
                  return (
                    <motion.div whileHover={{
                      scale: 1.05,
                      // backgroundColor: 'rgba(31, 41, 55, 1)',
                    }}
                      transition={{ duration: 0.3 }} onClick={() => { handleClick(vid._id) }} className='flex cursor-pointer   gap-2 rounded-md'>
                      <div className=''>
                        {/* Right thumbnails */}
                        <img onClick={() => { handleClick(vid._id) }} src={vid.ThumbnailUrl} className='max-w-40  rounded-md' alt="" />
                      </div>
                      {/* <div className='w-44 h-28  '>
                <img onClick={()=>{handleClick(vid._id)}} src={vid.ThumbnailUrl} className='min-w-44 w-44 h-24 min-h-24 rounded-md' alt="" />
                </div> */}
                      <div className='flex flex-col'>
                        <div className='min-w-full max-h-12 line-clamp-2 text-sm '>
                          {vid.Title}
                        </div>
                        <div className='text-gray-400 text-[13px] sm:sm line-clamp-1'>
                          {vid.UserId.ChannelName}
                        </div>
                        <div className='text-sm'>
                          {formatViews(vid.Views)} views • {moment(vid.createdAt).fromNow()}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

              </div>
            </div>
            <div className=' flex'></div>
          </div>

        </div>
      </div>}
    </div>
  )
}

export default Video



