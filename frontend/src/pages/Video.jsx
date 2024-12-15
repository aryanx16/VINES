import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import moment from 'moment'
import {motion} from 'framer-motion'
// Add loader 
const Video = () => {
  const { vid } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState({})
  const [channelName, setchannelName] = useState("")
  const [subscribers, setsubscribers] = useState(0)
  const [allvideos,setallvideos] = useState([])
  const [isSub,setisSub] = useState(false)
  const [isLike,setisLike] = useState(false)
  const [likes,setlikes] = useState(0)
  const [dislikes,setdislkes]= useState(0)
  const [isDislike,setisDislike] = useState(false)
  console.log(vid)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    getvideo()
    getallvideo()
    // console.log(video, "KJfdkfjdkfj")
  }, [vid])
  const handleClick = async(vid)=>{
    // console.log("onclidkckkk",vid)
    navigate(`/video/${vid}`)
  }
  const getvideo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/fullvideo/${vid}`,{
        headers:{
          Authorization:'Bearer '+localStorage.getItem("token")
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
      }
      
    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message || "Please try again!")
    }
  }
  const getallvideo=async()=>{
    try{
      // console.log("jjjjjjjjjjjjjjjjjjjjj",video)
      const response = await axios.get(`${BACKEND_URL}/video/all`)
      if(response.status===200){
        // console.log("kdfjdkfdf",response)
        setallvideos(response.data)
      }
    }catch(e){
      console.log("Error while getting all videos",e)
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const handlesubscribe = async(UserId)=>{
    console.log("sub??:",!isSub)
    isSub?setsubscribers(subscribers-1):setsubscribers(subscribers+1)
    setisSub(!isSub)
    try{
      const response = await axios.put(`${BACKEND_URL}/user/subscribe/${UserId}`,{},{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token'),        }
      })
      // console.log(response)
      // setissub(!issub)
    }catch(e){
      toast.error(e.response?.data?.message || "Please try again")
      // console.log(e)
    }
  }
  const handleLike=async(vid)=>{
    try{
      if (isDislike) {
        setisDislike(false);
        const newIsLike = !isLike;
        setisLike(newIsLike);
        setdislkes(dislikes-1)
        // const currlikes = likes
        setlikes(likes+1)
        console.log("likes::",likes)
          } else {
            const newIsLike = !isLike;
            isLike?setlikes(likes-1):setlikes(likes+1)
            setisLike(newIsLike);
              }
      console.log(isLike)
      const response = await axios.put(`${BACKEND_URL}/video/like/${vid}`,{},{
        headers:{
          Authorization:'Bearer '+localStorage.getItem("token")
        }
      })
      // console.log("like")
    }catch(e){
      console.log(e)
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const handleDislike = async(vid)=>{
    const currdislike = !isDislike;
    try{
      if(isLike){
        setisLike(false)
        setisDislike(currdislike)
        setdislkes(dislikes+1)
        setlikes(likes-1)
      }else{
        isDislike?setdislkes(dislikes-1):setdislkes(dislikes+1)
        setisDislike(currdislike)
      }
      const response = await axios.put(`${BACKEND_URL}/video/dislike/${vid}`,{},{
        headers:{
          Authorization:'Bearer '+localStorage.getItem("token")
        }
      })
    }catch(e){
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  return (
    <div>

      <Navbar />
      <div className="text-white bg-gradient-to-r from-bgray via-neutral-800 to-black min-h-screen w-full px-4 py-4 sm:px-14 font-mono">
        <div className='grid grid-cols-3 '>
          {/* left video section */}
          <div className='text-red-50  col-span-3 lg:col-span-2'>
            <video controls className='rounded-lg shadow-2xl shadow-neutral-700 w-full mb-2' src={video.VideoUrl}></video>
            {/* below video */}
            <div className='text-xl px-2 pb-1 line-clamp-2'>{video.Title}</div>
            <div className='flex px-2 gap-4  items-center justify-between'>
              {/* below videoo left side */}
              <div className='flex gap-4 items-center'>
                <motion.img whileHover={{ scale: 1.1 }} className='w-12 h-12 rounded-full object-cover' src={video.UserId?.LogoUrl} alt="kjkljl" />
                {/* channelname & subs */}
                <div className='flex flex-col'>
                  <div className=' flex'>{channelName}</div>
                  <div className=' flex text-sm text-neutral-400'>{subscribers} Subscribers</div>
                </div>
                {/* sub btn */}
                <div onClick={()=>{handlesubscribe(video.UserId._id)}} className={`hidden  sm:block ${isSub?'bg-neutral-600':'text-neutral-400 bg-gradient-to-r from-purple-600/35 via-purple-500/35 to-blue-400/35'}   text-black p-1 px-2 rounded-full`}>
                  <button className=''>{isSub ? 'Subscribed' : 'Subscribe'}</button>
                </div>
              </div>
              {/* below video right side */}
              <div className='flex border-neutral-600 items-center gap-4 px-2 border md:px-5 md:py-1 bg-neutral-800 rounded-full bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-blue-500/30'>
                {/* like */}
                <div className='flex' onClick={()=>{handleLike(video._id)}}>
                  {isLike?(
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z"/></svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>
                  )}
                  {likes}

                </div>
                <div>|</div>
                {/* dislike */}
                <div onClick={()=>{handleDislike(video._id)}} className='flex'>
                  {isDislike?(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z"/></svg>):(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"/></svg>)}
                  {dislikes}
                </div>
              </div>
            </div>
              <div onClick={()=>{handlesubscribe(video.UserId._id)}} className='flex sm:hidden block justify-center items-center bg-white text-black  rounded-full my-1'>subscribe</div>

          </div>
          {/* right recommended videos */}
          <div className='col-span-3 lg:col-span-1 flex flex-col gap-2 pl-4 pt-4 sm:pt-0'>
          <h2 className="text-lg font-semibold ">Recommended Videos</h2>
          {/* <div className='flex flex-col gap-2'></div> */}
            {allvideos.map(vid=>{return(
              <motion.div   whileHover={{
                scale: 1.05,
                // backgroundColor: 'rgba(31, 41, 55, 1)',
              }}
              transition={{ duration: 0.3 }} onClick={()=>{handleClick(vid._id)}} className='flex    gap-2 rounded-md'>
                <div className=''>
                  {/* Right thumbnails */}
                <img onClick={()=>{handleClick(vid._id)}} src={vid.ThumbnailUrl} className='max-w-40  rounded-md' alt="" />
                </div>
                {/* <div className='w-44 h-28  '>
                <img onClick={()=>{handleClick(vid._id)}} src={vid.ThumbnailUrl} className='min-w-44 w-44 h-24 min-h-24 rounded-md' alt="" />
                </div> */}
                <div className='flex flex-col'>
                <div className='min-w-full max-h-12 line-clamp-2 text-sm '>
                {vid.Title}
                </div>
                <div className='text-gray-400 line-clamp-1'>
                  {vid.UserId.ChannelName}
                </div>
                <div className='text-sm'>
                  {vid.Views} views • {moment(vid.createdAt).fromNow()}
                </div>                
                </div>
              </motion.div>
            )})}
            
          </div>
        </div>
        <div className=' flex'></div>
      </div>

    </div>
  )
}

export default Video



