import React from 'react';
import type { Room } from '../../types/hotel';

interface RoomOptionsListProps {
  rooms: Room[];
  onBookRoom: (roomKey: string) => void;
  showAllRooms: boolean;
  onToggleShowAll: () => void;
  showTotalStay?: boolean;
  nights?: number;
}

const RoomOptionsList: React.FC<RoomOptionsListProps> = ({
  rooms,
  onBookRoom,
  showAllRooms,
  onToggleShowAll,
  showTotalStay = false,
  nights = 1
}) => {
  const displayedRooms = showAllRooms ? rooms : rooms.slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getBreakfastInfo = (breakfastInfo: string) => {
    if (breakfastInfo.includes('breakfast_included')) {
      return { text: 'Breakfast included', color: 'text-green-600' };
    }
    return { text: 'Room only', color: 'text-gray-600' };
  };

  return (
    <div className="space-y-3">
      {displayedRooms.map((room) => {
        const breakfast = getBreakfastInfo(room.roomAdditionalInfo.breakfastInfo);
        const displayPrice = showTotalStay ? room.converted_price * nights : room.converted_price;
        const priceLabel = showTotalStay ? `total stay (${nights} night${nights !== 1 ? 's' : ''})` : 'per night';
        
        return (
          <div key={room.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-medium ${breakfast.color}`}>
                  {breakfast.text}
                </span>
                {room.free_cancellation && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Free cancellation
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Includes taxes and fees
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(displayPrice)}
              </div>
              <div className="text-sm text-gray-500">{priceLabel}</div>
            </div>
            <button
              data-cy={'click-to-book'}
              onClick={() => onBookRoom(room.key)}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book
            </button>
          </div>
        );
      })}
      
      {/* Show more/less button */}
      {rooms.length > 3 && (
        <button
          onClick={onToggleShowAll}
          className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {showAllRooms ? 'Show less' : `Show ${rooms.length - 3} more options`}
        </button>
      )}
    </div>
  );
};

export default RoomOptionsList; 