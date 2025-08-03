import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Upload, Info, LogIn, UserPlus, LogOut, Sun, Moon, Folder, UserCircle, Key } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// A more robust helper function to safely decode a JWT token.
const decodeJwtToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT token:", e);
    return null;
  }
};

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State for storing the user's email
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const userMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = decodeJwtToken(token);
      
      if (decoded) {
        // Log the decoded payload to the console for debugging
        console.log("Decoded JWT Payload:", decoded);

        // Check for the email field. It might be named something else like 'emailId' or 'user_email'.
        // If it's not 'email', you'll need to update this line.
        if (decoded.email) {
          setUserEmail(decoded.email);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }

    // Set the theme on the root element
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    
    // Handle clicks outside the user menu to close it
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [theme, userMenuRef]);

  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate('/login');
    setUserMenuOpen(false); // Close the user menu on logout
  };
  
  const handleUploadClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("You are not logged in. Please log in to upload files.", {
        position: 'top-center',
        autoClose: 3000,
        theme: theme
      });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5 mr-2" /> },
    { name: 'About Us', path: '/About', icon: <Info className="w-5 h-5 mr-2" /> },
    { name: 'Upload', path: '/upload', icon: <Upload className="w-5 h-5 mr-2" />, onClick: handleUploadClick },
  ];

  const userLinks = [
    { name: 'My Files', path: '/my-files', icon: <Folder className="w-5 h-5 mr-2" /> },
  ];

  const authLinks = [
    { name: 'Login', path: '/login', icon: <LogIn className="w-5 h-5 mr-2" /> },
    { name: 'Sign Up', path: '/signup', icon: <UserPlus className="w-5 h-5 mr-2" /> },
  ];

  const renderNavLinks = (links) => (
    links.map((link) => (
      <Link
        key={link.name}
        to={link.path}
        onClick={link.onClick || (() => {})}
        className="relative text-gray-300 hover:text-white transition-all duration-300 group flex items-center p-2 rounded-md dark:text-neutral-700 dark:hover:text-neutral-950"
      >
        <span className="flex items-center">
          {link.icon}
          <span>{link.name}</span>
        </span>
        <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-1/2 transition-all duration-300 dark:bg-cyan-500"></span>
        <span className="absolute bottom-1 right-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-1/2 transition-all duration-300 dark:bg-cyan-500"></span>
      </Link>
    ))
  );

  const renderMobileLinks = (links) => (
    links.map((link) => (
      <Link
        key={link.name}
        to={link.path}
        onClick={(e) => {
          if (link.onClick) {
            link.onClick(e);
          }
          setMenuOpen(false);
        }}
        className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 dark:text-neutral-700 dark:hover:bg-neutral-200 dark:hover:text-neutral-950"
      >
        <div className="flex items-center">
          {link.icon}
          <span>{link.name}</span>
        </div>
      </Link>
    ))
  );

  return (
    <>
      <nav className="relative bg-gray-950 border-b border-gray-800 shadow-xl font-sans dark:bg-neutral-50 dark:border-neutral-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-3xl font-extrabold tracking-wider transition-colors duration-300 hover:text-cyan-400 dark:text-neutral-900 dark:hover:text-cyan-500">
                SkyBox
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex flex-grow justify-center items-center">
              <div className="flex space-x-8 lg:space-x-12">
                {renderNavLinks(navLinks)}
                {isLoggedIn && renderNavLinks(userLinks)}
              </div>
            </div>
            
            {/* Auth links, user profile, and theme toggle on the right */}
            <div className="hidden md:flex items-center space-x-6 relative" ref={userMenuRef}>
              {!isLoggedIn ? (
                renderNavLinks(authLinks)
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200 dark:text-neutral-500 dark:hover:text-neutral-900 dark:focus:ring-offset-neutral-50"
                    aria-label="User profile menu"
                  >
                    <UserCircle className="w-8 h-8" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md shadow-xl bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-100 dark:ring-neutral-200 z-50">
                      <div className="py-1 px-4">
                        {userEmail && (
                          <div className="px-4 py-2 border-b border-gray-700 dark:border-neutral-300">
                            <p className="text-sm font-semibold text-white dark:text-neutral-900">Signed in as:</p>
                            <p className="text-sm text-cyan-400 truncate dark:text-cyan-600">{userEmail}</p>
                          </div>
                        )}
                        <div className="py-2">
                          <Link
                            to="/changepassword"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors duration-200 dark:text-neutral-700 dark:hover:bg-neutral-200"
                          >
                            <Key className="w-4 h-4 mr-2" />
                            Change Password
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-md transition-colors duration-200 dark:text-red-600 dark:hover:bg-neutral-200"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Desktop Theme Toggle */}
              <button
                onClick={handleThemeSwitch}
                className="p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200 dark:text-neutral-500 dark:hover:text-neutral-900 dark:focus:ring-offset-neutral-50"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="-mr-2 flex md:hidden items-center">
              <button
                onClick={handleThemeSwitch}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200 dark:text-neutral-500 dark:hover:text-neutral-950 dark:hover:bg-neutral-200 dark:focus:ring-offset-neutral-50 mr-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200 dark:text-neutral-500 dark:hover:text-neutral-950 dark:hover:bg-neutral-200 dark:focus:ring-offset-neutral-50"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div className={`md:hidden fixed inset-y-0 right-0 w-64 bg-gray-950 z-50 shadow-lg transform transition-transform duration-300 ease-in-out dark:bg-neutral-50 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200 dark:text-neutral-500 dark:hover:text-neutral-950"
            >
              <span className="sr-only">Close menu</span>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-2 flex flex-col">
            {renderMobileLinks(navLinks)}
            {isLoggedIn && renderMobileLinks(userLinks)}
            {!isLoggedIn ? (
              renderMobileLinks(authLinks)
            ) : (
              <>
                {userEmail && (
                  <div className="px-3 py-2 border-b border-gray-700 dark:border-neutral-300">
                    <p className="text-sm font-semibold text-white dark:text-neutral-900">Signed in as:</p>
                    <p className="text-sm text-cyan-400 truncate dark:text-cyan-600">{userEmail}</p>
                  </div>
                )}
                <Link
                  to="/changepassword"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 dark:text-neutral-700 dark:hover:bg-neutral-200 dark:hover:text-neutral-950"
                >
                  <div className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    <span>Change Password</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-left w-full transition-colors duration-200 dark:text-neutral-700 dark:hover:bg-neutral-200 dark:hover:text-neutral-950"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-2" />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
        {/* Background overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        ></div>
      </nav>
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
    </>
  );
}
