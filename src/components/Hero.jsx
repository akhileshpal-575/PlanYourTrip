import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-6">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 animate-fadeIn">
          Explore the World, One Trip at a Time
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 animate-fadeIn delay-200">
          Your adventure starts here! Plan, customize, and embark on unforgettable journeys with ease.
        </p>

        <Link to="/create-trip">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
