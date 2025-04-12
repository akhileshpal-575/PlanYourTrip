import React, { useState, useEffect, useRef } from "react";
import PlaceAutoComplete from "../components/PlaceAutoComplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../components/Options";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/Firebaseconfig";
import { toast } from "sonner";
import { chatSession } from "../service/AiModel";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreatTrip() {
  const [tripData, setTripData] = useState({
    location: "",
    tripDays: "",
    selectedBudget: null,
    selectedTravelType: null,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [place, setPlace] = useState("");
  const shouldGenerate = useRef(false);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const handleInputChange = (key, value) => {
    setTripData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSelect = (value) => {
    setPlace(value);
    handleInputChange("location", value);
  };

  const generatePrompt = (tripData) => {
    return AI_PROMPT.replace("{location}", tripData?.location)
      .replace("{totalDays}", tripData?.tripDays)
      .replace("{traveler}", tripData?.selectedTravelType)
      .replace("{budget}", tripData?.selectedBudget);
  };

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      shouldGenerate.current = true;
      setOpenDialog(true);
      return;
    }
    if (
      !tripData.location ||
      !tripData.tripDays ||
      !tripData.selectedBudget ||
      !tripData.selectedTravelType
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = generatePrompt(tripData);
    console.log(FINAL_PROMPT);
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("--", result?.response?.text());
      await saveTrip(result?.response?.text()); // ✅ Fix: wait until trip is saved
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // ✅ Now this runs correctly
    }
  };

  const saveTrip = async (Data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userChoice: tripData,
      tripData: JSON.parse(Data),
      userEmail: user?.email,
      id: docId,
    });
   // Navigate to trip view
  navigate(`/view-trip/${docId}`);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  useEffect(() => {
    if (user && shouldGenerate.current) {
      handleGenerateTrip();
      shouldGenerate.current = false;
    }
  }, [user]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-white pt-24 pb-10">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Plan Your Perfect Trip 🏕️🌴
        </h1>

        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Where do you want to go?</h2>
            <PlaceAutoComplete
              onSelect={handleSelect}
              selectProps={{
                placeholder: "Search for a destination...",
                onChange: handleSelect,
              }}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              How many days will your trip be?
            </h2>
            <input
              type="number"
              value={tripData.tripDays}
              onChange={(e) => handleInputChange("tripDays", e.target.value)}
              min="1"
              placeholder="Ex: 4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Select Your Budget</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition text-center cursor-pointer ${
                    tripData.selectedBudget === item.title
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() =>
                    handleInputChange("selectedBudget", item.title)
                  }
                >
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-lg font-medium mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">
              What type of traveler are you?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SelectTravelsList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition text-center cursor-pointer ${
                    tripData.selectedTravelType === item.type
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() =>
                    handleInputChange("selectedTravelType", item.type)
                  }
                >
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-lg font-medium mt-2">{item.type}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleGenerateTrip}
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            {loading ? <AiOutlineLoading3Quarters className = "h-7 w-7 animate-spin"/> : "Generate Trip"}
              
          </button>
        </div>
      </div>

      {openDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setOpenDialog(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Sign in to Continue
            </h2>
            <p className="text-gray-600 mt-2">
              You need to log in to generate a trip plan.
            </p>
            <button
              onClick={login}
              className="mt-4 w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-2xl mr-2" /> Sign in with Google
            </button>
            <button
              onClick={() => setOpenDialog(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatTrip;
