import React from 'react';
import type { RoomImage } from '../../types/hotel';
import { assets } from '../../assets/assets';

interface RoomImageGalleryProps {
  images: RoomImage[];
  roomName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
  onOpenModal: (index: number) => void;
}

const RoomImageGallery: React.FC<RoomImageGalleryProps> = ({
  images,
  roomName,
  selectedImage,
  onImageSelect,
  onOpenModal
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = assets.hotelNotFound;
  };

  return (
    <div className="lg:w-1/3">
      <div className="relative h-48 lg:h-full">
        {images.length > 0 && (
          <>
            <img
              src={images[selectedImage]?.url}
              alt={roomName}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onOpenModal(selectedImage)}
              onError={handleImageError}
            />
            {images.length > 1 && (
              <div className="absolute bottom-3 left-3 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onImageSelect(index)}
                    className={`w-2 h-2 rounded-full ${
                      selectedImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            {/* View All Photos Button */}
            {images.length > 1 && (
              <button
                onClick={() => onOpenModal(0)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              >
                {images.length} photos
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RoomImageGallery; 