import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Navbar } from "../Components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Download = () => {
  const { state } = useLocation();
  const { url, name, size } = state;
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted);
        }
      });
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download Successful😊', {
        position: "top-center",
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error downloading file😔', {
        position: "top-center",
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
          Download Your File
        </h1>
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-2xl font-semibold text-gray-800">
            <span className="text-blue-700">File Name:</span> {name}
          </p>
          <p className="text-2xl font-semibold text-gray-800 mt-2">
            <span className="text-blue-700">File Size:</span> {(size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <button
            onClick={handleDownload}
            className="mt-6 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out text-xl px-8 py-3 rounded-full shadow-md focus:outline-none transform hover:scale-105"
          >
            Download
          </button>
          {downloadProgress > 0 && (
            <div className="w-full max-w-md mt-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Downloading {downloadProgress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${downloadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
