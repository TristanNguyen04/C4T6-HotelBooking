import React, { useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { RoomImage, Room } from '../../types/hotel';
import { assets } from '../../assets/assets';
import { parseRoomJson } from '../../utils/room';

interface RoomImageModalProps {
  isOpen: boolean;
  images: RoomImage[];
  currentIndex: number;
  roomName: string;
  rooms: Room[];
  lowestPrice: number;
  roomCount: number;
  hasFreeCancellation: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  showTotalStay?: boolean;
  nights?: number;
}

const RoomImageModal: React.FC<RoomImageModalProps> = ({
  isOpen,
  images,
  currentIndex,
  roomName,
  rooms,
  lowestPrice,
  roomCount,
  hasFreeCancellation,
  onClose,
  onPrevious,
  onNext,
  showTotalStay = false,
  nights = 1
}) => {
  // Parse room data from the first room 
  const parsedRoomData = useMemo(() => {
    try {
      if (rooms && rooms.length > 0) {
        return parseRoomJson(rooms[0]);
      }
    } catch (error) {
      console.error('Error parsing room data:', error);
    }
    return {}; // Return empty object instead of null
  }, [rooms]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = assets.hotelNotFound;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onPrevious();
    } else if (e.key === 'ArrowRight') {
      onNext();
    }
  }, [isOpen, onClose, onPrevious, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  const roomDetails = parsedRoomData?.roomDetails;
  const additionalInfo = parsedRoomData?.additionalInfo;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-white/30 backdrop-blur-sm z-[1100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{roomName}</h2>
            {roomDetails?.area && (
              <p className="text-sm text-gray-600 mt-1">{roomDetails.area}</p>
            )}
          </div>
          {/* <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close gallery"
          >
            ×
          </button> */}
        </div>

        {/* Image Display */}
        <div className="relative bg-gray-100">
          <div className="h-80 flex items-center justify-center">
            <img
              src={images[currentIndex]?.url}
              alt={`${roomName} - View ${currentIndex + 1}`}
              className="max-w-full h-full object-contain"
              onError={handleImageError}
            />
          </div>
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Room Information Panel - Now scrollable */}
        <div className="p-6 border-t bg-gray-50 overflow-y-auto max-h-96">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Room Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Room Details</h3>
              
              {roomDetails?.roomType && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Room Configuration</h4>
                  <p className="text-sm text-gray-600">{roomDetails.roomType}</p>
                </div>
              )}

              {/* Categorized Amenities */}
              <div className="space-y-3">
                {roomDetails?.internet && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Internet
                    </h4>
                    <p className="text-sm text-gray-600">{roomDetails.internet}</p>
                  </div>
                )}

                {roomDetails?.entertainment && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21,3H3C1.9,3 1,3.9 1,5v14c0,1.1 0.9,2 2,2h18c1.1,0 2-0.9 2-2V5C23,3.9 22.1,3 21,3z M21,19H3V5h18V19z"/>
                      </svg>
                      Entertainment
                    </h4>
                    <p className="text-sm text-gray-600">{roomDetails.entertainment}</p>
                  </div>
                )}

                {roomDetails?.foodDrink && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.1,13.34L11,16.17L15.2,12L17.43,14.9L11,21.34L4.54,14.9L8.1,13.34Z"/>
                      </svg>
                      Food & Drink
                    </h4>
                    <p className="text-sm text-gray-600">{roomDetails.foodDrink}</p>
                  </div>
                )}

                {roomDetails?.bathroom && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9,2V8H7V10H9V11A4,4 0 0,0 13,15H15V16H17V15H19V13H17V12H15V8H17V6H15V2H9M11,4H13V6H11V4Z"/>
                      </svg>
                      Bathroom
                    </h4>
                    <p className="text-sm text-gray-600">{roomDetails.bathroom}</p>
                  </div>
                )}

                {roomDetails?.comfort && (
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19,7H11V14H3V15A2,2 0 0,0 5,17H19A2,2 0 0,0 21,15V9A2,2 0 0,0 19,7Z"/>
                      </svg>
                      Comfort
                    </h4>
                    <p className="text-sm text-gray-600">{roomDetails.comfort}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing & Additional Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Pricing & Information</h3>
              
              {/* Pricing */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-3">Pricing</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="font-bold text-lg text-gray-900">
                      {formatPrice(showTotalStay ? lowestPrice * nights : lowestPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {showTotalStay ? `total stay (${nights} night${nights !== 1 ? 's' : ''})` : 'per night'}
                    </span>
                    <span className="text-sm text-gray-900">
                      {roomCount} rate{roomCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {hasFreeCancellation && (
                    <div className="flex items-center gap-2 pt-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span className="text-sm text-green-600">Free cancellation available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Important Information */}
              {additionalInfo?.knowBeforeYouGo && additionalInfo.knowBeforeYouGo.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-3">Important Information</h4>
                  <ul className="space-y-2">
                    {additionalInfo.knowBeforeYouGo.slice(0, 3).map((info, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optional Fees */}
              {additionalInfo?.feesOptional && additionalInfo.feesOptional.items.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-3">Optional Fees</h4>
                  <ul className="space-y-2">
                    {additionalInfo.feesOptional.items.slice(0, 3).map((fee, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{fee}</span>
                      </li>
                    ))}
                  </ul>
                  {additionalInfo.feesOptional.note && (
                    <p className="text-xs text-gray-500 mt-2 italic">{additionalInfo.feesOptional.note}</p>
                  )}
                </div>
              )}

              {/* Policies */}
              {roomDetails?.smokingPolicy && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Smoking Policy</h4>
                  <p className="text-sm text-gray-600">{roomDetails.smokingPolicy}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {currentIndex + 1} of {images.length} photos
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Close Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal using portal to ensure it's at the root level
  return createPortal(modalContent, document.body);
};

export default RoomImageModal; 