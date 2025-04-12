import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white py-6 mt-16 rounded-t-2xl shadow-inner">
      <div className="max-w-screen-xl mx-auto px-4 text-center space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
          ✈️ Plan Smart. Travel Better.
        </h2>
        <p className="text-sm md:text-base font-medium italic">
          "Crafted to turn your travel dreams into unforgettable journeys."
        </p>
        <div className="text-xs opacity-80">
          &copy; {new Date().getFullYear()} AI Trip Planner. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
