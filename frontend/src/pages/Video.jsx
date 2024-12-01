import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import moment from 'moment'
// Add loader 
const Video = () => {
  const { vid } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState({})
  const [channelName, setchannelName] = useState("")
  const [subscribers, setsubscribers] = useState(0)
  const [allvideos,setallvideos] = useState([])
  console.log(vid)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    getvideo()
    getallvideo()
    console.log(video, "KJfdkfjdkfj")
  }, [vid])
  const handleClick = async(vid)=>{
    console.log("onclidkckkk",vid)
    navigate(`/video/${vid}`)
  }
  const getvideo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/fullvideo/${vid}`)
      console.log(response)
      if (response.status === 200) {
        setVideo(response.data.video)
        setchannelName(response.data.video.UserId.ChannelName)
        setsubscribers(response.data.video.UserId.Subscribers)
      }
    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message || "Please try again!")
    }
  }
  const getallvideo=async()=>{
    try{
      console.log("jjjjjjjjjjjjjjjjjjjjj",video)
      const response = await axios.get(`${BACKEND_URL}/video/all`)
      if(response.status===200){
        console.log("kdfjdkfdf",response)
        setallvideos(response.data)
      }
    }catch(e){
      console.log("Error while getting all videos",e)
      toast.error(e.response?.data?.message || "Please try again")
    }
  }

  return (
    <div>

      <Navbar />
      <div className="text-white bg-gradient-to-r from-bgray via-neutral-900 to-black min-h-screen w-full px-4 py-4 sm:px-14 font-mono">
        <div className='grid grid-cols-3 '>
          {/* left video section */}
          <div className='text-red-50  col-span-3 lg:col-span-2'>
            <video controls className='rounded-lg shadow-2xl shadow-neutral-700 w-full mb-2' src={video.VideoUrl}></video>
            {/* below video */}
            <div className='flex px-2 gap-4  items-center justify-between'>
              {/* below videoo left side */}
              <div className='flex gap-4 items-center'>
                <img className='w-12 h-12 rounded-full object-cover' src={video.UserId?.LogoUrl} alt="kjkljl" />
                {/* channelname & subs */}
                <div className='flex flex-col'>
                  <div className=' flex'>{channelName}</div>
                  <div className=' flex text-sm text-neutral-400'>{subscribers} Subscribers</div>
                </div>
                {/* sub btn */}
                <div className='hidden sm:block bg-white text-black p-1 px-2 rounded-full'>
                  <button>Subscribe</button>
                </div>
              </div>
              {/* below video right side */}
              <div className='flex border-neutral-600 items-center gap-4 px-2 border md:px-5 md:py-1 bg-neutral-800 rounded-full'>
                {/* like */}
                <div className='flex'>
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                  </svg>
                  {video.Likes}

                </div>
                <div>|</div>
                {/* dislike */}
                <div className='flex'>
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475" />
                  </svg>
                  {video.Dislikes}
                </div>
              </div>
            </div>

          </div>
          {/* right recommended videos */}
          <div className='col-span-3 lg:col-span-1  pl-4 pt-4 sm:pt-0'>
            {allvideos.map(vid=>{return(
              <div onClick={()=>{handleClick(vid._id)}} className='flex   gap-2 rounded-md'>
                <div className='w-44 h-28  '>
                <img onClick={()=>{handleClick(vid._id)}} src={vid.ThumbnailUrl} className='min-w-44 w-44 h-24 min-h-24 rounded-md' alt="" />
                </div>
                <div className='flex flex-col'>
                <div className='min-w-80 max-h-12 overflow-hidden'>
                {vid.Title}
                </div>
                <div className='text-gray-400 '>
                  {vid.UserId.ChannelName}
                </div>
                <div>
                  {vid.Views} views • {moment(vid.createdAt).fromNow()}
                </div>                
                </div>
              </div>
            )})}
            
          </div>
        </div>
        <div className=' flex'></div>
      </div>

    </div>
  )
}

export default Video



