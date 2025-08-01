import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import RoomImageGallery from './RoomImageGallery';
import RoomDetailsSection from './RoomDetailsSection';
import RoomOptionsList from './RoomOptionsList';
import RoomImageModal from './RoomImageModal';
import RoomPricingSummary from './RoomPricingSummary';
const RoomTypeCard = ({ roomType, onBookRoom, showTotalStay = false, nights = 1 }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllRooms, setShowAllRooms] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    // Modal functions
    const openModal = (index = 0) => {
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible", children: _jsxs("div", { className: "flex flex-col lg:flex-row", children: [_jsx(RoomImageGallery, { images: roomType.images, roomName: roomType.roomNormalizedDescription, selectedImage: selectedImage, onImageSelect: setSelectedImage, onOpenModal: openModal }), _jsxs("div", { className: "lg:w-2/3 p-6 flex flex-col", children: [_jsxs("div", { className: "flex-1", children: [_jsx(RoomDetailsSection, { roomName: roomType.roomNormalizedDescription, amenities: roomType.amenities, hasFreeCancellation: roomType.hasFreeCancellation }), _jsx(RoomOptionsList, { rooms: roomType.rooms, onBookRoom: onBookRoom, showAllRooms: showAllRooms, onToggleShowAll: () => setShowAllRooms(!showAllRooms), showTotalStay: showTotalStay, nights: nights })] }), _jsx(RoomPricingSummary, { lowestPrice: roomType.lowestPrice, roomCount: roomType.rooms.length, showTotalStay: showTotalStay, nights: nights })] })] }) }), _jsx(RoomImageModal, { isOpen: isModalOpen, images: roomType.images, currentIndex: modalImageIndex, roomName: roomType.roomNormalizedDescription, rooms: roomType.rooms, lowestPrice: roomType.lowestPrice, roomCount: roomType.rooms.length, hasFreeCancellation: roomType.hasFreeCancellation, onClose: closeModal, onPrevious: goToPrevious, onNext: goToNext, showTotalStay: showTotalStay, nights: nights })] }));
};
export default RoomTypeCard;
