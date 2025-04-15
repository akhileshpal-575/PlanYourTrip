import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";

function InfoSection({ trip }) {
  const [photoData, setPhotoData] = useState({
    url: "",
    photographer: "",
    error: null,
    isLoading: true,
    hasError: false // New flag for actual loading errors
  });

  useEffect(() => {
    if (trip?.userChoice?.location) {
      fetchLocationImage(trip.userChoice.location);
    }
  }, [trip]);

  const fetchLocationImage = async (location) => {
    setPhotoData(prev => ({ ...prev, isLoading: true, error: null, hasError: false }));
    
    try {
      // Try Unsplash first
      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: `${location} cityscape OR landscape`,
            page: 1,
            per_page: 1,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            "Accept-Version": "v1"
          }
        }
      );
      
      if (unsplashResponse.data?.results?.length > 0) {
        const image = unsplashResponse.data.results[0];
        return setPhotoData({
          url: image.urls.regular,
          photographer: image.user.name,
          error: null,
          isLoading: false,
          hasError: false
        });
      }

      // Fallback to Wikipedia
      const wikiResponse = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(location)}`,
        {
          headers: {
            "Api-User-Agent": "TripPlanner/1.0 (contact@example.com)"
          }
        }
      );

      if (wikiResponse?.data?.thumbnail?.source) {
        return setPhotoData({
          url: wikiResponse.data.thumbnail.source,
          photographer: "",
          error: null,
          isLoading: false,
          hasError: false
        });
      }

      throw new Error("No image sources available");

    } catch (err) {
      console.error("Image fetch error:", err);
      setPhotoData({
        url: "",
        photographer: "",
        error: "Failed to load location image",
        isLoading: false,
        hasError: true // Set the error flag
      });
    }
  };

  const handleImageError = () => {
    setPhotoData(prev => ({
      ...prev,
      url: "",
      error: "Image failed to load",
      isLoading: false,
      hasError: true // Set the error flag
    }));
  };

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-[340px] w-full bg-gray-100 dark:bg-gray-800">
        {photoData.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading image...</div>
          </div>
        )}

        {/* Only show error if hasError is true */}
        {photoData.hasError && (
          <div className="absolute top-4 right-6 bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm flex items-center gap-2">
            <FiAlertTriangle className="text-lg" />
            {photoData.error}
          </div>
        )}

        {photoData.url && (
          <>
            <img
              src={photoData.url}
              onError={handleImageError}
              alt={`${trip?.userChoice?.location || "Travel destination"} landscape`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </>
        )}
        {/* Location Title */}
        <h2 className="absolute bottom-4 left-6 text-white text-4xl font-extrabold drop-shadow-xl">
          {trip?.userChoice?.location}
        </h2>

        {/* Photographer Credit */}
        {/* {photoData.photographer && (
          <div className="absolute bottom-4 right-6 text-white text-sm drop-shadow-xl">
            Photo by {photoData.photographer}
          </div>
        )} */}
      </div>

      {/* Trip Details */}
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
                 </div>
      </div>
    </div>
  );
}

export default InfoSection;