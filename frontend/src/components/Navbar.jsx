import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const logoUrl = localStorage.getItem("logoUrl")
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location)
    return (
        <div className='bg-bgray'>
            {/* Sidebar */}
            <div
                className={`fixed top-0 z-10 bg-secondary h-full w-36 transform transition-transform duration-300 ${sidebar ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div onClick={() => setSidebar(!sidebar)} className="p-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>


                </div>
                <div className='flex flex-col justify-center items-center'>
                    {/* <div className='border-red-300 border-2 p-2 rounded-full h-40'> */}
                    {logoUrl ?
                        (<div className='flex justify-center items-center flex-col'>

                        <img className='h-32 w-32 border border-bordcol rounded-full object-contain' src={localStorage.getItem("logoUrl")} alt="" />
                        <h3 className='font-mono bg-bordcol px-2 max-w-32 overflow-hidden rounded-full mt-1 '>{localStorage.getItem("channelName")}</h3>
                        </div>
                        
                        ) : (<div className="h-32 w-32 border-2 border-bordcol rounded-full flex items-center justify-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-36">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            


                        </div>)
                    }
                    {/* </div> */}
                    <ul className="mt-4 text-white cursor-pointer">
                        <li className={`p-4 rounded-md m-1 hover:bg-gray-700 ${location.pathname==='/home'? 'bg-gray-700':''}`}>Home</li>
                        <li className={`p-4 rounded-md hover:bg-gray-700 m-1 ${location.pathname==='/subscriptions'? 'bg-gray-700':''} `}>Subscriptions</li>
                        <li className={`p-4 rounded-md hover:bg-gray-700 m-1 ${location.pathname==='/about'? 'bg-gray-700':''}`}>About</li>
                        <li className={`p-4 rounded-md hover:bg-gray-700 m-1 ${location.pathname==='/logout'? 'bg-gray-700':''} `}>Logout</li>
                    </ul></div>
            </div>

            {/* Navbar */}
            <div className="transition-all duration-1000 w-full p-5 sticky top-0 shadow-2xl">
                <div className={`flex ${showSearch ? 'justify-center' : 'justify-between'}`}>
                    {/* Sidebar toggle button */}
                    {!showSearch && (
                        <div
                            className="flex justify-center items-center gap-2 cursor-pointer"
                            onClick={() => setSidebar(!sidebar)}
                        >
                            <div className='hover:bg-gray-700 rounded-full p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            </div>
                            <div className="text-2xl font-semibold">Vines</div>
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
                                    className="w-6 h-8 text-gray-500 cursor-pointer"
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

                            <svg onClick={()=>{navigate("/upload")}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
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
    );
};

export default Navbar;
