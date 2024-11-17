import React, { useState } from 'react'
import Ytlogo from './Ytlogo'

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
  
    return (
        <div>
            <div className="transition-all duration-1000 w-full p-5 sticky top-0 shadow-2xl ">
                <div className={`flex ${showSearch ? "justify-center" : "justify-between"}`}>
                    {!showSearch &&
                        <div className=" text-2xl font-semibold ">
                            Vines
                        </div>}
                    <div><input type="text" placeholder="Search" className="bg-secondary hidden md:block border-bordcol border shadow-2xl p-1 w-80 sm:w-[500px] pl-4 rounded-full " /></div>
                    <div className="block md:hidden">
                        {showSearch ? (
                            // Show the input field when the search icon is clicked
                            <input
                                type="text"
                                className="bg-secondary  border-bordcol border shadow-2xl p-1 w-80  sm:w-[400px] rounded-full"
                                placeholder="Search"
                                autoFocus
                                onBlur={() => setShowSearch(false)} // Hide when focus is lost
                            />
                        ) : (
                            // Show the search icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500 cursor-pointer"
                                onClick={() => setShowSearch(true)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                                />
                            </svg>
                        )}
                    </div>
                    {!showSearch &&

                        <div className="flex gap-5" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
