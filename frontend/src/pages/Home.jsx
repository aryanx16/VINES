import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate()
  useEffect(() => {
    getVideos();
  }, []);

  const handleClick = async (vid) => {
    console.log("onclidkckkk", vid)
    navigate(`/video/${vid}`)
  }
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
    <div className='bg-black pt-20'>
      <Navbar />
      <div className='bg-gradient-to-r from-bgray via-neutral-900 to-black min-h-screen text-white font-mono'>
        <div className='flex flex-wrap justify-center gap-5 '>
          {videos.map((video) => (
            <div key={video._id} className='relative group cursor-pointer'>
              {/* Thumbnail */}
              <div className='relative'>
                <img className='w-screen  h-52 sm:w-96 sm:h-56 sm:rounded-2xl group-hover:opacity-0' onClick={() => { handleClick(video._id) }} src={video.ThumbnailUrl} alt="" />
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
                <div className='rounded-full  mx-2'>
                  <img className='object-cover h-9 w-9 rounded-full' src={video.UserId.LogoUrl} alt="" />
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
        <div className="relative h-screen w-full flex items-center justify-center bg-black">
  {/* Div with Backdrop Blur and Gradient */}
  <div className="backdrop-blur-lg bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 bg-clip-padding bg-opacity-10 border border-white/10 rounded-lg p-8 shadow-xl max-w-lg w-full">
    {/* Inner Content */}
    <h1 className="text-2xl font-bold text-white mb-4">Sentry</h1>
    <p className="text-gray-300">
      Modern monitoring & security. Review any stack, any app, at any scale. Learn more about the Sentry extension.
    </p>
    <button className="mt-6 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-medium rounded transition">
      Explore Sentry
    </button>
  </div>
  {/* <div className="text-black flex justify-center items-center h-[500px] object-cover w-full border-blue-500 border"> */}
        <div className='backdrop-blur-sm bg-gradient-to-r from-purple-400/30 rounded-md to-pink-500/30 bg-white/5 flex justify-center items-center h-96 w-96 p-10 text-white'>

          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ipsam dolorum quia inventore saepe minima nesciunt praesentium optio et rerum, quam iste ducimus ea ipsa voluptate. Architecto, inventore. Consequuntur aut velit nesciunt, minus aspernatur blanditiis quae tenetur eveniet odit aperiam reiciendis nulla impedit aliquam repudiandae possimus perspiciatis deserunt corporis. Dolorum quod similique ipsum vel aut.
        </div>
      {/* </div> */}
</div>

      </div>
    </div>
  );
};

export default Home;
