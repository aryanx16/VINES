import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Hourglass } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSearch } from '../context/SearchBarContext'

const UploadVid = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()
    const { showSearch, setShowSearch } = useSearch()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState("")
    const [videourl, setVideourl] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [thumbnailUrl, setThumbnailUrl] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();
        toast.error("Video uploading is currently disabled by owner due to high maintenance costs.");
        return ;
        setLoading(true);
        if (!thumbnailUrl) {
            toast.info("Please select a Thumbnail!")
            return;
        }
        if (!videourl) {
            toast.info("Please select a Video!")
            return;
        }
        try {
            const formdata = new FormData()
            formdata.append("Title", title)
            formdata.append("Description", desc)
            formdata.append("Tags", tags)
            formdata.append("Category", category)
            formdata.append("Thumbnail", thumbnail)
            formdata.append("Video", video)

            const response = await axios.post(`${BACKEND_URL}/video`, formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Handle success response
            toast.success(response.data.message);
            console.log("Video uploaded successfully");
            navigate("/home");
        } catch (error) {
            // Handle errors
            console.log("Error uploading video:", error?.response || error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error! Please try again.");
            }
        } finally {
            setLoading(false); // Ensure loading is stopped regardless of success or failure
        }
    }
    function handlethumbnail(e) {
        try {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {

                console.log(e.target.files[0]);
                setThumbnail(e.target.files[0])
                setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
            }
        } catch (e) {
            toast.error("Please select another thumbnail!")
        }
    }
    function handlevideo(e) {
        try {
            const file = e.target.files[0];
            const filesize = e.target.files[0].size;
            if (file && file.type.startsWith("video/")) {
                setVideo(e.target.files[0])
                console.log(e)
                setVideourl(URL.createObjectURL(e.target.files[0]))
                if (filesize > 400 * 1024 * 1024) {
                    toast.info("Please select a video less than 40mb")
                    setVideourl("")
                    setVideo("")
                }
            }
        } catch (e) {
            toast.error("Please select another video!")
        }
    }
    return (
        <div className=" text-white h-screen min-w-full flex flex-col bg-gradient-to-r from-bgray via-neutral-900 to-black transition-all duration-1000">
            <Navbar />
            <div onClick={() => { setShowSearch(false) }} className="flex-1 flex justify-center items-center   ">

                <div className="flex items-center flex-col">
                    <h1 className="text-6xl font-bold ">Upload Video</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-5 mt-5">
                            <textarea required onChange={(e) => { setTitle(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Title" />
                            <textarea required onChange={(e) => { setDesc(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Description" />
                            <input required onChange={(e) => { setTags(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Tags" />
                            {/* <input required onChange={(e) => { setCategory(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Category" /> */}
                            <label className='w-full font-mono'>
                                Select Category : 
                                <select className=' bg-secondary     ' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                                    <option value="" className='w-52'>None</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Music">Music</option>
                                    <option value="Education">Education</option>
                                    <option value="News">News</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Fashion">Fashion</option>
                                </select>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label required htmlFor="thumb" className="bg-neutral-100  text-black h-fit font-semibold shadow-2xl rounded-md p-1  cursor-pointer hover:bg-slate-200 w-fit ">Select Thumbnail</label>
                                {thumbnailUrl && <img src={thumbnailUrl} className="w-32  p-1 h-32 object-contain border-2 bg-secondary border-bordcol rounded-md " alt="Preview" />}
                                <input id="thumb" accept="image/*" onChange={handlethumbnail} className="bg-secondary hidden  border-bordcol border shadow-2xl rounded-md p-1 " type="file" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label required htmlFor="video" className="bg-neutral-100  text-black h-fit font-semibold shadow-2xl rounded-md p-1  cursor-pointer hover:bg-slate-200 w-fit ">Select Video</label>
                                {videourl && <video src={videourl} className="w-32  p-1 h-32 object-contain border-2 bg-secondary border-bordcol rounded-md " alt="Preview" />}
                                <input id="video" onChange={handlevideo} accept="video/*" className="bg-secondary hidden  border-bordcol border shadow-2xl rounded-md p-1 " type="file" />
                            </div>
                            <div>
                                <button  type="submit" className="bg-white  text-black font-semibold  border-bordcol border shadow-2xl rounded-md p-1 w-80 sm:w-[500px] hover:bg-slate-200 transition-all duration-200"><div className="flex justify-center items-center gap-2"> {loading ? "Uploading" : "Upload"}
                                    {loading && <Hourglass
                                        visible={true}
                                        height="20"
                                        width="20"
                                        ariaLabel="hourglass-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        colors={['#000000', '#000000']}
                                    />}
                                </div>
                                </button>
                                {<div className="flex justify-center items-center"></div>}
                                <div className='text-sm text-neutral-400 flex justify-center items-center'>
                                    (Video uploading is currently disabled due to high maintenance costs.)
                                    </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadVid
