import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'

function PlaceCardItems({ place }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border rounded-2xl p-4 mt-3 flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white dark:bg-gray-900 shadow hover:shadow-md transition-all duration-300">

        <img
          src="/whiteboard.png"
          alt={place?.placeName}
          className="w-full sm:w-[250px] h-[200px] object-cover rounded-xl border"
        />

        <div className="flex flex-col justify-between w-full">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {place?.placeName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {place?.placeDetails}
            </p>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              🕓 Time to Travel: {place?.timeTravel || 'N/A'}
            </p>
          </div>
          <button
            className="mt-4 w-fit flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
          >
            <FaMapMarkerAlt /> View on Map
          </button>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItems
