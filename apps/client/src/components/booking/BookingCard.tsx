import React from 'react';
import { format } from 'date-fns';
import type { BookingHistory } from '../../types/hotel';

interface BookingCardProps {
  booking: BookingHistory;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const calculateNights = (checkin: string, checkout: string) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getBookingStatus = (checkin: string, checkout: string) => {
    const now = new Date();
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (now < checkinDate) {
      return { status: 'Upcoming', color: 'text-blue-600 bg-blue-100' };
    } else if (now >= checkinDate && now <= checkoutDate) {
      return { status: 'Current', color: 'text-green-600 bg-green-100' };
    } else {
      return { status: 'Completed', color: 'text-gray-600 bg-gray-100' };
    }
  };

  const { status, color } = getBookingStatus(booking.checkin, booking.checkout);
  const nights = calculateNights(booking.checkin, booking.checkout);
  const totalPrice = booking.baseRateInCurrency + booking.includedTaxesAndFeesInCurrency;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section - Hotel Details */}
          <div className="flex-1">
            <div className="flex items-start space-x-4">
              {/* Hotel Image */}
              <div className="flex-shrink-0">
                {booking.roomImage ? (
                  <img
                    src={booking.roomImage}
                    alt={booking.hotelName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">🏨</span>
                  </div>
                )}
              </div>

              {/* Hotel Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 truncate" data-cy={'booking-hotel-name'}>
                    {booking.hotelName}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
                    {status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">{booking.roomDescription}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Check-in:</span>
                    <br />
                    {formatDate(booking.checkin)}
                  </div>
                  <div>
                    <span className="font-medium">Check-out:</span>
                    <br />
                    {formatDate(booking.checkout)}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>
                    <br />
                    {nights} night{nights !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Primary Guest:</span> {booking.guestName}
                  {booking.guestNumber && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="font-medium">Phone:</span> {booking.guestNumber}
                    </>
                  )}
                </div>

                {booking.request && (
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Special Request:</span> {booking.request}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Price & Actions */}
          <div className="mt-4 lg:mt-0 lg:ml-6 lg:text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Total for {nights} night{nights !== 1 ? 's' : ''}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Booked on {formatDate(booking.createdAt)}
            </div>

            {/* Action Buttons */}
            {/* <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  // TODO: Implement view details functionality
                  alert('View details functionality coming soon!');
                }}
                className="w-full lg:w-auto px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                View Details
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;