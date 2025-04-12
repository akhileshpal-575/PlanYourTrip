import React from 'react';
import PlaceCardItems from './PlaceCardItems';

function Itinerary({ trip }) {
  const itinerary = trip?.tripData?.dailyItinerary || [];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-wide text-center">
        🗺️ Explore the Journey
      </h2>

      {itinerary.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itinerary.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all"
            >
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                  📅 {item?.day}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🕒 Best Time: <span className="font-medium">{item?.bestTime || 'N/A'}</span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {item?.plan?.map((place, idx) => (
                  <PlaceCardItems key={idx} place={place} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          No itinerary data available.
        </p>
      )}
    </div>
  );
}

export default Itinerary;
