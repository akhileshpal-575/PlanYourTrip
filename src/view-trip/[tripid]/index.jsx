import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../service/Firebaseconfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Itinerary from "../components/Itinerary";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripid } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    if (tripid) {
      GetTripData();
    }
  }, [tripid]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast('No trip found!');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Info Section */}
      <section className="py-6 px-4 sm:px-8 lg:px-16">
        <InfoSection trip={trip} />
      </section>

      {/* Hotels */}
      <section className="py-6 px-4 sm:px-8 lg:px-16 bg-white shadow-md rounded-xl my-4">
        <Hotels trip={trip} />
      </section>

      {/* Itinerary */}
      <section className="py-6 px-4 sm:px-8 lg:px-16">
        <Itinerary trip={trip} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ViewTrip;
