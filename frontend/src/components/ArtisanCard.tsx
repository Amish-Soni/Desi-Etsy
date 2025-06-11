import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Artisan } from '../types';

interface ArtisanCardProps {
  artisan: Artisan;
  renderStars: (rating: number) => React.ReactNode;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan, renderStars }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200 cursor-pointer">
      <div className="h-48 overflow-hidden">
        <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover object-top" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{artisan.name}</h3>
        <p className="text-indigo-600 font-medium text-sm mb-2">{artisan.specialty}</p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />
          {artisan.location}
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-sm space-x-px">{renderStars(artisan.rating)}</div>
          <span className="ml-2 text-sm text-gray-600">{artisan.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;