import React from 'react'
import { Navbar } from '../Components/Navbar'
import {Link } from 'react-router-dom';


export const Home = () => {
  return (
    <div >
          <Navbar/>
          <div className='flex flex-col mt-24 justify-center items-center gap-6 m-auto'>
                  <div className='flex flex-col gap-3 sm:gap-6 text-center '>
                            <div>
                                <span className='text-3xl sm:text-5xl font-serif font-bold'>
                                    <span className='text-blue-600'>Upload, Save </span> 
                                    and Easily
                                </span>
                            </div>
                            <div>
                                <span className='text-3xl sm:text-5xl font-serif font-bold'>
                                    <span className='text-blue-600'>Share </span> 
                                    your Media in one
                                </span>
                            </div>
                            <div>
                                <span className='text-3xl sm:text-5xl font-serif font-bold'>place</span>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <span className='text-slate-500 text-lg sm:text-xl font-semibold'>Drag and Drop Your File Directly On Our Cloud And Share It With</span>
                                <span className='text-slate-500 text-lg sm:text-xl font-semibold'>Your Friends And Send It On Email</span>
                            </div>
                  </div>
                  <div className='flex justify-center items-center gap-10'>
                      <Link to='/Upload'>
                          <button className='whitespace-nowrap mt-2 text-white bg-purple-700 hover:shadow-black hover:shadow-md hover:bg-purple-800  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 '>Get Started</button>
                      </Link>
                      <Link to='/About'>
                        <button className='whitespace-nowrap bg-transparent hover:shadow-black hover:shadow-md hover:bg-slate-500 text-blue-700 font-medium h-fit w-fit hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg'>Learn More</button>
                      </Link>
                  </div>
          </div>
    </div>
  )
}
