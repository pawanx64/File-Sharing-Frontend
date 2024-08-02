import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from "../Components/Navbar";
import { HiOutlineCloudUpload } from "react-icons/hi";
import axios from 'axios';
import { MdContentCopy } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedId, setUploadedId] = useState(null);
  const [genlink, setgenlink] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    console.log('Selected file:', file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('No File Selected😔', {
        position: "top-center",
      });
      return;
    }
    toast.info('Uploading File. Please wait...🔄', { position: "top-center" });
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post('https://file-sharing-backend-rho.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      console.log('Upload successful:', response.data);
      setUploadedId(response.data.id);
      toast.success('Upload Successful😊', {
        position: "top-center",
      });
      const id = response.data.id;
      const urlResponse = await axios.get(`https://file-sharing-backend-rho.vercel.app/${id}`);
      const secureUrl = urlResponse.data.file.secure_url;
      setgenlink(secureUrl);
      console.log('Secure URL:', secureUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file😔', {
        position: "top-center",
      });
    }
  }

  const handleCopyButtonClick = () => {
    if (genlink) {
      navigator.clipboard.writeText(genlink)
        .then(() => 
          toast.success('Link copied to clipboard😊', {
            position: "top-center",
          })
        )
        .catch(err => {
          console.error('Failed to copy link: ', err);
          toast.error('Failed to copy link😔', {
            position: "top-center",
          });
        });
    }
  };
  
  return (
    <div className='bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen'>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <div className="flex flex-col items-center gap-12 mt-16 mb-24 p-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 text-center">
          Start <span className="text-blue-600">Uploading</span> Your File and <span className="text-blue-600">Share</span> It
        </h1>
        {!selectedFile && (
          <div
            onClick={handleDivClick}
            className="bg-white hover:bg-gray-50 transition duration-300 ease-in-out flex flex-col items-center justify-center border-4 border-dashed border-gray-300 p-8 rounded-xl shadow-lg cursor-pointer"
          >
            <input
              type="file"
              name="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <HiOutlineCloudUpload size={60} className="text-blue-600 mb-4" />
            <p className="text-lg font-bold text-gray-700">
              Click To Upload Or <span className="text-blue-600">Drag</span> And <span className="text-blue-600">Drop</span>
            </p>
          </div>
        )}
        {selectedFile && (
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-800">
              <span className="text-blue-700">Selected file:</span> {selectedFile.name}
            </p>
          </div>
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out text-xl px-6 py-2 rounded-full shadow-md focus:outline-none"
        >
          Upload
        </button>
        {uploadProgress > 0 && (
          <div className="w-full max-w-md">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Uploading {uploadProgress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                ></div>
              </div>
            </div>
          </div>
        )}
        {genlink && (
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg shadow-md bg-white">
            <p className="text-xl font-semibold text-gray-800">Generated Link</p>
            <div className="flex flex-col items-center gap-4 mt-4">
              <a
                href={genlink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {genlink}
              </a>
              <button
                onClick={handleCopyButtonClick}
                className="flex items-center justify-center text-blue-600 hover:bg-blue-50 p-2 rounded-full transition duration-300 ease-in-out"
              >
                <MdContentCopy size={21} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
