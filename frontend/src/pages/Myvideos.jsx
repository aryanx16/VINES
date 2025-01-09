import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSearch } from '../context/SearchBarContext';

const Myvideos = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const {showSearch, setShowSearch} =  useSearch()

  const [videos, setVideos] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getvideos();
  }, []);

  const getvideos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/video/ownvideos`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        setVideos(response.data.videos);
        // console.log(response.data.videos)
      } else {
        console.error('Error:', response);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'An error occurred');
    }
  };

  const handleEdit = (videoId) => {
    toast.info(`Edit clicked for video ID: ${videoId}`);
    // Implement your edit functionality here
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/video/${videoId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          toast.success('Video deleted successfully!');
          setVideos((prevVideos) =>
            prevVideos.filter((video) => video._id !== videoId)
          );
        } else {
          toast.error('Failed to delete the video.');
        }
      } catch (e) {
        console.log(e.response.data.error)
        toast.error(e.response?.data?.message || 'An error occurred while deleting.');
      }
    }
  };

  const handleClick = async(vid)=>{
    console.log("onclidkckkk",vid)
    navigate(`/video/${vid}`)
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
    <div className="text-white bg-neutral-950">
      <Navbar />
      <div onClick={()=>{setShowSearch(false)}} className="pt-20 bg-gradient-to-r  min-h-screen w-full px-8 py-4 font-mono">
        <div className='text-5xl mb-2 font-mono'>My videos</div>
        <div className="overflow-x-auto rounded-sm">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-left text-white">
                <th className="px-4 py-2 border border-gray-700">Thumbnail</th>
                <th className="px-4 py-2 border border-gray-700 text-center">Title</th>
                <th className="px-4 py-2 border border-gray-700 text-center">Likes</th>
                <th className="px-4 py-2 border border-gray-700 text-center">Views</th>
                <th className="px-4 py-2 border border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((vid) => (
                <tr key={vid.VideoId} className="hover:bg-secondary">
                  <td className="px-4 py-2 border border-gray-700 flex items-center gap-4">
                    <img onClick={()=>{handleClick(vid._id)}}
                      className="w-64 object-cover h-20  border-2 border-secondary rounded"
                      src={vid.ThumbnailUrl}
                      alt="Thumbnail"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-left">{vid.Title}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center">{vid.Likes}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center">{formatViews(vid.Views)}</td>
                  <td className="px-4 py-2 border border-gray-700 text-center ">
                    <button
                      onClick={() => handleEdit(vid.VideoId)}
                      className="bg-blue-500 font-mono text-md mx-1 my-1 hover:bg-blue-600 text-white  font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vid._id)}
                      className="bg-red-500 hover:bg-red-600 font-mono text-md text-white  font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Myvideos;
