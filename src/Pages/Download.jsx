import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Navbar } from "../Components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Download = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(`/api/files/${fileId}`); // <-- your backend route
        setFileData(response.data);
      } catch (error) {
        console.error('Error fetching file details:', error);
        toast.error('Error fetching file details 😔', { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [fileId]);

  const handleDownload = async () => {
    if (!fileData || !fileData.url || !fileData.name) {
      toast.error('No file information available!', { position: "top-center" });
      return;
    }

    try {
      setIsDownloading(true);
      const response = await axios.get(fileData.url, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted);
        }
      });

      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', fileData.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      toast.success('Download Successful 😊', { position: "top-center" });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error downloading file 😔', { position: "top-center" });
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className='bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center'>
        <p className="text-lg text-gray-700">Loading file details...</p>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className='bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center'>
        <p className="text-lg text-red-600">File not found or error loading file.</p>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen'>
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
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-lg w-full">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            <span className="text-blue-700">File Name:</span> {fileData.name}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-blue-700">File Size:</span> {(fileData.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`${
                isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition duration-300 ease-in-out text-lg px-8 py-3 rounded-full shadow-md focus:outline-none transform hover:scale-105`}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>
          </div>
          {downloadProgress > 0 && (
            <div className="w-full mt-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Downloading {downloadProgress}%
                  </span>
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
