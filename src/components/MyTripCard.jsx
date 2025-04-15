import React from 'react';
import InfoSection from '../view-trip/components/InfoSection';
import { Link } from 'react-router-dom';

function MyTripCard({ trip }) {
  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-all hover:shadow-md">
        <InfoSection trip={trip} />
      </div>
    </Link>
  );
}

export default MyTripCard;
