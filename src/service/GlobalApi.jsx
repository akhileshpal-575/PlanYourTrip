import axios from "axios";

// Fetches image using Wikipedia summary
export const getWikipediaImage = async (placeName) => {
  try {
    const res = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`
    );
    return res?.data?.thumbnail?.source || null;
  } catch (err) {
    console.error("Wikipedia fetch error:", err);
    return null;
  }
};

// More OpenStreetMap utilities can be added here later
