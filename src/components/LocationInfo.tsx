import React from 'react';
import { MapPin, Skull } from 'lucide-react';
import { useGameStore } from '../store';

export const LocationInfo = () => {
  const location = useGameStore((state) => state.currentLocation);

  return (
    <div className="border border-gray-800 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={16} className="text-gray-500" />
        <h2 className="text-lg font-mono">{location.name}</h2>
      </div>
      <p className="text-sm text-gray-400 mb-2">{location.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>{location.environment}</span>
        <span className="flex items-center gap-1">
          <Skull size={12} className={location.danger === 'dangerous' ? 'text-red-500' : 'text-gray-500'} />
          Status: {location.danger}
        </span>
      </div>
    </div>
  );
};