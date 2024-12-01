import { toast } from "react-toastify"
import Ytlogo from "../components/Ytlogo"
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import {  Hourglass } from 'react-loader-spinner'
const Signup = () => {
    const navigate = useNavigate()
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
    const [showSearch, setShowSearch] = useState(false);
    const [loading, setloading] = useState(false)
    const [channelName, setchannelName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [imgurl, setImgurl] = useState("")
    const [logo, setLogo] = useState("")
    function handleSubmit(e) {
        try{

            e.preventDefault();
            if (!imgurl) {
                console.log("Not selected")
                toast.info("Select a channel Logo")
                return;
            }
            const formdata = new FormData();
            formdata.append("ChannelName", channelName)
            formdata.append("Email", email)
            formdata.append("Phone", phone)
            formdata.append("Password", password)
            formdata.append("logo", logo)
            setloading(true)
            axios.post(`${BACKEND_URL}/user/register`, formdata).then((response) => {
                if(response.status===200){

                    toast.success(response.data.message)
                    navigate("/signin")
                    console.log(response)
                }
            })
            .catch((e) => {
                console.log(e)
                toast.error(e.response?.data?.message || "Please try again" )
            })
        }catch(e){
            toast.error(e.response?.data?.message || "Please try again")
        }
    }
    function handlefile(e) {
        console.log(e.target.files)
        setLogo(e.target.files[0])
        setImgurl(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <>
            <div className=" text-white h-screen min-w-full flex flex-col  bg-gradient-to-r from-bgray via-neutral-900 to-black transition-all duration-1000">
                <Navbar />
                <div className="flex-1 flex justify-center items-center   ">

                    <div className="flex items-center flex-col">
                        <h1 className="text-7xl font-bold ">Signup</h1>
                        <form onSubmit={handleSubmit}>

                            <div className="flex flex-col gap-5 mt-5">
                                <input required onChange={(e) => { setchannelName(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Channel Name" />
                                <input required onChange={(e) => { setEmail(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Email" />
                                <input required onChange={(e) => { setPassword(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="password" placeholder="Password" />
                                <input required onChange={(e) => { setPhone(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Phone No." />
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <label required htmlFor="fileh" className="bg-neutral-100  text-black h-fit font-semibold shadow-2xl rounded-md p-1 w-44 cursor-pointer hover:bg-slate-200 sm:w-40 ">Select Channel Logo</label>
                                    {imgurl && <img src={imgurl} className="w-32  p-1 h-32 object-contain border-2 bg-secondary border-bordcol rounded-md " alt="Preview" />}
                                    <input id="fileh" onChange={handlefile} className="bg-secondary hidden  border-bordcol border shadow-2xl rounded-md p-1 " type="file" />
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

                                    <div className=" flex justify-center">Already have account? <Link className="font-semibold hover:text-slate-200 ml-1" to={"/signin"}> Signin </Link></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup