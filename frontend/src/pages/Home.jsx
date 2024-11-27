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
      }
    } catch (e) {
      console.error('Error fetching videos:', e);
    }
  };

  return (
    // <div className="min-h-screen bg-bgray text-white ">
    //   {/* Navbar */}
    //   <Navbar />
    //   {/* Main Content */}
    //   <div className="flex flex-wrap justify-center gap-5 p-5">
    //     {videos.length > 0 ? (
    //       videos.map((video) => (
    //         <div
    //           key={video._id}
    //           className=" rounded-lg p-3 w-64 shadow-md hover:shadow-xl transition-shadow duration-300"
    //         >
    //           {/* Thumbnail */}
    //           <div className="relative w-full h-36">
    //             <img
    //               className="w-full h-full object-cover rounded-lg"
    //               src={video.ThumbnailUrl}
    //               alt={video.Title}
    //             />
    //           </div>
    //           {/* Details */}
    //           <div className="mt-2">
    //             <h3 className="font-semibold text-lg truncate">{video.Title}</h3>
    //             <p className="text-sm text-gray-400">
    //               {video.Views} views • {moment(video.createdAt).fromNow()}
    //             </p>
    //             <p className="text-xs text-gray-500 mt-1">
    //               Tags: {video.Tags.join(', ')}
    //             </p>
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <div className="text-gray-500">No videos available</div>
    //     )}
    //   </div>
    // </div>

    <div className='bg-bgray min-h-screen text-white'>
      <Navbar />
      <div className='flex flex-wrap justify-center gap-5 '>
          {videos.map((video)=>(
            <div key={video._id} className=''>
              <div>
                <img className='w-screen h-48 sm:w-96 sm:h-56 sm:rounded-2xl ' src={video.ThumbnailUrl} alt="" />
              </div>
              <div className='flex'>
                <div>
                    {/* <img src={video.} alt="" /> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
