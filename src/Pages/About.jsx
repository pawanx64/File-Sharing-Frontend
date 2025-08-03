import React from 'react';
import Navbar from '../Components/Navbar';
import { Globe, Users, CloudUpload } from 'lucide-react';
import image from '../Assests/file-sharing1600.jpg';

export const About = () => {
  return (
    <div className='bg-gray-950 dark:bg-gray-100 text-gray-200 dark:text-gray-900 min-h-screen font-sans overflow-x-hidden'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>

        {/* Hero Section */}
        <div className='flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20'>
          {/* Text Content */}
          <div className='flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-xl w-full'>
            <span className='text-2xl sm:text-3xl font-bold text-cyan-400'>About Us</span>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white dark:text-gray-900 leading-tight'>
              Welcome to SkyBox Share
            </h1>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 dark:text-gray-700'>
              Where Privacy Meets Simplicity
            </h2>
            <p className='text-base sm:text-lg md:text-xl text-gray-400 dark:text-gray-600 leading-relaxed mt-4'>
              With our user-friendly platform, sharing files securely has never been easier.
              Join us in redefining online privacy. SkyBox Share - Your Secure Sharing Solution.
            </p>
          </div>

          {/* Image */}
          <div className='w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0'>
            <img
              src={image}
              alt='File sharing illustration'
              className='h-96 rounded-lg shadow-2xl object-cover transition-transform duration-500 hover:scale-105 dark:shadow-gray-400'
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className='mt-12 sm:mt-16'>
          <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 sm:gap-12 p-6 sm:p-12 rounded-xl bg-gray-900 dark:bg-gray-200 shadow-xl border border-gray-800 dark:border-gray-300'>
            {[
              {
                icon: <CloudUpload size={48} className='text-cyan-400 mb-2' />,
                count: '10+',
                label: 'Files Uploaded'
              },
              {
                icon: <Users size={48} className='text-cyan-400 mb-2' />,
                count: '10+',
                label: 'Daily Active Users'
              },
              {
                icon: <Globe size={48} className='text-cyan-400 mb-2' />,
                count: '1+',
                label: 'Countries Using SkyBox'
              }
            ].map((stat, index) => (
              <div
                key={index}
                className='flex flex-col items-center gap-1 text-center transform transition-transform duration-300 hover:scale-110 w-48 sm:w-60'
              >
                {stat.icon}
                <span className='text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-gray-900'>{stat.count}</span>
                <span className='text-sm sm:text-md md:text-lg font-medium text-gray-400 dark:text-gray-600'>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission, Vision, Promise */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16'>
          {[
            {
              title: 'Our Mission',
              text: 'Empower users with secure and private file sharing capabilities through cutting-edge products, enabling individuals to control access to their information on SkyBox.'
            },
            {
              title: 'Our Vision',
              text: 'To establish a realm within SkyBox where privacy and security are inherent, ensuring that everyone\'s information remains safeguarded by default.'
            },
            {
              title: 'Our Promise',
              text: 'With SkyBox, take command of your data. We are committed to providing a platform that respects your privacy and gives you full control over your shared files.'
            }
          ].map((card, index) => (
            <div
              key={index}
              className='bg-gray-900 dark:bg-gray-200 p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-cyan-500 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
            >
              <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-gray-900 mb-3'>{card.title}</h3>
              <p className='text-sm sm:text-base md:text-lg text-gray-400 dark:text-gray-600 leading-relaxed'>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 dark:bg-gray-200 text-gray-400 dark:text-gray-700 text-center py-8 mt-16'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-extrabold text-white dark:text-gray-900 mb-2'>SkyBox</h1>
        <p className='text-xs sm:text-sm md:text-base'>&copy; SkyBox 2024 All rights reserved</p>
      </footer>
    </div>
  );
};
