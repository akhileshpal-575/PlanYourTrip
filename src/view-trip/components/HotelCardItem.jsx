import React from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
  console.log({ hotel });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.name + ' ' + hotel?.address)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="overflow-hidden rounded-t-xl">
          <img
            src="/whiteboard.png"
            className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
            alt={hotel?.name}
          />
        </div>
        <div className="px-4 py-3">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-white truncate">{hotel?.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{hotel?.address}</p>
          <p className="text-sm mt-1 text-yellow-600 dark:text-yellow-400 font-medium">
            ⭐ Rating: {hotel?.rating}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
