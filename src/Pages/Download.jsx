import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export const Download = ({id}) => {
    const [secureUrl, setSecureUrl] = useState('');

  useEffect(() => {
    const fetchSecureUrl = async () => {
      try {
        if (!id) {
          console.error('No id provided.');
          return;
        }
        const response = await axios.get(`https://file-sharing-backend-rho.vercel.app/${id}`);
        setSecureUrl(response.data.secure_url);
      } catch (error) {
        console.error('Error fetching secure URL:', error);
      }
    };
      fetchSecureUrl();
    
  }, [id]);


  return (
    <div>
        {secureUrl && (
        <div className='text-black'> 
          Download Link: <a href={secureUrl} target='_blank'>{secureUrl}</a>
        </div>
      )}
    </div>
  )
}