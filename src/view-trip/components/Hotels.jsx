import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        🏨 Hotels Recommended
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
