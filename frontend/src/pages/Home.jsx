import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Home = () => {
  const [videos,setVideos] = useState([])
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  useEffect(()=>{
    getVideos();
  },[])
  const getVideos=async()=>{
    try{
      const response = await axios.get(`${BACKEND_URL}/video/all`)
      console.log(response)
      if(response.status===200){
        setVideos(response.data)
      }
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className='min-h-screen bg-bgray text-white w-full flex flex-col'>
    <Navbar/>
    {videos.map((video)=>{
      return(
        <div>
        <img className='w-52 h-36 object-fill '  src={video.ThumbnailUrl} alt="" />
      </div>
      )
    })}
    </div>
  )
}

export default Home
