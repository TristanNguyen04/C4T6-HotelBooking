import React from 'react';
import type { BookingDetails } from '../../types/hotel';
import { formatPrice } from '../../utils/pricing';

interface BookingConfirmationProps {
  bookingDetails: BookingDetails;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingDetails,
  onConfirm,
  onCancel,
  loading = false
}) => {
  const { priceBreakdown, hotelName, roomDescription, checkin, checkout, guests } = bookingDetails;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Your Booking</h2>
          
          {/* Hotel and Room Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900">{hotelName}</h3>
            <p className="text-gray-600">{roomDescription}</p>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Check-in: {new Date(checkin).toLocaleDateString()}</p>
              <p>Check-out: {new Date(checkout).toLocaleDateString()}</p>
              <p>Guests: {guests}</p>
              <p>Nights: {priceBreakdown.nights}</p>
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="border rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base rate ({priceBreakdown.nights} nights)</span>
                <span>{formatPrice(priceBreakdown.base_rate_in_currency, priceBreakdown.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & fees (included)</span>
                <span>{formatPrice(priceBreakdown.included_taxes_and_fees_total_in_currency, priceBreakdown.currency)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(priceBreakdown.base_rate_in_currency + priceBreakdown.included_taxes_and_fees_total_in_currency, priceBreakdown.currency)}</span>
              </div>
              {priceBreakdown.excluded_taxes_and_fees_total_in_currency > 0 && (
                <>
                  <div className="flex justify-between text-orange-600">
                    <span>Additional fees (pay at hotel)</span>
                    <span>{formatPrice(priceBreakdown.excluded_taxes_and_fees_total_in_currency, priceBreakdown.currency)}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    *Additional fees are paid directly to the hotel
                  </div>
                </>
              )}
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(priceBreakdown.total_price, priceBreakdown.currency)}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 