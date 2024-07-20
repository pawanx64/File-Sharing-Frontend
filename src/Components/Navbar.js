import React from 'react'
import {Link } from 'react-router-dom';

export const Navbar = () => {
  return (
      <div className='bg-gradient-to-r from-blue-500 to-purple-600'>
      <div className='flex justify-between items-center p-4 max-w-screen-xl mx-auto'>
        <div className='text-white font-mono text-2xl sm:text-3xl font-bold'>
          <Link to='/'>SkyBox</Link>
        </div>
        
        <div className='hidden sm:flex space-x-8 text-white font-sans text-lg font-semibold'>
          <Link to="/" className='hover:text-yellow-300 transition-colors duration-300'>Home</Link>
          <Link to="/Upload" className='hover:text-yellow-300 transition-colors duration-300'>Upload</Link>
          <Link to="/About" className='hover:text-yellow-300 transition-colors duration-300'>About Us</Link>
        </div>
        
        <div className='flex items-center'>
          <Link to='/Upload'>
            <button className='text-white bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-lg text-sm sm:text-base px-4 sm:px-6 py-2 transition duration-300 transform hover:scale-105'>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
