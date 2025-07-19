import React, { useState } from 'react';
import type { Hotel, Room, RoomType, SearchContext } from '../../types/hotel';
import RoomTypeCard from '../roomDetails/RoomTypeCard';
import { calculateNights } from '../../utils/date';

interface HotelRoomOptionsProps {
  hotel: Hotel;
  onBookRoom: (roomKey: string) => void;
  searchContext?: SearchContext | null;
}

const HotelRoomOptions: React.FC<HotelRoomOptionsProps> = ({ hotel, onBookRoom, searchContext }) => {
  const [showTotalStay, setShowTotalStay] = useState(false);

  // Calculate number of nights
  const nights = searchContext ? calculateNights(searchContext.checkin, searchContext.checkout) : 1;

  if (!hotel.rooms || hotel.rooms.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Available</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Unfortunately, there are no available rooms at this hotel for your selected dates. 
            Please try different dates or check back later.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Group rooms by roomNormalizedDescription
  const groupedRooms = hotel.rooms.reduce((groups: { [key: string]: Room[] }, room) => {
    const key = room.roomNormalizedDescription;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(room);
    return groups;
  }, {});

  // Convert to RoomType objects
  const roomTypes: RoomType[] = Object.entries(groupedRooms).map(([normalizedDescription, rooms]) => {
    const lowestPrice = Math.min(...rooms.map(room => room.converted_price));
    const hasFreeCancellation = rooms.some(room => room.free_cancellation);
    const images = rooms[0]?.images || [];
    const amenities = rooms[0]?.amenities || [];
    const hasBreakfast = rooms.some(room => 
      room.roomAdditionalInfo.breakfastInfo.includes('breakfast_included')
    );

    return {
      roomNormalizedDescription: normalizedDescription,
      rooms,
      lowestPrice,
      hasFreeCancellation,
      images,
      amenities,
      hasBreakfast
    };
  });

  // Sort by lowest price
  roomTypes.sort((a, b) => a.lowestPrice - b.lowestPrice);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 underline underline-offset-1">
            {roomTypes.length} room type{roomTypes.length !== 1 ? 's' : ''} available
          </div>
          
          {/* Price Toggle */}
          {searchContext && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show prices:</span>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setShowTotalStay(false)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    !showTotalStay 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Per Night
                </button>
                <button
                  onClick={() => setShowTotalStay(true)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    showTotalStay 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Total Stay ({nights} night{nights !== 1 ? 's' : ''})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {roomTypes.map((roomType) => (
          <RoomTypeCard
            key={roomType.roomNormalizedDescription}
            roomType={roomType}
            onBookRoom={onBookRoom}
            showTotalStay={showTotalStay}
            nights={nights}
          />
        ))}
      </div>

      {/* Additional info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Booking Information</h4>
            <p className="text-sm text-gray-700">
              All prices include taxes and fees. Room availability and prices are subject to change. 
              Free cancellation policies may vary by room type and rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomOptions; 