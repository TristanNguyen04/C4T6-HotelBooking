import React from 'react';
import type { RoomType } from '../../types/hotel';
interface RoomTypeCardProps {
    roomType: RoomType;
    onBookRoom: (roomKey: string) => void;
    showTotalStay?: boolean;
    nights?: number;
}
declare const RoomTypeCard: React.FC<RoomTypeCardProps>;
export default RoomTypeCard;
