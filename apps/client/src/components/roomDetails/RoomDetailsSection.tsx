import React, { useState } from 'react';

interface RoomDetailsSectionProps {
  roomName: string;
  amenities: string[];
  hasFreeCancellation: boolean;
}

const RoomDetailsSection: React.FC<RoomDetailsSectionProps> = ({
  roomName,
  amenities,
  hasFreeCancellation
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {roomName}
      </h3>
      
      {/* Room features */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-sm text-gray-600">
            {amenities.slice(0, 3).join(', ')}
            {amenities.length > 3 && (
              <span className="relative">
                <span
                  className="text-blue-600 cursor-help underline decoration-dotted"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {` + ${amenities.length - 3} more`}
                </span>
                {showTooltip && (
                  <div className="absolute z-10 w-64 p-3 mt-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg left-0 top-full">
                    <div className="font-medium mb-2">Additional Amenities:</div>
                    <div className="text-gray-200">
                      {amenities.slice(3).join(' • ')}
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                )}
              </span>
            )}
          </span>
        </div>

        {hasFreeCancellation && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="text-sm text-green-600">Free cancellation available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsSection; 