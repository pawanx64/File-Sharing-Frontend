import React from 'react'
import { Navbar } from '../Components/Navbar'
import {Link } from 'react-router-dom';


export const Home = () => {
  return (
    <div className='bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen'>
      <Navbar />
      <div className='flex flex-col mt-24 justify-center items-center gap-8 px-4 md:px-8 lg:px-16'>
        <div className='text-center'>
          <div className='mb-6'>
            <h1 className='text-4xl sm:text-6xl font-extrabold text-gray-800'>
              <span className='text-blue-600'>Upload, Save </span>
              and Easily
            </h1>
          </div>
          <div className='mb-6'>
            <h1 className='text-4xl sm:text-6xl font-extrabold text-gray-800'>
              <span className='text-blue-600'>Share </span>
              your Media in one
            </h1>
          </div>
          <div className='mb-6'>
            <h1 className='text-4xl sm:text-6xl font-extrabold text-gray-800'>
              place
            </h1>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <p className='text-slate-600 text-lg sm:text-xl font-medium'>
              Drag and Drop Your File Directly On Our Cloud
            </p>
            <p className='text-slate-600 text-lg sm:text-xl font-medium'>
              and Share It With Your Friends or Send It By Email
            </p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-6'>
          <Link to='/Upload'>
            <button className='bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 font-semibold rounded-full text-lg px-8 py-3 transition duration-300 transform hover:scale-105'>
              Get Started
            </button>
          </Link>
          <Link to='/About'>
            <button className='bg-white text-blue-700 hover:bg-blue-100 font-semibold border-2 border-blue-500 rounded-full text-lg px-8 py-3 transition duration-300 transform hover:scale-105'>
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
