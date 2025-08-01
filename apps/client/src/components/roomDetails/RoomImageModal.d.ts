import React from 'react';
import type { RoomImage, Room } from '../../types/hotel';
interface RoomImageModalProps {
    isOpen: boolean;
    images: RoomImage[];
    currentIndex: number;
    roomName: string;
    rooms: Room[];
    lowestPrice: number;
    roomCount: number;
    hasFreeCancellation: boolean;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    showTotalStay?: boolean;
    nights?: number;
}
declare const RoomImageModal: React.FC<RoomImageModalProps>;
export default RoomImageModal;
