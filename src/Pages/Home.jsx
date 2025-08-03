import React from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import { CloudUpload, Lock, Share2 } from 'lucide-react';

export const Home = () => {
  return (
    <div className='bg-gray-950 dark:bg-gray-100 text-gray-200 dark:text-gray-900 min-h-screen font-sans'>
      <Navbar />
      <div className='flex flex-col mt-24 justify-center items-center gap-12 px-4 md:px-8 lg:px-16'>

        {/* Hero Content */}
        <div className='flex flex-col items-center text-center max-w-4xl'>
          <div className='mb-6'>
            <h1 className='text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white dark:text-gray-900 leading-tight animate-fade-in'>
              <span className='text-cyan-400'>Upload, Save</span> and Easily <span className='text-cyan-400'>Share</span> your Media
            </h1>
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <p className='text-gray-400 dark:text-gray-600 text-lg sm:text-xl font-medium max-w-2xl animate-fade-in-delay-1'>
              Drag and drop your files directly to our secure cloud and share them with your friends and colleagues in one place.
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className='animate-fade-in-delay-2'>
          <Link to='/about'>
            <button className='relative w-full sm:w-auto px-10 py-3 font-semibold text-lg text-cyan-400 dark:text-cyan-600 border-2 border-cyan-500 rounded-full transition-all duration-300 ease-in-out
              hover:scale-105 hover:bg-cyan-500 hover:text-white hover:shadow-lg
              dark:border-cyan-600 dark:hover:bg-cyan-600 dark:hover:text-white'>
              Learn More
            </button>
          </Link>
        </div>

        {/* Features Section */}
        <div className='mt-20 mb-20 w-full max-w-7xl animate-fade-in-delay-3'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center text-white dark:text-gray-900 mb-10'>Our Key Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

            {/* Feature Card 1 */}
            <div className='bg-gray-900 dark:bg-gray-200 p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 border border-gray-800 dark:border-gray-300'>
              <CloudUpload size={48} className='text-cyan-400 mb-4' />
              <h3 className='text-2xl font-semibold text-white dark:text-gray-900 mb-2'>Effortless Uploads</h3>
              <p className='text-gray-400 dark:text-gray-600'>
                Simply drag and drop your files to instantly upload them to our secure cloud storage.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className='bg-gray-900 dark:bg-gray-200 p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 border border-gray-800 dark:border-gray-300'>
              <Lock size={48} className='text-cyan-400 mb-4' />
              <h3 className='text-2xl font-semibold text-white dark:text-gray-900 mb-2'>Secure Sharing</h3>
              <p className='text-gray-400 dark:text-gray-600'>
                Your files are protected with end-to-end encryption, ensuring your privacy and data security.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className='bg-gray-900 dark:bg-gray-200 p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 border border-gray-800 dark:border-gray-300'>
              <Share2 size={48} className='text-cyan-400 mb-4' />
              <h3 className='text-2xl font-semibold text-white dark:text-gray-900 mb-2'>Easy Link Generation</h3>
              <p className='text-gray-400 dark:text-gray-600'>
                Generate unique, shareable links in seconds to send your files to anyone, anywhere.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
