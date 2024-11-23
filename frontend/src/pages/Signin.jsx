import { toast } from "react-toastify"
import Ytlogo from "../components/Ytlogo"
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { Hourglass } from "react-loader-spinner";
const Signin = () => {
  const navigate = useNavigate()
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const [loading, setloading] = useState(false)
  const [showSearch, setShowSearch] = useState(false);
  const [channelName, setchannelName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [imgurl, setImgurl] = useState("")
  const [logo, setLogo] = useState("")
  function handleSubmit(e) {
    e.preventDefault();
    setloading(true)
    const formdata = new FormData();
    formdata.append("Email", email)
    formdata.append("Password", password)
    axios.post(`${BACKEND_URL}/user/login`, formdata).then((response) => {
      toast.success(response.data.message)
      console.log(response)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("logoUrl",response.data.logoUrl)
      localStorage.setItem("channelName",response.data.channelName)
      // localStorage.setItem("userId",response)
      navigate("/home")
      console.log(response)
    })
      .catch((e) => {
        console.log(e)
        console.log("IN CSTCHHHHh")
        toast.error(e.response.data.message)
      })
  }
  return (
    <>
      <div className=" text-white h-screen min-w-full flex flex-col bg-bgray transition-all duration-1000">
        <Navbar />
        <div className="flex-1 flex justify-center items-center   ">
          <div className="flex items-center flex-col">
            <h1 className="text-7xl font-bold ">Signin</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5 mt-5">
                <input required onChange={(e) => { setEmail(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="text" placeholder="Email" />
                <input required onChange={(e) => { setPassword(e.target.value) }} className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] rounded-md " type="password" placeholder="Password" />
                <div>
                  <button type="submit" className="bg-white  text-black font-semibold  border-bordcol border shadow-2xl rounded-md p-1 w-80 sm:w-[500px] hover:bg-slate-200 transition-all duration-200">
                    <div className="flex justify-center items-center gap-2">
                      Submit
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
                  <div className=" flex justify-center">Create new account? <Link className="font-semibold hover:text-slate-200 ml-1" to={"/signup"}> Signup </Link></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin