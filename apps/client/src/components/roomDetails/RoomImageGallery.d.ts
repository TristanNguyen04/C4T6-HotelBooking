import React from 'react';
import type { RoomImage } from '../../types/hotel';
interface RoomImageGalleryProps {
    images: RoomImage[];
    roomName: string;
    selectedImage: number;
    onImageSelect: (index: number) => void;
    onOpenModal: (index: number) => void;
}
declare const RoomImageGallery: React.FC<RoomImageGalleryProps>;
export default RoomImageGallery;
