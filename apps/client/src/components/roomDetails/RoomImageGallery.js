import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { assets } from '../../assets/assets';
const RoomImageGallery = ({ images, roomName, selectedImage, onImageSelect, onOpenModal }) => {
    const handleImageError = (e) => {
        e.currentTarget.src = assets.hotelNotFound;
    };
    // Use fallback image if no images available
    const hasImages = images && images.length > 0;
    const displayImage = hasImages ? images[selectedImage]?.url : assets.hotelNotFound;
    const handleModalOpen = () => {
        onOpenModal(hasImages ? selectedImage : 0);
    };
    return (_jsx("div", { className: "lg:w-1/3", children: _jsxs("div", { className: "relative h-48 lg:h-full", children: [_jsx("img", { src: displayImage, alt: hasImages ? roomName : 'Room image not available', className: "w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity", onClick: handleModalOpen, onError: handleImageError }), hasImages && images.length > 1 && (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute bottom-3 left-3 flex space-x-2", children: images.map((_, index) => (_jsx("button", { onClick: (e) => {
                                    e.stopPropagation(); // Prevent triggering the modal
                                    onImageSelect(index);
                                }, className: `w-2 h-2 rounded-full ${selectedImage === index ? 'bg-white' : 'bg-white/50'}` }, index))) }), _jsxs("button", { onClick: (e) => {
                                e.stopPropagation(); // Prevent triggering the image click
                                onOpenModal(0);
                            }, className: "absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors", children: [images.length, " photos"] })] })), (!hasImages || images.length === 1) && (_jsx("button", { onClick: (e) => {
                        e.stopPropagation(); // Prevent triggering the image click
                        onOpenModal(0);
                    }, className: "absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors", children: hasImages ? 'View Details' : 'View Room Details' })), !hasImages && (_jsx("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors", onClick: handleModalOpen, children: _jsx("div", { className: "bg-white/90 px-3 py-1 rounded-lg text-sm text-gray-700 pointer-events-none", children: "Click to view room details" }) }))] }) }));
};
export default RoomImageGallery;
