import React from 'react'

const VideoLoader = () => {
    return (
        <div className='min-h-screen bg-neutral-900 p-2  lg:p-4'>
            {/* contains two div */}
            <div className='grid grid-cols-3 animate-pulse  gap-3'>
                {/* left video section */}
                <div className='lg:col-span-2 col-span-3'>
                    {/* video */}
                    <div className=' bg-neutral-700 h-52 lg:h-80 rounded-xl mb-1'>
                    </div>
                    {/* below video */}
                    <div className=' h-20 flex gap-1'>
                        {/* logo */}
                        <div className='h-12 w-12 rounded-full bg-neutral-700'></div>
                        {/* title */}
                        <div className=''>
                            <div className='w-[300px] lg:w-[500px] rounded-md bg-neutral-700 h-7 mb-1'></div>
                            <div className='w-28 rounded-md bg-neutral-800 h-5'></div>
                        </div>
                    </div>
                    <div >
                    </div>
                </div>
                {/* right recommended videos */}
                <div className='col-span-3 lg:col-span-1'>

                        <div className='grid grid-cols-5 gap-2 mb-2'>
                            {/* thumbnail */}
                            <div className='col-span-2 rounded-md bg-neutral-800 h-20 lg:h-28'>

                            </div>
                            {/* title of thumbnail */}
                            <div className='col-span-3  '>
                                <div className='h-7 mb-2 rounded-md bg-neutral-700'></div>
                                <div className='h-6 rounded-md w-16 bg-neutral-800'></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-2 mb-2'>
                            {/* thumbnail */}
                            <div className='col-span-2 rounded-md bg-neutral-800 h-20 lg:h-28'>

                            </div>
                            {/* title of thumbnail */}
                            <div className='col-span-3  '>
                                <div className='h-7 mb-2 rounded-md bg-neutral-700'></div>
                                <div className='h-6 rounded-md w-16 bg-neutral-800'></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-2 mb-2'>
                            {/* thumbnail */}
                            <div className='col-span-2 rounded-md bg-neutral-800 h-20 lg:h-28'>

                            </div>
                            {/* title of thumbnail */}
                            <div className='col-span-3  '>
                                <div className='h-7 mb-2 rounded-md bg-neutral-700'></div>
                                <div className='h-6 rounded-md w-16 bg-neutral-800'></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-2 mb-2'>
                            {/* thumbnail */}
                            <div className='col-span-2 rounded-md bg-neutral-800 h-20 lg:h-28'>

                            </div>
                            {/* title of thumbnail */}
                            <div className='col-span-3  '>
                                <div className='h-7 mb-2 rounded-md bg-neutral-700'></div>
                                <div className='h-6 rounded-md w-16 bg-neutral-800'></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-2 mb-2'>
                            {/* thumbnail */}
                            <div className='col-span-2 rounded-md bg-neutral-800 h-20 lg:h-28'>

                            </div>
                            {/* title of thumbnail */}
                            <div className='col-span-3  '>
                                <div className='h-7 mb-2 rounded-md bg-neutral-700'></div>
                                <div className='h-6 rounded-md w-16 bg-neutral-800'></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-2 mb-2'>
                            {/* thumbnail */}
                            <div className='col-span-2 rounded-md bg-neutral-800 h-20 lg:h-28'>

                            </div>
                            {/* title of thumbnail */}
                            <div className='col-span-3  '>
                                <div className='h-7 mb-2 rounded-md bg-neutral-700'></div>
                                <div className='h-6 rounded-md w-16 bg-neutral-800'></div>
                            </div>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default VideoLoader
