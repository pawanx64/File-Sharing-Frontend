import React from 'react'
import {Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div >
        <div className='flex justify-around items-center gap-1 sm:gap-0  border-b-2 rounded'>
            
            <div className='whitespace-nowrap font-mono text-lg  sm:text-2xl inline-block sm:inline font-semibold text-blue-600 '>    
                 <Link to='/'>SkyBox</Link> 
            </div>  
            
            <div className='flex justify-center items-center gap-5 sm:gap-10 text-slate-500 font-sans text-sm sm:text-lg font-semibold '>
                        <Link to="/">
                              <div className="hover:text-blue-600 hover:underline">Home</div>
                        </Link>
                        <Link to="/Upload">
                              <div className="hover:text-blue-600 hover:underline">Upload</div>
                        </Link>
                        <Link to="/About">
                              <div className="hover:text-blue-600 hover:underline overflow-hidden whitespace-nowrap">About Us</div>
                        </Link>
            </div>
            <div className='flex  whitespace-nowrap flex-wrap justify-center sm:justify-between items-center'>
                  <Link to ='/Upload'>
                    <button className='mt-2 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-2 sm:px-5 py-1.5 sm:py-2.5 mb-2 sm:mb-2 dark:bg-purple-600 '>Get Started</button>
                  </Link>
            </div>

        </div>
    </div>
  )
}
