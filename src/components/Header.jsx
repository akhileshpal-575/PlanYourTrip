// Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="flex items-center space-x-3 hover:">
        <img src="/logo.svg" alt="TripCraft Logo" className="h-10 w-auto" />
        <h1 className="text-2xl font-bold text-white font-sans">
          <span className="text-blue-200">Trip</span>
          <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Craft</span>
        </h1>
      </div>
      
      <div>
        <button className="bg-white text-blue-600 font-medium px-5 py-2 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-blue-200 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Sign in
        </button>
      </div>
    </header>
  );
}
export default Header