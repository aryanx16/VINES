import React from 'react'
import Navbar from '../components/Navbar'

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className='bg-neutral-950 pt-20 min-h-screen flex flex-col justify-center items-center '>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-in-globe-illustration-download-svg-png-gif-file-formats--result-not-error-empty-states-pack-design-development-illustrations-8060930.png?f=webp" alt="" />
        <div className='text-white flex justify-center items-center flex-col text-2xl px-6 sm:text-3xl font-mono'>
          <div>
            This page isn't available. Sorry about that.
          </div>
          <div>
            Try searching for something else.
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
