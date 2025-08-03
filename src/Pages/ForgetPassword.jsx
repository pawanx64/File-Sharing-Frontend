import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, CheckCircle, XCircle, Mail, KeyRound, Eye, EyeOff } from 'lucide-react';
import Navbar from '../Components/Navbar';

const InputField = React.memo(
  ({ label, value, onChange, placeholder, showPassword, toggleVisibility, id, type = 'text', iconElement }) => (
    <div className="relative mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 dark:text-neutral-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword !== undefined ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 dark:bg-neutral-200 dark:border-neutral-300 dark:text-neutral-900 dark:placeholder-neutral-500"
        />
        
        {toggleVisibility && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white dark:text-neutral-600 dark:hover:text-neutral-900 transition"
            aria-label={`Toggle ${label.toLowerCase()} visibility`}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  )
);

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState('email');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!email) {
      setMessage('Please enter your email address.');
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message || 'OTP sent successfully! Please check your email.');
        setIsError(false);
        setStep('otp');
      } else {
        setMessage(responseData.message || 'Failed to send OTP. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('An unexpected error occurred. Please check your network connection.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!otp) {
      setMessage('Please enter the OTP.');
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message || 'OTP verified!');
        setIsError(false);
        setStep('newPassword');
      } else {
        setMessage(responseData.message || 'Invalid or expired OTP.');
        setIsError(true);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setMessage('An unexpected error occurred. Please check your network connection.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!newPassword || !confirmPassword) {
      setMessage('Both password fields are required.');
      setIsError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation do not match.');
      setIsError(true);
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message || 'Password reset successfully!');
        setIsError(false);
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(responseData.message || 'Failed to reset password. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage('An unexpected error occurred. Please check your network connection.');
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
          <h1 className="text-3xl font-bold text-center text-white dark:text-neutral-900 mb-2">Forgot Password</h1>

          {step === 'email' && (
            <>
              <p className="text-center text-gray-400 dark:text-neutral-600 mb-6">
                Enter your email to receive a password reset OTP.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <InputField
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  type="email"
                  iconElement={<Mail className="w-5 h-5 text-white" />}
                />
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <p className="text-center text-gray-400 dark:text-neutral-600 mb-6">
                Please enter the 6-digit OTP sent to your email.
              </p>
              <form onSubmit={handleOtpSubmit}>
                <InputField
                  id="otp"
                  label="One-Time Password (OTP)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  iconElement={<KeyRound className="w-5 h-5" />}
                />
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </>
          )}

          {step === 'newPassword' && (
            <>
              <p className="text-center text-gray-400 dark:text-neutral-600 mb-6">
                Enter your new password below.
              </p>
              <form onSubmit={handlePasswordSubmit}>
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
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}

          {message && (
            <div className={`flex items-center p-3 mt-6 rounded-md ${isError ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'} dark:bg-opacity-10`}>
              {isError ? <XCircle className="w-5 h-5 mr-2 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />}
              <p className="text-sm break-words">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
