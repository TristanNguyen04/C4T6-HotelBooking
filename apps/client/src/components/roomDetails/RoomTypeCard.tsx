import React, { useState } from 'react';
import type { RoomType } from '../../types/hotel';
import RoomImageGallery from './RoomImageGallery';
import RoomDetailsSection from './RoomDetailsSection';
import RoomOptionsList from './RoomOptionsList';
import RoomImageModal from './RoomImageModal';
import RoomPricingSummary from './RoomPricingSummary';

interface RoomTypeCardProps {
  roomType: RoomType;
  onBookRoom: (roomKey: string) => void;
  showTotalStay?: boolean;
  nights?: number;
}

const RoomTypeCard: React.FC<RoomTypeCardProps> = ({ 
  roomType, 
  onBookRoom, 
  showTotalStay = false,
  nights = 1 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Modal functions
  const openModal = (index: number = 0) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setModalImageIndex(modalImageIndex > 0 ? modalImageIndex - 1 : roomType.images.length - 1);
  };

  const goToNext = () => {
    setModalImageIndex(modalImageIndex < roomType.images.length - 1 ? modalImageIndex + 1 : 0);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
        <div className="flex flex-col lg:flex-row">
          {/* Room Images */}
          <RoomImageGallery
            images={roomType.images}
            roomName={roomType.roomNormalizedDescription}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            onOpenModal={openModal}
          />

          {/* Room Details */}
          <div className="lg:w-2/3 p-6 flex flex-col">
            <div className="flex-1">
              <RoomDetailsSection
                roomName={roomType.roomNormalizedDescription}
                amenities={roomType.amenities}
                hasFreeCancellation={roomType.hasFreeCancellation}
              />

              <RoomOptionsList
                rooms={roomType.rooms}
                onBookRoom={onBookRoom}
                showAllRooms={showAllRooms}
                onToggleShowAll={() => setShowAllRooms(!showAllRooms)}
                showTotalStay={showTotalStay}
                nights={nights}
              />
            </div>

            <RoomPricingSummary
              lowestPrice={roomType.lowestPrice}
              roomCount={roomType.rooms.length}
              showTotalStay={showTotalStay}
              nights={nights}
            />
          </div>
        </div>
      </div>

      {/* Room Images Modal */}
      <RoomImageModal
        isOpen={isModalOpen}
        images={roomType.images}
        currentIndex={modalImageIndex}
        roomName={roomType.roomNormalizedDescription}
        rooms={roomType.rooms}
        lowestPrice={roomType.lowestPrice}
        roomCount={roomType.rooms.length}
        hasFreeCancellation={roomType.hasFreeCancellation}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
        showTotalStay={showTotalStay}
        nights={nights}
      />
    </>
  );
};

export default RoomTypeCard; 