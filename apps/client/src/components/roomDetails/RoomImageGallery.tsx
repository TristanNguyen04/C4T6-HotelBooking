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

  // Use fallback image if no images available
  const hasImages = images && images.length > 0;
  const displayImage = hasImages ? images[selectedImage]?.url : assets.hotelNotFound;

  const handleModalOpen = () => {
    onOpenModal(hasImages ? selectedImage : 0);
  };

  return (
    <div className="lg:w-1/3">
      <div className="relative h-48 lg:h-full">
        <img
          src={displayImage}
          alt={hasImages ? roomName : 'Room image not available'}
          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleModalOpen}
          onError={handleImageError}
        />
        
        {/* Show image indicators and view all button only if we have actual images */}
        {hasImages && images.length > 1 && (
          <>
            <div className="absolute bottom-3 left-3 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal
                    onImageSelect(index);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    selectedImage === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            {/* View All Photos Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the image click
                onOpenModal(0);
              }}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
            >
              {images.length} photos
            </button>
          </>
        )}
        
        {/* Always show "View Details" button overlay when no images or single image */}
        {(!hasImages || images.length === 1) && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the image click
              onOpenModal(0);
            }}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          >
            {hasImages ? 'View Details' : 'View Room Details'}
          </button>
        )}
        
        {/* Show "No images" overlay when using fallback - make it clickable */}
        {!hasImages && (
          <div 
            className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors"
            onClick={handleModalOpen}
          >
            <div className="bg-white/90 px-3 py-1 rounded-lg text-sm text-gray-700 pointer-events-none">
              Click to view room details
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomImageGallery; 