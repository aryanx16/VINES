import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import moment from 'moment'
import { motion } from 'framer-motion'
import VideoLoader from '../loaders/VideoLoader'
import { useSearch } from '../context/SearchBarContext'
import ShinyText from '../Animations/ShinyText'
// Add loader 
const Video = () => {
  const { vid } = useParams()
  const [newcomment, setnewcomment] = useState("")
  const [logourl, setlogourl] = useState(localStorage.getItem('logoUrl'))
  const [comments, setcomments] = useState([])
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
  const { showSearch, setShowSearch } = useSearch()
  const [showcomments,setshowcomments] = useState(false)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    getcomments()
    getvideo()
    getallvideo()
  }, [vid])
  const handlecomment = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`${BACKEND_URL}/comment/${vid}`,{CommentText:newcomment},{
        headers:{
          Authorization :`Bearer ${localStorage.getItem("token")}`
        }
      })
      getcomments()
      setnewcomment("")
    }catch(e){
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const handleClick = async (vid) => {
    navigate(`/video/${vid}`)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  const getcomments = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/comment/${vid}`)
      setcomments(response.data.Comments)
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const getvideo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/fullvideo/${vid}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
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
      const response = await axios.get(`${BACKEND_URL}/video/all`)
      if (response.status === 200) {
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
    } catch (e) {
      toast.error(e.response?.data?.message || "Please try again")
    }
  }
  const handleLike = async (vid) => {
    try {
      if (isDislike) {
        setisDislike(false);
        const newIsLike = !isLike;
        setisLike(newIsLike);
        setdislkes(dislikes - 1)
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
          <div onClick={() => { setShowSearch(false) }} className="text-white bg-neutral-950 min-h-screen w-full  py-4 sm:px-14 font-mono">
            <div className='grid grid-cols-3 '>
              {/* left video section */}
              <div className='text-red-50  col-span-3 lg:col-span-2'>
                <video controls className='rounded-lg shadow-lg shadow-neutral-800 max-h-[550px] w-full mb-2' src={video.VideoUrl}></video>
                {/* below video */}
                <div className='text-xl px-2  line-clamp-2'>{video.Title}</div>
                <div className='text-sm text-neutral-400 pl-2 pb-1'> {formatViews(video.Views)} views • {moment(video.createdAt).fromNow()}</div>
                <div className='flex px-2 gap-4  items-center justify-between'>
                  {/* below videoo left side */}
                  <div  className='cursor-pointer flex gap-4 items-center'>
                    <motion.img onClick={()=>{navigate(`/u/${video.UserId._id}`)}} whileHover={{ scale: 1.1 }} className='w-12 h-12 rounded-full object-cover' src={video.UserId?.LogoUrl} alt="logo" />
                    {/* channelname & subs */}
                    <div onClick={()=>{navigate(`/u/${video.UserId._id}`)}} className='flex flex-col'>
                      <div className=' flex'>{channelName}</div>
                      <div className=' flex text-sm text-neutral-400'>{subscribers} Subscribers</div>
                    </div>
                    {/* sub btn */}
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }} onClick={() => { handlesubscribe(video.UserId._id) }} className={`hidden sm:flex ${isSub ? "bg-neutral-900" : "bg-neutral-950"} shadow-lg border shadow-neutral-800  cursor-pointer border-neutral-700 p-2 rounded-md hover:bg-neutral-950 px-4 hover:scale-105 `}>
                      <button className=''><ShinyText text={isSub ? 'Subscribed' : ' Subscribe '} disabled={false} speed={3} className='custom-class font-bold' />
                      </button>
                    </motion.div>

                  </div>
                  {/* below video right side */}
                  <div className='flex cursor-pointer p-1 border-neutral-700 shadow-lg shadow-neutral-800 items-center gap-4 px-2 border md:px-5 md:py-1  rounded-full bg-neutral-950'>
                    {/* like */}
                    <div className='flex' onClick={() => { handleLike(video._id) }}>
                      {isLike ? (

                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                      )}
                      {likes}

                    </div>
                    <div className='text-neutral-500'>|</div>
                    {/* dislike */}
                    <div onClick={() => { handleDislike(video._id) }} className='flex'>
                      {isDislike ? (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z" /></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" /></svg>)}
                      {dislikes}
                    </div>
                  </div>
                </div>
                <div>

                </div>
                {!isSub ?
                  <motion.div whileTap={{ scale: 0.85 }} onClick={() => { handlesubscribe(video.UserId._id) }} className='text-center transition-all duration-500 rounded-full justify-center items-center sm:hidden flex border  hover:shadow-neutral-600 cursor-pointer border-neutral-700 p-2 m-2 font-bold  px-4 hover:scale-105 bg-neutral-950 box-border'>

                    <ShinyText text="Subscribe" disabled={false} speed={3} className='custom-class font-bold' />
                  </motion.div>
                  : <div onClick={() => { handlesubscribe(video.UserId._id) }} className='text-center rounded-full justify-center items-center sm:hidden flex   shadow-lg border   cursor-pointer border-neutral-700 p-1 m-2 px-4 font-bold hover:scale-105 bg-neutral-900 box-border'>

                    <ShinyText text="Subscribed" disabled={false} speed={3} className='custom-class font-bold text-lg' />
                  </div>
                }

                {/* comments section below sub btn */}
                <div className='mt-3 p-2'>
                  <div className='text-xl font-sans'>
                    Comments
                  </div>
                  <div className='flex gap-1 mt-2 '>
                    <div>
                      <img onClick={()=>{navigate(`/u/${video.UserId._id}`)}} className='w-10  rounded-full' src={logourl} alt="" />
                    </div>
                    <div className='w-full'>
                      <div className=' mb-5'>
                        <form className='flex box-border' onSubmit={handlecomment}>
                          <div className='w-full border-b-2'>

                            <input onKeyDown={(e)=>{if(e.key==='Enter')handlecomment(e)}} value={newcomment} required onChange={(e) => { setnewcomment(e.target.value) }} placeholder='Add a Comment' className='w-full bg-neutral-950  rounded-md border-none' type="text" />
                          </div>
                          <button type='submit'>

                          <ShinyText text="Add" disabled={false} speed={3} className='custom-class border px-1 ml-4 hover:scale-105 transition-all duration-300 cursor-pointer  rounded-md text-lg border-neutral-500 font-bold' />
                          </button>
                          {/* <button>Add</button> */}
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* comments for mobile */}
                  <div className='lg:hidden transition-all duration-700'>
                    <div className=' p-1 transition-all duration-700  rounded-full'>
                      {!showcomments && <p className='flex justify-center items-center bg-neutral-900 w-40  rounded-md py-1' onClick={(e)=>{setshowcomments(true)}}>Show Comments<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></p>}
                      {showcomments && <p className='flex justify-center items-center bg-neutral-900 w-40  rounded-md  ' onClick={(e)=>{setshowcomments(false)}}>Hide Comments<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg></p>}
                      
                      {showcomments && 
                      <div className=''>
                        {comments.length===0?( <div>No Comments yet</div> ):( <div></div> )}
                      {comments.map((comment ,index) => {
                        return (
                          <motion.div key={index}  initial={{ opacity: 0}}

                          animate={{ opacity: 1,y:0, transition: { duration: 0.5 } }}
                           className='transition-all duration-700'>
                            {/* one whole comment box */}
                            <div className='flex gap-1 my-2 flex-shrink-0'>
                              {/* logo */}
                              <div onClick={()=>{navigate(`/u/${comment.UserId._id}`)}} className='w-11 cursor-pointer h-11  flex-shrink-0'>
                                <img src={comment.UserId.LogoUrl} className='w-11 h-11 rounded-full' alt="" />
                              </div>
                              <div>
                                {/* chnl name */}
                                <div className='text-sm text-neutral-400 font-sans'>
                                  @{comment.UserId.ChannelName} • {moment(comment.createdAt).fromNow()}
                                </div>
                                {/* comment */}
                                <div className='line-clamp-6'>
                                  {comment.CommentText}
                                </div>
                                {/* like n dislike */}
                            
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                      </div>
                      }
                    </div>
                  </div>
                  {/* for large screens */}
                  <div className='hidden lg:block  transition-all duration-700'>
                    
                  {comments.map((comment ,index) => {
                    return (
                      <div key={index}>
                        {/* one whole comment box */}
                        <div className='flex gap-1 my-2 flex-shrink-0'>
                          {/* logo */}
                          <div onClick={()=>{navigate(`/u/${comment.UserId._id}`)}} className='w-11 cursor-pointer h-11  flex-shrink-0'>
                            <img src={comment.UserId.LogoUrl} className='w-11 h-11 rounded-full' alt="" />
                          </div>
                          <div>
                            {/* chnl name */}
                            <div className='text-sm text-neutral-400 font-sans'>
                              @{comment.UserId.ChannelName} • {moment(comment.createdAt).fromNow()}
                            </div>
                            {/* comment */}
                            <div className='line-clamp-6'>
                              {comment.CommentText}
                            </div>
                            {/* like n dislike */}
                            {/* <div className='flex gap-2'>
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#e8eaed"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>

                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#F3F3F3"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" /></svg>

                            </div> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </div>
              {/* right recommended videos */}
              {!showcomments && 
              <div className='col-span-3 lg:col-span-1 flex flex-col gap-2 pl-4 pt-4 sm:pt-0'>
                <h2 className="text-lg font-semibold ">Recommended Videos</h2>
                {/* <div className='flex flex-col gap-2'></div> */}
                {allvideos.map((vid,index) => {
                  return (
                    <motion.div key={index} whileHover={{
                      scale: 1.05,
                    }}
                      transition={{ duration: 0.3 }} onClick={() => { handleClick(vid._id) }} className='flex cursor-pointer   gap-2 rounded-md'>
                      <div className='min-w-40'>
                        {/* Right thumbnails */}
                        <img onClick={() => { handleClick(vid._id) }} src={vid.ThumbnailUrl} className='object-cover w-40  rounded-md h-20 ' alt="" />
                      </div>
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
              }
            </div>
            <div className=' flex'></div>
          </div>

        </div>
      </div>}
    </div>
  )
}

export default Video



