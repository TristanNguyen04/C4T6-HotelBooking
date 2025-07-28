import React from 'react';

interface RoomPricingSummaryProps {
  lowestPrice: number;
  roomCount: number;
  showTotalStay?: boolean;
  nights?: number;
}

const RoomPricingSummary: React.FC<RoomPricingSummaryProps> = ({
  lowestPrice,
  roomCount,
  showTotalStay = false,
  nights = 1
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayPrice = showTotalStay ? lowestPrice * nights : lowestPrice;
  const priceLabel = showTotalStay ? `total stay (${nights} night${nights !== 1 ? 's' : ''})` : 'per night';

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">Starting from</span>
          <div className="text-xl font-bold text-gray-900">
            {formatPrice(displayPrice)}
          </div>
          <div className="text-sm text-gray-500">{priceLabel}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            {roomCount} option{roomCount !== 1 ? 's' : ''} available
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPricingSummary; 