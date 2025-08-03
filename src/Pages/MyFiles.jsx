import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { File, Trash2, Eye, Link, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../Components/Navbar';

// Helper function to format file size from bytes to a human-readable string
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null); // State to track which link was copied
  const [expandedFileId, setExpandedFileId] = useState(null); // State to track which file's details are expanded
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If no token, redirect to login page
          navigate('/login');
          return;
        }

        // The endpoint is now correctly prefixed with /api
        const response = await fetch('http://localhost:5000/api/myfiles', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }

        const data = await response.json();
        
        // Map the backend data to match the expected format for the UI
        const formattedFiles = data.files.map(file => ({
          id: file._id,
          name: file.filename,
          size: formatFileSize(file.sizeInBytes),
          uploadDate: new Date(file.uploadTime).toLocaleDateString(), // Format the date
          fileType: file.filename.split('.').pop().toUpperCase(),
          secure_url: file.secure_url // Add the secure_url for viewing
        }));
        
        setFiles(formattedFiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
        // Optionally, handle error state or show a message to the user
      }
    };
    
    fetchFiles();
  }, [navigate]);

  const handleDelete = async (fileId) => {
    console.log(`Attempting to delete file with ID: ${fileId}`);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/file/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      // Optimistically update the UI by removing the file from the state
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      console.log(`File ${fileId} successfully deleted.`);
    } catch (error) {
      console.error("Error deleting file:", error);
      // Handle the error (e.g., show an error toast)
    }
  };

  const handleView = (fileUrl) => {
    console.log(`Viewing file at URL: ${fileUrl}`);
    // Open the file's secure URL in a new tab for viewing
    window.open(fileUrl, '_blank');
  };

  const handleShare = (file) => {
    try {
      // Use the secure_url directly from the file object
      const shareLink = file.secure_url;
      
      // Use the clipboard API for modern browsers
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareLink).then(() => {
          console.log(`Share link copied: ${shareLink}`);
          setCopiedLink(file.id);
          setTimeout(() => setCopiedLink(null), 2000);
        }).catch(err => {
          console.error('Failed to copy text using clipboard API: ', err);
          fallbackCopy(shareLink, file.id);
        });
      } else {
        // Fallback for older browsers
        fallbackCopy(shareLink, file.id);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fallbackCopy = (text, fileId) => {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(tempInput);
    
    setCopiedLink(fileId);
    setTimeout(() => setCopiedLink(null), 2000);
  };
  
  // Toggle the expanded details for a file
  const handleToggleDetails = (fileId) => {
    setExpandedFileId(expandedFileId === fileId ? null : fileId);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-white dark:bg-neutral-100 dark:text-neutral-900">
        <p>Loading your files...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white dark:bg-neutral-100 dark:text-neutral-900">
      <Navbar />
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-cyan-400 dark:text-cyan-600">My Uploaded Files</h1>
        {files.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-neutral-600">You haven't uploaded any files yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map(file => (
              <li
                key={file.id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 flex flex-col transition-transform duration-200 hover:scale-[1.01] dark:bg-neutral-200"
              >
                {/* Main file info and actions row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-0 gap-2 sm:gap-4 w-full">
                    <File className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 dark:text-cyan-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-lg font-semibold break-words dark:text-neutral-900">
                        {file.name}
                      </p>
                      <p className="text-xs sm:text-base text-gray-400 dark:text-neutral-500 break-words">
                        Size: {file.size} | Uploaded: {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action buttons and toggle */}
                  <div className="flex space-x-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end items-center flex-shrink-0">
                    <button
                      onClick={() => handleView(file.secure_url)}
                      className="p-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      title="View File"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      title="Delete File"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => handleShare(file)}
                        className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-neutral-500 dark:hover:bg-neutral-600"
                        title="Copy Share Link"
                      >
                        {copiedLink === file.id ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Link className="w-5 h-5" />}
                      </button>
                      {copiedLink === file.id && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm text-green-400 bg-gray-800 px-2 py-1 rounded-md whitespace-nowrap dark:bg-neutral-700">
                          Copied!
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleToggleDetails(file.id)}
                      className="p-2 ml-4 text-white hover:text-cyan-400 transition-colors duration-200 dark:text-neutral-900 dark:hover:text-cyan-600"
                      title="Toggle Details"
                      aria-expanded={expandedFileId === file.id}
                      aria-controls={`file-details-${file.id}`}
                    >
                      {expandedFileId === file.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible details section */}
                <div
                  id={`file-details-${file.id}`}
                  className={`mt-4 pt-4 border-t border-gray-700 dark:border-neutral-300 ${expandedFileId === file.id ? 'block' : 'hidden'}`}
                >
                  <div className="flex items-center mb-2">
                    <Info className="w-4 h-4 mr-2 text-cyan-400 dark:text-cyan-500" />
                    <span className="font-bold text-white dark:text-neutral-900">File Properties</span>
                  </div>
                  <p className="text-sm text-gray-300 dark:text-neutral-700">Name: {file.name}</p>
                  <p className="text-sm text-gray-300 dark:text-neutral-700">Size: {file.size}</p>
                  <p className="text-sm text-gray-300 dark:text-neutral-700">Type: {file.fileType}</p>
                  <p className="text-sm text-gray-300 dark:text-neutral-700">Uploaded: {file.uploadDate}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
