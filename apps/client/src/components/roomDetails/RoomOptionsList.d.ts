import React from 'react';
import type { Room } from '../../types/hotel';
interface RoomOptionsListProps {
    rooms: Room[];
    onBookRoom: (roomKey: string) => void;
    showAllRooms: boolean;
    onToggleShowAll: () => void;
    showTotalStay?: boolean;
    nights?: number;
}
declare const RoomOptionsList: React.FC<RoomOptionsListProps>;
export default RoomOptionsList;
