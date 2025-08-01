import React from 'react';
import type { Hotel } from '../../types/hotel';
interface HotelDetailsHeaderProps {
    hotel: Hotel;
    onBookNow?: () => void;
}
declare const HotelDetailsHeader: React.FC<HotelDetailsHeaderProps>;
export default HotelDetailsHeader;
