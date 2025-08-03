import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const navigate = useNavigate();

  // Effect to listen for theme changes from local storage and update the state
  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent double submit
    const trimmedEmail = email.trim();

    // Basic email format validation
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    if (!trimmedEmail || !password) {
      toast.error("Email and password are required.");
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);

    try {
      // NOTE: Update this URL to your actual backend API endpoint
      await axios.post("https://file-sharing-backend-rho.vercel.app/api/signup", {
        email: trimmedEmail,
        password,
      });
      toast.success("Signup successful! Redirecting to login...", {
      autoClose: 1500,
    });
    
    // Use a setTimeout to ensure the toast has time to close before navigating
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    } catch (err) {
      if (err.response) {
      if (err.response.status === 409) {
        toast.error("User already exists. Please login.");
      } else {
        toast.error(
          err.response.data?.message || "Signup failed. Please try again."
        );
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="bg-gray-950 dark:bg-neutral-50 min-h-screen flex flex-col font-sans text-gray-200 dark:text-neutral-900">
      
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 dark:bg-neutral-100 p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md transform transition-transform duration-300 hover:scale-105 border border-gray-800 dark:border-neutral-300">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white dark:text-neutral-900">
              Create an Account
            </h1>
            <p className="mt-2 text-gray-400 dark:text-neutral-600">
              Join us to start sharing files securely.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 rounded-xl bg-gray-800 dark:bg-neutral-200 border border-gray-700 dark:border-neutral-300 placeholder-gray-500 dark:placeholder-neutral-500 text-white dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 rounded-xl bg-gray-800 dark:bg-neutral-200 border border-gray-700 dark:border-neutral-300 placeholder-gray-500 dark:placeholder-neutral-500 text-white dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-colors duration-200 shadow-md
                  ${
                    isLoading
                      ? "bg-cyan-700 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-700 dark:border-neutral-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 dark:text-neutral-600">
              or
            </span>
            <div className="flex-grow border-t border-gray-700 dark:border-neutral-300"></div>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-400 dark:text-neutral-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-cyan-400 dark:text-cyan-600 hover:text-cyan-300 dark:hover:text-cyan-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
};
