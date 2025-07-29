import React from 'react';
import type { BookingDetails } from '../../types/hotel';
import { formatPrice } from '../../utils/pricing';
import { assets } from '../../assets/assets';

interface BookingSummaryProps {
  bookingDetails: BookingDetails;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ bookingDetails }) => {
  const { priceBreakdown, hotelName, roomDescription, checkin, checkout, adults, children, childrenAges, roomImage } = bookingDetails;
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = assets.hotelNotFound;
  };

  // Helper function to format guest information
  const formatGuestInfo = () => {
    const guestParts = [];
    
    if (adults > 0) {
      guestParts.push(`${adults} adult${adults > 1 ? 's' : ''}`);
    }
    
    if (children > 0) {
      if (childrenAges && childrenAges.length > 0) {
        const ageText = childrenAges.length === 1 
          ? `age ${childrenAges[0]}`
          : `ages ${childrenAges.join(', ')}`;
        guestParts.push(`${children} child${children > 1 ? 'ren' : ''} (${ageText})`);
      } else {
        guestParts.push(`${children} child${children > 1 ? 'ren' : ''}`);
      }
    }
    
    return guestParts.join(', ') || 'No guests specified';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>
      
      {/* Hotel and Room Info */}
      <div className="flex gap-4 mb-6">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={roomImage || assets.hotelNotFound}
            alt={roomDescription}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{hotelName}</h3>
          <p className="text-gray-600 mb-2">{roomDescription}</p>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Check-in:</span> {new Date(checkin).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</p>
            <p><span className="font-medium">Check-out:</span> {new Date(checkout).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</p>
            <p><span className="font-medium">Guests:</span> {formatGuestInfo()}</p>
            <p><span className="font-medium">Stay Duration:</span> {priceBreakdown.nights} night{priceBreakdown.nights > 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>
      
      <hr className="my-6" />
      
      {/* Price Breakdown */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base rate ({priceBreakdown.nights} nights)</span>
            <span className="font-medium">{formatPrice(priceBreakdown.base_rate_in_currency, priceBreakdown.currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes & fees (included)</span>
            <span className="font-medium">{formatPrice(priceBreakdown.included_taxes_and_fees_total_in_currency, priceBreakdown.currency)}</span>
          </div>
          
          {priceBreakdown.excluded_taxes_and_fees_total_in_currency > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Additional fees (pay at hotel)</span>
              <span className="font-medium text-orange-600">
                {formatPrice(priceBreakdown.excluded_taxes_and_fees_total_in_currency, priceBreakdown.currency)}
              </span>
            </div>
          )}
          
          <hr className="my-3" />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(priceBreakdown.total_price, priceBreakdown.currency)}</span>
          </div>
          
          {priceBreakdown.excluded_taxes_and_fees_total_in_currency > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              *Additional fees are paid directly to the hotel during your stay
            </p>
          )}
        </div>
      </div>
      
      {/* Important Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Booking Information</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Confirmation will be sent to your email</li>
              <li>• All prices include applicable taxes and fees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary; 