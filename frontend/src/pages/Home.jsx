import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import HomeLoader from '../loaders/HomeLoader';
import Footer from '../components/Footer';
import { useSearch } from '../context/SearchBarContext';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setloading] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const {showSearch, setShowSearch} =  useSearch()

  const navigate = useNavigate()
  useEffect(() => {
    getVideos();
    
  }, []);

  const handleClick = async (vid) => {
    // console.log("onclidkckkk", vid)
    navigate(`/video/${vid}`)
    window.scrollTo({top:0,behavior:'smooth'})
  }
  const getVideos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/all`);
      // console.log(response);
      if (response.status === 200) {
        setVideos(response.data);
        setloading(false)
        // setVideos(Array.isArray(response.data) ? response.data : []);
      }
    } catch (e) {
      console.error('Error fetching videos:', e);
    }
  };
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

  return (<div className=''>

    {loading ? <div className='bg-neutral-950 pt-20 '>
      <Navbar/>
    <HomeLoader/>
    </div> : <div>

        <Navbar />
      <div  className='bg-neutral-950 pt-20 pb-14'>
        <div onClick={()=>{setShowSearch(false)}} className='bg-neutral-950 min-h-screen text-white font-mono flex flex-col'>
          <div className='flex flex-wrap justify-center gap-5 '>
            {videos.map((video) => (
              <div key={video._id} className='relative group cursor-pointer'>
                {/* Thumbnail */}
                <div className='relative'>
                  <img loading='lazy' className='w-screen object-cover h-52 sm:w-96 sm:h-56 sm:rounded-2xl group-hover:opacity-0' onClick={() => { handleClick(video._id) }} src={video.ThumbnailUrl} alt="" />
                  <video onClick={() => { handleClick(video._id) }}
                    className='absolute  sm:group-hover:scale-105 transition-transform duration-300 top-0 left-0 w-full h-full object-cover rounded-2xl opacity-0 group-hover:opacity-100 '
                    src={video.VideoUrl}
                    muted
                    autoPlay
                    loop
                  />
                </div>
                {/* below Thumbail */}
                <div className='flex mt-2 '>
                  {/* logo */}
                  <div onClick={()=>{navigate(`/u/${video.UserId._id}`)}} className='rounded-full  mx-2'>
                    <img loading='lazy' className='object-cover h-9 w-9 rounded-full' src={video.UserId.LogoUrl} alt="" />
                  </div>
                  {/* Title */}
                  <div className=''>
                    <div className=' max-w-80 max-h-12 overflow-hidden  '>
                      <h3 onClick={() => { handleClick(video._id) }} className='line-clamp-2 hover:text-neutral-300'>
                        {video.Title}
                      </h3>
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
      </div>
    </div>}
    <Footer/>
  </div>
  );
};

export default Home;
