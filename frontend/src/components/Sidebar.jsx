import React from 'react'
import { useState } from 'react';
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 md:w-80`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">My Sidebar</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
        <ul className="mt-4 text-white">
          <li className="p-4 hover:bg-gray-700">Home</li>
          <li className="p-4 hover:bg-gray-700">About</li>
          <li className="p-4 hover:bg-gray-700">Services</li>
          <li className="p-4 hover:bg-gray-700">Contact</li>
        </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 bg-gray-100">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">My Website</h1>
      </header>
      <main className="p-4">
        <h2 className="text-lg font-bold">Welcome to my website!</h2>
        <p>Click the menu button to open or close the sidebar.</p>
      </main>
    </div>
  </div>
  )
}

export default Sidebar
