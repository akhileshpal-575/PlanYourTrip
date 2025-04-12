import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (trip?.userChoice?.location) {
      fetchLocationImage(trip.userChoice.location);
    }
  }, [trip]);

  const fetchLocationImage = async (location) => {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(location)}`
      );
      const imageUrl = response?.data?.thumbnail?.source;
      if (imageUrl) {
        setPhotoUrl(imageUrl);
      }
    } catch (err) {
      console.error("Error fetching image from Wikipedia:", err);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/800x340?text=No+Image+Available";
  };

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="relative h-[340px] w-full">
        <img
          src={photoUrl}
          onError={handleImageError}
          alt="Location"
          className="h-full w-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <h2 className="absolute bottom-4 left-6 text-white text-4xl font-extrabold drop-shadow-xl">
          {trip?.userChoice?.location}
        </h2>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium shadow-sm">
            📅 {trip?.userChoice?.tripDays} Days
          </span>
          <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium shadow-sm">
            💸 {trip?.userChoice?.selectedBudget} Budget
          </span>
          <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium shadow-sm">
            🥂 Traveler: {trip?.userChoice?.selectedTravelType}
          </span>
          <button
            className="ml-auto bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all shadow-md animate-pulse"
            title="Send"
          >
            <IoIosSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
