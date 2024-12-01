import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/all`);
      console.log(response);
      if (response.status === 200) {
        setVideos(response.data);
        // setVideos(Array.isArray(response.data) ? response.data : []);
      }
    } catch (e) {
      console.error('Error fetching videos:', e);
    }
  };
  const formatViews=(num)=>{
    if(num>1e9){
      return (num/1e9).toFixed(1)+'B'
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    if(num<0){
      return 0;
    }
    return num;
  }

  return (

    <div className='bg-gradient-to-r from-bgray via-neutral-900 to-black min-h-screen text-white font-mono'>
      <Navbar />
      <div className='flex flex-wrap justify-center gap-5 '>
          {videos.map((video)=>(
            <div key={video._id} className='relative group'>
              {/* Thumbnail */}
              <div className='relative'>
                <img className='w-screen h-52 sm:w-96 sm:h-56 sm:rounded-2xl ' src={video.ThumbnailUrl} alt="" />
                <video
                className='absolute top-0 left-0 w-full h-full object-cover rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                src={video.VideoUrl} 
                muted
                autoPlay
                loop
              />
              </div>
              {/* below Thumbail */}
              <div className='flex mt-2 '>
                {/* logo */}
                <div className='rounded-full  mx-2'>
                    <img className='object-fill h-9 w-9 rounded-full' src={video.UserId.LogoUrl} alt="" />
                </div>
                <div className='flex flex-col'>
                  <div className=' max-w-80 max-h-12 overflow-hidden  border'>
                  {video.Title}
                  </div>
                  {/* below title */}
                  <div className='text-sm text-neutral-300'>
                    {video.UserId.ChannelName} • {formatViews(video.Views)} views • {moment(video.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
