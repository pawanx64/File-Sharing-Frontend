import React,{useRef,useState,useEffect} from "react";
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
  const[genlink,setgenlink]=useState('');

  const navigate=useNavigate();
  const fileInputRef = useRef(null);
  
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    console.log('Selected file:', file);
    setSelectedFile(file);
    fileInputRef.current.style.display = 'none';
  };

  const handleUpload=async()=>{
    if(!selectedFile)
    {
        toast.error('No File Selected😔', {
          position: "top-center",
      });
      return ;
    }
    toast.info('Uploading File.Plz Wait 60 Sec.🔄', { position: "top-center" });
    const formData=new FormData();
    formData.append('file',selectedFile);
    try{
      const response=await axios.post('https://file-sharing-backend-rho.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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

    }
      catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file😔', {
          position: "top-center",
      })
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
        .catch(err => 
          {console.error('Failed to copy link: ', err)
          toast.error('Failed to copy link😔', {
            position: "top-center",
        })
        });
    }
  };
  
  return (
    <div>
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
      <div className="flex flex-wrap flex-col mt-24 justify-center items-center gap-10 m-auto mb-24">
        <div className="text-center md:text-left">
          <span className="text-3xl md:text-2xl lg:text-3xl font-sans font-bold">
            Start <span className="text-blue-600">Uploading </span>File And
            <span className="text-blue-600"> Share </span> it
          </span>
        </div>
        <div onClick={handleDivClick} className="flex flex-wrap bg-slate-100 hover:bg-slate-200 flex-col gap-6  justify-center border-4 border-dotted p-6 md:p-16 border-stone-400">
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <span className="flex justify-center">
            <HiOutlineCloudUpload size={60} className="" />
          </span>
          <span className="flex  gap-2 text-lg sm:text-3xl  font-sans font-bold">
            Click To Upload Or
            <span className="text-blue-600">Drag</span>
            And
            <span className="text-blue-600">Drop</span>
          </span>
        </div>
        <div className="flex flex-wrap">
            {selectedFile && (
                <div className=" flex flex-wrap border-4 border-dotted p-4 border-stone-400">
                    <p className="text-xl font-sans font-bold"><span className="text-blue-700">Selected file:</span> {selectedFile.name}</p>
                </div>
            )}
        </div>
        <div>
          <button onClick={handleUpload} className="text-white bg-blue-700 hover:shadow-lg hover:shadow-slate-400 text-xl w-60  hover:bg-blue-800  font-medium rounded-full  px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Upload
            
          </button>
          
        </div>
        <div className="flex justify-center mb-10">
            { genlink && (
              <div className="flex flex-col border-4 border-dotted p-5  md:w-auto gap-4 border-stone-400 text-lg md:text-xl font-sans font-bold ">
                      <span className="flex justify-center">Generated Link</span>
                      <span className="flex justify-center items-center flex-wrap gap-4">
                            <a href={genlink} target="_blank" rel="noopener noreferrer" className=" text-center text-blue-600 hover:underline break-all">{genlink}</a>
                            <button onClick={handleCopyButtonClick} className="flex justify-center items-center" ><MdContentCopy size={21}/></button>
                      </span>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};
