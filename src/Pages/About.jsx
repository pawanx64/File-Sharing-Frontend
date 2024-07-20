import React from 'react'
import { Navbar } from '../Components/Navbar'
import image from '../Assests/file-sharing1600.jpg';

export const About = () => {
  return (
    <div className='bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen'>
    <Navbar />
    <div className='flex flex-col-reverse lg:flex-row justify-center items-center gap-12 lg:gap-20 mt-14 px-6'>
        <div className='flex flex-col justify-center items-center gap-6 max-w-xl'>
            <span className='text-[#FF3366] text-3xl font-bold underline'>About Us</span>
            <h1 className='text-[#003366] text-6xl font-serif font-extrabold text-center mb-4'>
                Welcome to Sky Box Share
            </h1>
            <h2 className='text-[#003366] text-5xl font-serif font-extrabold text-center mb-6'>
                Where Privacy Meets Simplicity
            </h2>
            <p className='text-[#333333] text-lg text-center font-serif font-medium leading-relaxed'>
                With our user-friendly platform, sharing files securely has never been easier. Join us in redefining online privacy. Sky Box Share - Your Secure Sharing Solution.
            </p>
        </div>
        <div className='flex-shrink-0'>
            <img src={image} alt='Sky Box Share logo' className='h-96 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105'/>
        </div>
    </div>
    <div className='mt-20 flex justify-center '>
        <div className='flex flex-col md:flex-row text-white justify-center gap-8 bg-gradient-to-r from-red-700 via-red-600 to-red-500 w-full p-12 rounded-xl shadow-lg'>
            <div className='flex flex-col items-center gap-2'>
                <span className='text-6xl font-bold animate-bounce'>10+</span>
                <span className='text-xl font-semibold'>Files Uploaded</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <span className='text-6xl font-bold animate-bounce'>10+</span>
                <span className='text-xl font-semibold'>Daily Active Users</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <span className='text-6xl font-bold animate-bounce'>1+</span>
                <span className='text-xl font-semibold'>Countries Using SkyBox</span>
            </div>
        </div>
    </div>
    <div className='grid lg:grid-cols-3 gap-8 px-6 mt-16'>
        <div className='bg-white text-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-red-500 transform transition-transform duration-300 hover:scale-105'>
            <h3 className='text-4xl font-mono font-bold mb-4'>Our Mission</h3>
            <p className='text-lg font-normal leading-relaxed'>
                Empower users with secure and private file sharing capabilities through cutting-edge products, enabling individuals to control access to their information on Skybox.
            </p>
        </div>
        <div className='bg-white text-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-red-500 transform transition-transform duration-300 hover:scale-105'>
            <h3 className='text-4xl font-mono font-bold mb-4'>Our Vision</h3>
            <p className='text-lg font-normal leading-relaxed'>
                To establish a realm within Skybox where privacy and security are inherent, ensuring that everyone's information remains safeguarded by default.
            </p>
        </div>
        <div className='bg-white text-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-red-500 transform transition-transform duration-300 hover:scale-105'>
            <h3 className='text-4xl font-mono font-bold mb-4'>Our Promise</h3>
            <p className='text-lg font-normal leading-relaxed'>
                With Skybox, take command of your data.
            </p>
        </div>
    </div>
    <footer className=' text-white bg-orange-700 py-8 flex flex-col items-center'>
        <h1 className='text-4xl font-sans font-semibold mb-2'>Sky Box</h1>
        <p className='text-lg font-sans font-semibold'>&copy; SkyBox 2024 All rights reserved</p>
    </footer>
</div>
  )
}
