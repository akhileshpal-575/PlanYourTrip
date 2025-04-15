import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/Firebaseconfig";
import MyTripCard from './MyTripCard';

function Mytrip() {
  const navigate = useNavigate();
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    const user = JSON.parse(storedUser);
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    setUserTrip(trips);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      <h2 className="text-3xl font-bold mb-10 ml-36 ">✈️My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-8 ml-36 w-full max-w-6xl">
        {userTrip.map((trip, index) => (
          <MyTripCard key={index} trip={trip} />
        ))
        }
      </div>
    </div>
  );
}

export default Mytrip;
