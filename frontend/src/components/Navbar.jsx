import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { House } from 'lucide-react';
import {motion} from 'framer-motion'

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname==='/home')
    const logoUrl = localStorage.getItem("logoUrl")
    const channelName = localStorage.getItem("channelName");

    function handlelogout() {
        localStorage.clear()
        toast.success("Logged out")
        navigate("/signin")
    }
    
    return (
        <div>
             <div
                className={`fixed top-0 z-20 text-white backdrop-blur-md h-full  transform transition-transform duration-300 ${sidebar ? 'translate-x-0' : '-translate-x-[150%]'
                    }`}
            >
                <div onClick={() => setSidebar(!sidebar)} className="p-4 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        aria-label="Close Sidebar"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            />
                    </svg>



                </div>
                <div className='flex flex-col justify-center items-center'>
                    {/* <div className='border-red-300 border-2 p-2 rounded-full h-40'> */}
                    {logoUrl ?
                        (<div className='flex justify-center items-center flex-col'>

                            <img src={logoUrl} alt="Channel Logo" className="h-28 w-28 border border-neutral-500 rounded-full object-cover" />
                            <h3 className='font-mono bg-bordcol  px-2 max-w-32 overflow-hidden rounded-full mt-1 '>{localStorage.getItem("channelName")}</h3>
                        </div>

                        ) : (<div className="h-32 w-32 border-2 border-bordcol rounded-full flex items-center justify-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-36">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>



                        </div>)
                    }
                    {/* </div> */}
                    <ul className="mt-4 text-white cursor-pointer">
                        <li onClick={() => { navigate("/home") }} className={`p-4 font-mono flex gap-1 text-lg hover:bg-neutral-700  ${location.pathname === '/home' ? '' : ''}`}> {location.pathname === '/home' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>

                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                        )}Home</li>
                        <li onClick={() => { navigate("/subscriptions") }} className={`p-4 text-lg flex gap-1  font-mono   hover:bg-neutral-700  ${location.pathname === '/subscriptions' ? 'bg-neutral-800' : ''} `}>
                        {location.pathname === '/subscriptions' ? (
                           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" ><path clip-rule="evenodd" d="M5.5 3A1.5 1.5 0 004 4.5h16A1.5 1.5 0 0018.5 3h-13ZM2 7.5A1.5 1.5 0 013.5 6h17A1.5 1.5 0 0122 7.5v11a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-11Zm8 2.87a.5.5 0 01.752-.431L16 13l-5.248 3.061A.5.5 0 0110 15.63v-5.26Z" fill-rule="evenodd"></path></svg>

                        ) : ( <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path clip-rule="evenodd" d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z" fill-rule="evenodd"></path></svg>
                           
                        )}
                            Subscriptions</li>
                        <li onClick={() => { navigate("/myvideos") }} className={`p-4 font-mono  flex  gap-1 hover:bg-neutral-700  ${location.pathname === '/myvideos' ? 'bg-neutral-800' : ''} `}>
                    {location.pathname==='/myvideos'?(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m380-300 280-180-280-180v360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"/></svg>):(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m380-300 280-180-280-180v360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>)}My Videos</li>
                      
                        {logoUrl ?
                        <motion.li
                        onClick={handlelogout}
                        className={`p-2 flex justify-center items-center rounded-md gap-1 bg-red-600 font-bold font-mono m-3 ${
                            location.pathname === '/logout' ? 'bg-neutral-700' : ''
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        Logout
                    </motion.li>
                            : <motion.li onClick={() => { navigate("/signup") }} className={`p-2 font-mono  flex justify-center items-center font-bold gap-1 bg-gradient-to-l rounded-md from-cyan-500 to-blue-500 hover:bg-gradient-to-r m-3 ${location.pathname === '/register' ? 'bg-neutral-700' : ''} `}    whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}>Signup</motion.li>}
                    </ul></div>
            </div>

        <div className='fixed w-full top-0 z-10 bg-gradient-to-r backdrop-blur-md text-white flex flex-col '>
           
            {/* Navbar */}
            <div className=" transition-all duration-1000  w-full p-5 sticky top-0 shadow-2xl">
                <div className={`flex ${showSearch ? 'justify-center' : 'justify-between'}`}>
                    {/* Sidebar toggle button */}
                    {!showSearch && (
                        <div
                        className="flex justify-center items-center gap-2 cursor-pointer"
                        onClick={() => setSidebar(!sidebar)}
                        >
                            <div className='hover:bg-neutral-700 rounded-full p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            </div>
                            <div className="text-3xl font-semibold font-mono">Vines</div>
                        </div>
                    )}

                    {/* Search Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-secondary hidden md:block border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] pl-4 rounded-full"
                        />
                    </div>

                    {/* Mobile Search */}
                    <div className="block md:hidden ">
                        {showSearch ? (
                            <input
                            type="text"
                            className="bg-secondary border-bordcol border shadow-2xl p-1 w-80 sm:w-[400px] rounded-full"
                            placeholder="Search"
                            autoFocus
                            onBlur={() => setShowSearch(false)}
                            />
                        ) : (
                            <div className='flex justify-center items-center'>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-8 text-neutral-500 cursor-pointer"
                                    onClick={() => setShowSearch(true)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                                        />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Right Icons */}
                    {!showSearch && (
                        <div className="flex gap-5">
                            {/*upload video icon */}
                            <div >

                                <svg onClick={() => { navigate("/upload") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>

                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-8"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                    />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-8"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>

        </div>
                    </div>
    );
};

export default Navbar;
