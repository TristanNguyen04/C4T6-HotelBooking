import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { assets } from '../../assets/assets';
import { parseRoomJson } from '../../utils/room';
const RoomImageModal = ({ isOpen, images, currentIndex, roomName, rooms, lowestPrice, roomCount, hasFreeCancellation, onClose, onPrevious, onNext, showTotalStay = false, nights = 1 }) => {
    // Parse room data from the first room 
    const parsedRoomData = useMemo(() => {
        if (rooms.length > 0) {
            return parseRoomJson(rooms[0]);
        }
        return {
            roomDetails: {},
            additionalInfo: {
                checkInInstructions: [],
                knowBeforeYouGo: [],
                feesOptional: { items: [] }
            }
        };
    }, [rooms]);
    const handleImageError = (e) => {
        e.currentTarget.src = assets.hotelNotFound;
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };
    // Handle backdrop click to close modal
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);
    // Handle keyboard navigation - only for images when available
    const handleKeyDown = useCallback((e) => {
        if (!isOpen)
            return;
        if (e.key === 'Escape') {
            onClose();
        }
        else if (e.key === 'ArrowLeft' && images && images.length > 1) {
            onPrevious();
        }
        else if (e.key === 'ArrowRight' && images && images.length > 1) {
            onNext();
        }
    }, [isOpen, onClose, onPrevious, onNext, images]);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [handleKeyDown, isOpen]);
    if (!isOpen)
        return null;
    const roomDetails = parsedRoomData?.roomDetails;
    const additionalInfo = parsedRoomData?.additionalInfo;
    // Check if we have actual images
    const hasImages = images && images.length > 0;
    const displayImage = hasImages ? images[currentIndex]?.url : assets.hotelNotFound;
    const modalContent = (_jsx("div", { className: "fixed inset-0 bg-white/30 backdrop-blur-sm z-[1100] flex items-center justify-center p-4", onClick: handleBackdropClick, children: _jsxs("div", { className: "relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: roomName }), roomDetails?.area && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: roomDetails.area }))] }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors", "aria-label": "Close", children: "\u00D7" })] }), _jsxs("div", { className: "relative bg-gray-100", children: [_jsxs("div", { className: "h-80 flex items-center justify-center", children: [_jsx("img", { src: displayImage, alt: hasImages ? `${roomName} - View ${currentIndex + 1}` : 'Room image not available', className: "max-w-full h-full object-contain", onError: handleImageError }), !hasImages && (_jsx("div", { className: "absolute inset-0 bg-black/10 flex items-center justify-center", children: _jsx("div", { className: "bg-white/90 px-6 py-3 rounded-lg text-gray-700", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-5 h-5 text-gray-400", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M21,19V5c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z M8.5,13.5l2.5,3.01L14.5,12l4.5,6H5L8.5,13.5z" }) }), _jsx("span", { children: "No photos available - showing room details below" })] }) }) }))] }), hasImages && images.length > 1 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: onPrevious, className: "absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all", "aria-label": "Previous image", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsx("button", { onClick: onNext, className: "absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all", "aria-label": "Next image", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })] }))] }), _jsx("div", { className: "p-6 border-t bg-gray-50 overflow-y-auto max-h-96", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-lg", children: "Room Details" }), roomDetails?.roomType ? (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Room Configuration" }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.roomType })] })) : (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Room Configuration" }), _jsx("p", { className: "text-sm text-gray-600", children: "Room details not available" })] })), _jsxs("div", { className: "space-y-3", children: [roomDetails?.internet && (_jsxs("div", { className: "bg-white rounded-lg p-3 shadow-sm", children: [_jsxs("h4", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }), "Internet"] }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.internet })] })), roomDetails?.entertainment && (_jsxs("div", { className: "bg-white rounded-lg p-3 shadow-sm", children: [_jsxs("h4", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-purple-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M21,3H3C1.9,3 1,3.9 1,5v14c0,1.1 0.9,2 2,2h18c1.1,0 2-0.9 2-2V5C23,3.9 22.1,3 21,3z M21,19H3V5h18V19z" }) }), "Entertainment"] }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.entertainment })] })), roomDetails?.foodDrink && (_jsxs("div", { className: "bg-white rounded-lg p-3 shadow-sm", children: [_jsxs("h4", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-green-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M8.1,13.34L11,16.17L15.2,12L17.43,14.9L11,21.34L4.54,14.9L8.1,13.34Z" }) }), "Food & Drink"] }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.foodDrink })] })), roomDetails?.bathroom && (_jsxs("div", { className: "bg-white rounded-lg p-3 shadow-sm", children: [_jsxs("h4", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M9,2V8H7V10H9V11A4,4 0 0,0 13,15H15V16H17V15H19V13H17V12H15V8H17V6H15V2H9M11,4H13V6H11V4Z" }) }), "Bathroom"] }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.bathroom })] })), roomDetails?.comfort && (_jsxs("div", { className: "bg-white rounded-lg p-3 shadow-sm", children: [_jsxs("h4", { className: "font-medium text-gray-900 mb-2 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 text-orange-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M19,7H11V14H3V15A2,2 0 0,0 5,17H19A2,2 0 0,0 21,15V9A2,2 0 0,0 19,7Z" }) }), "Comfort"] }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.comfort })] })), !roomDetails?.internet && !roomDetails?.entertainment && !roomDetails?.foodDrink &&
                                                !roomDetails?.bathroom && !roomDetails?.comfort && (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Amenities" }), _jsx("p", { className: "text-sm text-gray-600", children: "Detailed amenity information not available. Please contact the hotel for more details." })] }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-lg", children: "Pricing & Information" }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Pricing" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Starting from" }), _jsx("span", { className: "font-bold text-lg text-gray-900", children: formatPrice(showTotalStay ? lowestPrice * nights : lowestPrice) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: showTotalStay ? `total stay (${nights} night${nights !== 1 ? 's' : ''})` : 'per night' }), _jsxs("span", { className: "text-sm text-gray-900", children: [roomCount, " rate", roomCount !== 1 ? 's' : ''] })] }), hasFreeCancellation && (_jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsx("svg", { className: "w-4 h-4 text-green-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) }), _jsx("span", { className: "text-sm text-green-600", children: "Free cancellation available" })] }))] })] }), additionalInfo?.knowBeforeYouGo && additionalInfo.knowBeforeYouGo.length > 0 ? (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Important Information" }), _jsx("ul", { className: "space-y-2", children: additionalInfo.knowBeforeYouGo.slice(0, 3).map((info, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { className: "text-sm text-gray-600", children: info })] }, index))) })] })) : (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Important Information" }), _jsx("p", { className: "text-sm text-gray-600", children: "Please check with the hotel directly for specific policies and requirements." })] })), additionalInfo?.feesOptional && additionalInfo.feesOptional.items.length > 0 ? (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Optional Fees" }), _jsx("ul", { className: "space-y-2", children: additionalInfo.feesOptional.items.slice(0, 3).map((fee, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { className: "text-sm text-gray-600", children: fee })] }, index))) }), additionalInfo.feesOptional.note && (_jsx("p", { className: "text-xs text-gray-500 mt-2 italic", children: additionalInfo.feesOptional.note }))] })) : (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Additional Fees" }), _jsx("p", { className: "text-sm text-gray-600", children: "Contact the hotel for information about additional fees or services." })] })), roomDetails?.smokingPolicy ? (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Smoking Policy" }), _jsx("p", { className: "text-sm text-gray-600", children: roomDetails.smokingPolicy })] })) : (_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Hotel Policies" }), _jsx("p", { className: "text-sm text-gray-600", children: "Please contact the hotel directly for information about their policies." })] }))] })] }) }), _jsx("div", { className: "p-4 border-t bg-gray-50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm text-gray-600", children: hasImages ? `${currentIndex + 1} of ${images.length} photos` : 'Room information available' }), _jsx("button", { onClick: onClose, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors", children: "Close" })] }) })] }) }));
    // Render modal using portal to ensure it's at the root level
    return createPortal(modalContent, document.body);
};
export default RoomImageModal;
