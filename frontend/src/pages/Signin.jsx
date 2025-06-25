import { useState } from "react";
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

const Signin = () => {
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData();
    formdata.append("Email", email);
    formdata.append("Password", password);

    axios.post(`${BACKEND_URL}/user/login`, formdata)
      .then((response) => {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("logoUrl", response.data.logoUrl);
        localStorage.setItem("channelName", response.data.channelName);
        localStorage.setItem("userid", response.data.userId);
        navigate("/home");
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
        toast.error(e.response?.data?.message || "Please try again");
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 flex flex-col">
      <Navbar />
      <main className="flex flex-1 justify-center items-center px-4">
        <div className="bg-neutral-900 shadow-lg rounded-xl p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-white text-center mb-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              required
              
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md flex justify-center items-center gap-2 transition-all duration-200"
            >
              Submit
              {loading && (
                <Hourglass
                  visible={true}
                  height="20"
                  width="20"
                  ariaLabel="hourglass-loading"
                  colors={["#ffffff", "#ffffff"]}
                />
              )}
            </button>
          </form>
          <div className="text-sm text-center text-neutral-400 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signin;
