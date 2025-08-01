import React from 'react';
import type { Hotel, SearchContext } from '../../types/hotel';
interface HotelRoomOptionsProps {
    hotel: Hotel;
    onBookRoom: (roomKey: string) => void;
    searchContext?: SearchContext | null;
}
declare const HotelRoomOptions: React.FC<HotelRoomOptionsProps>;
export default HotelRoomOptions;
