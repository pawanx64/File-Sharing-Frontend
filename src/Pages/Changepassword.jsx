import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../Components/Navbar';




const InputField = ({ label, value, onChange, placeholder, showPassword, toggleVisibility, id }) => (
    <div className="relative mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 dark:text-neutral-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 dark:bg-neutral-200 dark:border-neutral-300 dark:text-neutral-900 dark:placeholder-neutral-500"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white dark:text-neutral-600 dark:hover:text-neutral-900 transition"
          aria-label={`Toggle ${label.toLowerCase()} visibility`}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
);


export default function ChangePassword() {
  const navigate = useNavigate();

  // State to manage form inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for UI feedback
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    // Basic client-side validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation do not match.');
      setIsError(true);
      return;
    }

    if (newPassword.length < 8) {
      setMessage('New password must be at least 8 characters long.');
      setIsError(true);
      return;
    }
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // API call to change the password
      const response = await fetch('http://localhost:5000/api/changepassword', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message || 'Password updated successfully!');
        setIsError(false);
        // Clear the form after success
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(responseData.message || 'Failed to update password. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Password change error:', error);
      setMessage('An unexpected error occurred. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-950 dark:bg-neutral-100 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-gray-800 dark:bg-neutral-200 shadow-2xl rounded-lg p-6 sm:p-10 transform transition duration-300 hover:scale-[1.01]">
          <div className="flex justify-center mb-6">
            <Lock className="w-12 h-12 text-cyan-400 dark:text-cyan-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-white dark:text-neutral-900 mb-2">Change Your Password</h1>
          <p className="text-center text-gray-400 dark:text-neutral-600 mb-6">
            Update your password to keep your account secure.
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              id="current-password"
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              showPassword={showCurrentPassword}
              toggleVisibility={() => setShowCurrentPassword(!showCurrentPassword)}
            />
            <InputField
              id="new-password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter a new password"
              showPassword={showNewPassword}
              toggleVisibility={() => setShowNewPassword(!showNewPassword)}
            />
            <InputField
              id="confirm-password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              showPassword={showConfirmPassword}
              toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {message && (
              <div className={`flex items-center p-3 my-4 rounded-md ${isError ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'} dark:bg-opacity-10`}>
                {isError ? <XCircle className="w-5 h-5 mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                <p className="text-sm break-words">{message}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
