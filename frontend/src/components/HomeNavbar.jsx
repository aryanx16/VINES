import React from 'react'
import { BlurText } from '../Animations/BlurText'
import { Link, useNavigate } from 'react-router-dom'

const HomeNavbar = () => {
    const navigate = useNavigate()
  return (
    <div className='text-3xl border-b border-neutral-700 w-full  sm:px-6 py-4 flex justify-between'>
    <div className='flex'>
    
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/blue-flame-3d-icon-download-in-png-blend-fbx-gltf-file-formats--fire-heat-hot-pack-miscellaneous-icons-5904433.png?f=webp" className='w-8 h-8' alt="" />
        <div className='font-bold'>
            {/* <BlurText text="Vines" className="custom-class " delay={50} /> */}
            Vines

        </div>
    </div>
    <div className='flex gap-2 sm:gap-5 text-lg sm:text-xl justify-center items-center'>
        <div className='cursor-pointer hidden sm:flex sm:justify-center sm:items-center hover:text-neutral-300'>Home <img className='h-6 w-6' src="https://cdn3d.iconscout.com/3d/premium/thumb/home-3d-icon-download-in-png-blend-fbx-gltf-file-formats--property-house-estate-user-interface-pack-icons-4652885.png?f=webp" alt="" /></div>
        <Link to="https://github.com/aryanx16/VINES"  className='hover:text-neutral-300 cursor-pointer flex justify-center items-center sm:gap-1'> Github 
            <img  className='w-9 h-9 hover:scale-110 transition-all duration-700' src="https://cdn3d.iconscout.com/3d/free/thumb/free-github-3d-icon-download-in-png-blend-fbx-gltf-file-formats--logo-social-media-technology-pack-logos-icons-4684832.png?f=webp" alt="" /></Link>
        <Link to="https://github.com/aryanx16"  className='hover:text-neutral-300 cursor-pointer sm:hidden'>Owner</Link>
        <Link to="https://github.com/aryanx16" className=' hover:text-neutral-300 cursor-pointer hidden  sm:flex'> Who made This?</Link>
        <div></div>
    </div>
</div>
  )
}

export default HomeNavbar
