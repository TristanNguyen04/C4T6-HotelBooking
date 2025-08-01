import React from 'react';
interface RoomDetailsSectionProps {
    roomName: string;
    amenities: string[];
    hasFreeCancellation: boolean;
}
declare const RoomDetailsSection: React.FC<RoomDetailsSectionProps>;
export default RoomDetailsSection;
