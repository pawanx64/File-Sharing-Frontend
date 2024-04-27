import React from 'react'
import { Navbar } from '../Components/Navbar'
import image from '../Assests/file-sharing1600.jpg';

export const About = () => {
  return (
    <div >
        <Navbar />
        <div className='flex flex-col-reverse lg:flex-row justify-center items-center gap-10 mt-14 '>
            <div className='flex flex-col justify-center items-center  gap-6'>
                <span className='text-[#FF3366] flex justify-center text-2xl font-bold underline font-sans'>About Us</span>
                <span className='text-[#006699] text-4xl font-serif text-center font-extrabold'>Welcome to Sky Box Share</span>
                <span className='text-[#006699] text-4xl font-serif text-center font-extrabold'>Where privacy meets simplicity</span>
                <span className='text-[#333333] text-lg text-center font-serif font-bold'>With our user-friendly platform, sharing files securely has never been easier.</span>
                <span className='text-[#333333] text-lg text-center font-serif font-bold'>Join us in redefining online privacy. Sky Box Share - Your Secure Sharing Solution.</span>
            </div>
            <div>
                    <img src={image} alt='logo' className='h-96'/>
            </div>
        </div>
        <div className='mt-20 flex justify-center border-t-2 border-black'>
            <div className='flex flex-col md:flex-row text-white justify-center gap-20 bg-red-700 w-full p-20'>
                <div className='flex flex-col gap-2'>
                    <span className='flex justify-center text-5xl font-bold '>10+</span>
                    <span className='flex justify-center text-medium font-semibold'>Files Uploaded</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='flex justify-center text-5xl font-bold '>10+</span>
                    <span className='flex justify-center text-medium font-semibold'>Daily Active Users</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='flex justify-center text-5xl font-bold '>1+</span>
                    <span className='flex justify-center text-medium font-semibold'>Countries Using SkyBox</span>
                </div>
            </div>
        </div>
        <div className=' grid  text-white row-span-3 lg:grid-cols-3 border-t-2 border-black gap-4 bg-slate-800 pt-14 pl-5 pr-5 pb-14'>
                <div className='flex flex-col border-2  border-red-400 gap-4 p-5'>
                    <span className='flex justify-center text-3xl font-mono font-bold'>Our Mission</span>
                    <p className='font-normal text-lg'>Empower users with secure and private file sharing capabilities through cutting-edge products, enabling individuals to control access to their information on Skybox.</p>
                </div>
                <div className='flex flex-col border-2  border-red-400 gap-4 p-5'>
                    <span className='flex justify-center text-3xl font-mono font-bold'>Our Vision</span>
                    <p className='font-normal text-lg'>To establish a realm within Skybox where privacy and security are inherent, ensuring that everyone's information remains safeguarded by default.</p>
                </div >
                <div className='flex flex-col border-2  border-red-400 gap-4 p-5'>
                    <span className='flex justify-center text-3xl font-mono font-bold'>Our promise</span>
                    <p className='font-normal text-lg'>With Skybox, take command of your data.</p>
                </div>
        </div>
        <div>
                <div className='border-t-2 border-black text-white bg-orange-600 pt-6 pb-6 flex gap-2 flex-col justify-center items-center'>
                    <h1 className='text-3xl font-sans font-semibold '>Sky Box</h1>    
                    <p className='text-md font-sans font-semibold'>&copy; SkyBox 2024 All rights reserved</p>
                </div>
        </div>
    </div>
  )
}
