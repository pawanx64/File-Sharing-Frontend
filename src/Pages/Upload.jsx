import React, { useRef, useState, useEffect } from "react";
import Navbar from '../Components/Navbar';
import { CloudUpload, ClipboardCheck } from "lucide-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const MAX_FILE_SIZE_MB = 5; // 5MB
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleFile = (file) => {
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`, { position: "top-center" });
      setSelectedFile(null);
    } else if (file) {
      setSelectedFile(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('No file selected. Please choose a file to upload.', { position: "top-center" });
      return;
    }
    toast.info('Uploading file... 🔄', { position: "top-center" });
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      // TODO: Update the upload URL to your backend endpoint
      const response = await axios.post('https://file-sharing-backend-rho.vercel.app/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      const id = response.data.id;
      // TODO: Update the download URL to your backend endpoint
      const urlResponse = await axios.get(`https://file-sharing-backend-rho.vercel.app/api/download/${id}`);
      const secureUrl = urlResponse.data.secure_url;
      setDownloadLink(secureUrl);

      setUploadProgress(0); // Reset progress after successful upload
      toast.success('Upload successful! 🎉', { position: "top-center" });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again. 😔', { position: "top-center" });
    }
  };

  const copyToClipboard = () => {
    if (!downloadLink) {
      toast.error('No link to copy!', { position: "top-center" });
      return;
    }
    // A more compatible way to copy text in the current environment
    const tempInput = document.createElement('input');
    tempInput.value = downloadLink;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    toast.success('Download link copied to clipboard!', { position: "top-center" });
  };

  const clearFile = () => {
    setSelectedFile(null);
    setDownloadLink('');
    setUploadProgress(0);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className='bg-gray-950 dark:bg-neutral-50 min-h-screen flex flex-col font-sans text-gray-200 dark:text-neutral-900'>
      
      <Navbar />

      <div className="flex flex-col items-center gap-12 mt-16 p-6 flex-grow">
        <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white dark:text-neutral-900 leading-tight">
              Start <span className="text-cyan-400 dark:text-cyan-600">Uploading</span> Your File
            </h1>
            <p className="mt-2 text-gray-400 dark:text-neutral-600 text-lg">
                and securely <span className="text-cyan-400 dark:text-cyan-600">share</span> it with anyone.
            </p>
        </div>

        {/* Upload/Selected File Display */}
        <div 
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!selectedFile ? handleDivClick : undefined}
          className={`
            bg-gray-900 dark:bg-neutral-100 p-8 rounded-xl shadow-2xl w-full max-w-md cursor-pointer 
            transition-all duration-300 transform border-2 border-dashed
            ${isDragging ? 'border-cyan-500 scale-105' : 'border-gray-700 dark:border-neutral-300 hover:border-cyan-500'}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center text-center">
              <CloudUpload size={60} className="text-cyan-400 dark:text-cyan-600 mb-4" />
              <p className="text-lg font-bold text-gray-400 dark:text-neutral-700">
                Click to upload or drag & drop a file here
              </p>
              <p className="text-sm mt-2 text-gray-500 dark:text-neutral-500">
                Maximum file size: {MAX_FILE_SIZE_MB}MB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl font-bold text-white dark:text-neutral-900 mb-2 truncate w-full">
                {selectedFile.name}
              </p>
              <p className="text-lg text-gray-400 dark:text-neutral-600">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the parent div's onClick from firing
                  clearFile();
                }}
                className="mt-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Change File
              </button>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`
            w-full max-w-sm px-6 py-3 text-lg font-bold rounded-full shadow-md
            transition-all duration-300 transform
            ${selectedFile ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-700 dark:bg-neutral-400 cursor-not-allowed'}
            text-white dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
          `}
        >
          Upload File
        </button>

        {/* Upload Progress Bar */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full max-w-md mt-6">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200">
                  Uploading {uploadProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-3 flex rounded bg-gray-800 dark:bg-neutral-300">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
        )}

        {/* Download Link Display */}
        {downloadLink && (
          <div className="bg-gray-900 dark:bg-neutral-100 p-6 rounded-xl shadow-lg mt-6 w-full max-w-md">
            <p className="text-lg font-bold text-white dark:text-neutral-900 mb-2">
              Your Download Link:
            </p>
            <div className="flex items-center gap-2 bg-gray-800 dark:bg-neutral-200 p-3 rounded-lg border border-gray-700 dark:border-neutral-300">
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 dark:text-cyan-600 hover:underline text-base truncate w-full"
              >
                {downloadLink}
              </a>
              <button
                onClick={copyToClipboard}
                className="p-1 text-gray-400 dark:text-neutral-700 hover:text-white dark:hover:text-neutral-900 transition-colors duration-200"
              >
                <ClipboardCheck size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
};
