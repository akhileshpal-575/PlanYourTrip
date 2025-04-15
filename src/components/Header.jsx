import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // added

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); // added

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setOpenDialog(false); // close modal on successful login
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.svg" alt="TripCraft Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-white font-sans">
            <span className="text-blue-200">Trip</span>
            <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Craft
            </span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
            <button
                onClick={() => navigate("/create-trip")}
                className="text-white bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition"
              >
                Create Trip
              </button>
              <button
                onClick={() => navigate("/mytrips")}
                className="text-white bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition"
              >
                My Trips
              </button>

              {/* 👤 Profile Image */}
              {user.picture && (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-white"
                />
              )}

              <button
                onClick={logout}
                className="bg-white text-red-500 font-medium px-5 py-2 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-red-300"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpenDialog(true)}
              className="bg-white text-blue-600 font-medium px-5 py-2 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-blue-200 flex items-center"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign in
            </button>
          )}
        </div>
      </header>

      {/* Dialog Box */}
      {openDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
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
              You need to log in to access features like trip planning.
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
    </>
  );
}

export default Header;
