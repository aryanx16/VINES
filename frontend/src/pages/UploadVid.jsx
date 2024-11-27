import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Hourglass } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const UploadVid = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()
    const [title ,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [category,setCategory]=useState("")
    const [tags,setTags]=useState("")
    const [loading ,setLoading] =useState(false)
    const [video , setVideo] = useState("")
    const [videourl , setVideourl] = useState("")
    const [thumbnail,setThumbnail] = useState("")
    const [thumbnailUrl , setThumbnailUrl] = useState("")
     function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        if(!thumbnailUrl){
            toast.info("Please select a Thumbnail!")
            return;
        }
        if(!videourl){
            toast.info("Please select a Video!")
            return;
        }
        try{
            const formdata  = new FormData()
            formdata.append("Title",title)
            formdata.append("Description",desc)
            formdata.append("Tags",tags)
            formdata.append("Category",category)
            formdata.append("Thumbnail",thumbnail)
            formdata.append("Video",video)

            axios.post(`${BACKEND_URL}/video`,formdata,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }).then((response)=>{
                toast.success(response.data.message)
                console.log("video uploaded")
                navigate("/home")
            }).catch((e)=>{
                console.log("kfjdkf",e.response)
                toast.error(e.response.data.message);
                setLoading(false)
            })
        }catch(e){
            console.log("Error in uploading video",e)
            toast.error(e.response.data.message)
            setLoading(false)
        }
    }
    function handlethumbnail(e){
        try{
            console.log(e.target.files[0]);
            setThumbnail(e.target.files[0])
            setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
        }catch(e){
            toast.error("Please select another thumbnail!")
        }
    }
    function handlevideo(e){
        try{

            const filesize = e.target.files[0].size;
            setVideo(e.target.files[0])
            console.log(e)
            setVideourl(URL.createObjectURL(e.target.files[0]))
            if(filesize>40*1024*1024){
                toast.info("Please select a video less than 4mb")
                setVideourl("")
                setVideo("") 
            }
        }catch(e){
            toast.error("Please select another video!")
        }
    }
  return (
    <div className=" text-white h-screen min-w-full flex flex-col bg-bgray transition-all duration-1000">
                <Navbar/>
                <div className="flex-1 flex justify-center items-center   ">

                    <div className="flex items-center flex-col">
                        <h1 className="text-6xl font-bold ">Upload Video</h1>
                        <form onSubmit={handleSubmit}>

                            <div className="flex flex-col gap-5 mt-5">
                                <input required onChange={(e) => { setTitle(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Title" />
                                <input required onChange={(e) => { setDesc(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Description" />
                                <input required onChange={(e) => { setTags(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Tags" />
                                <input required onChange={(e) => { setCategory(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Category" />
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <label required htmlFor="thumb" className="bg-neutral-100  text-black h-fit font-semibold shadow-2xl rounded-md p-1 w-44 cursor-pointer hover:bg-slate-200 w-fit ">Select Thumbnail</label>
                                    {thumbnailUrl && <img src={thumbnailUrl} className="w-32  p-1 h-32 object-contain border-2 bg-secondary border-bordcol rounded-md " alt="Preview" />}
                                    <input id="thumb" onChange={handlethumbnail} className="bg-secondary hidden  border-bordcol border shadow-2xl rounded-md p-1 " type="file" />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <label required htmlFor="video" className="bg-neutral-100  text-black h-fit font-semibold shadow-2xl rounded-md p-1 w-44 cursor-pointer hover:bg-slate-200 w-fit ">Select Video</label>
                                    {videourl && <video src={videourl} className="w-32  p-1 h-32 object-contain border-2 bg-secondary border-bordcol rounded-md " alt="Preview" />}
                                    <input id="video" onChange={handlevideo}  className="bg-secondary hidden  border-bordcol border shadow-2xl rounded-md p-1 " type="file" />
                                </div>
                                <div>
                                    <button type="submit" className="bg-white  text-black font-semibold  border-bordcol border shadow-2xl rounded-md p-1 w-80 sm:w-[500px] hover:bg-slate-200 transition-all duration-200"><div className="flex justify-center items-center gap-2"> Submit
                                    {loading &&     <Hourglass
                                            visible={true}
                                            height="20"
                                            width="20"
                                            ariaLabel="hourglass-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            colors={['#000000', '#000000']}
                                        />}
                                    </div></button>
                                    {<div className="flex justify-center items-center"></div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
  )
}

export default UploadVid
