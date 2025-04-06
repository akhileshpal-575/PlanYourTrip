import React, { useState, useEffect, useCallback } from "react";

const PlaceAutoComplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = 300; // Debounce delay

  // Function to fetch place suggestions
  const fetchSuggestions = useCallback(() => {
    if (!query) return;

    setLoading(true);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoading(false);
      });
  }, [query]);

  // Debounce API call
  useEffect(() => {
    const timer = setTimeout(fetchSuggestions, debounceTimeout);
    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  return (
    <form className="w-full">
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for a destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}

        {/* Display suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                onClick={() => {
                  setQuery(place.display_name);
                  onSelect(place.display_name);
                  setSuggestions([]); // Hide suggestions after selection
                }}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default PlaceAutoComplete;
