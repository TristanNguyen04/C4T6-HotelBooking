import React from 'react';
interface RoomPricingSummaryProps {
    lowestPrice: number;
    roomCount: number;
    showTotalStay?: boolean;
    nights?: number;
}
declare const RoomPricingSummary: React.FC<RoomPricingSummaryProps>;
export default RoomPricingSummary;
