import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceCardItems({ place }) {
  const [imageUrl, setImageUrl] = useState("/demo.png");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!place?.placeName) return;

      setIsLoading(true);
      try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
          params: {
            query: place.placeName,
            page: 1,
            per_page: 1,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
        });

        const result = response.data.results?.[0];
        if (result?.urls?.regular) {
          setImageUrl(result.urls.regular);
        }
      } catch (err) {
        console.error("Failed to fetch Unsplash image:", err);
        // keep default image
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [place?.placeName]);

  const handleImgError = () => {
    setImageUrl("/demo.png");
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border rounded-2xl p-4 mt-3 flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white dark:bg-gray-900 shadow hover:shadow-md transition-all duration-300">

        <div className="w-full sm:w-[250px] h-[200px] bg-gray-200 rounded-xl overflow-hidden border">
          {!isLoading && (
            <img
              src={imageUrl}
              onError={handleImgError}
              alt={place?.placeName}
              className="w-full h-full object-cover"
            />
          )}
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center text-gray-400 animate-pulse">
              Loading...
            </div>
          )}
        </div>

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
  );
}

export default PlaceCardItems;
