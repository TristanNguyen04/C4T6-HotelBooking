import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { renderStars } from '../utils/stars';
import { formatAmenityName } from '../utils/amenity';
import { getGuestRatingDisplay } from '../utils/guestRating';
import GoogleMapPage from './map';
import ReactDOM from "react-dom";
export default function HotelCard({ hotel, searchContext, showTotalPrice = false }) {
    const navigate = useNavigate();
    const handleViewDetails = () => {
        const queryParams = [
            `destination_id=${encodeURIComponent(searchContext.destination_id)}`,
            `checkin=${encodeURIComponent(searchContext.checkin)}`,
            `checkout=${encodeURIComponent(searchContext.checkout)}`,
            `guests=${searchContext.guests}`,
            `term=${encodeURIComponent(searchContext.term)}`,
            `rooms=${searchContext.rooms}`,
            `adults=${searchContext.adults}`,
            `children=${searchContext.children}`
        ].join('&');
        navigate(`/hotels/${hotel.id}/details?${queryParams}`);
    };
    const [showMapPopup, setShowMapPopup] = useState(false);
    useEffect(() => {
        if (showMapPopup) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
        // Clean up on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showMapPopup]);
    const [imgSrc, setImgSrc] = useState(hotel.image_details
        ? `${hotel.image_details.prefix}${hotel.image_details.count}${hotel.image_details.suffix}`
        : assets.hotelNotFound);
    const handleImgError = () => {
        setImgSrc(assets.hotelNotFound);
    };
    const amenityKeys = Object.entries(hotel.amenities || {})
        .filter(([, value]) => value === true)
        .map(([key]) => key);
    const previewAmenities = amenityKeys.slice(0, 3);
    const extraAmenityCount = amenityKeys.length - previewAmenities.length;
    const tooltipContent = amenityKeys
        .map(formatAmenityName)
        .join(' • ');
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200", children: _jsxs("div", { className: "flex flex-col sm:flex-row", children: [_jsx("div", { className: "w-full h-48 sm:w-64 sm:h-72 bg-gray-100 flex-shrink-0", children: _jsx("img", { src: imgSrc, alt: hotel.name, onError: handleImgError, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1 p-4 flex flex-col justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2", children: [_jsxs("div", { className: "flex-1", children: [hotel.rating && (_jsxs("div", { className: "flex items-center gap-1 mb-2", children: [renderStars(hotel.rating), _jsxs("span", { className: "text-sm text-gray-600 ml-1", "data-cy": 'star-rating', children: ["(", hotel.rating, ")"] })] })), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-1", children: hotel.name }), _jsxs("p", { className: "text-sm text-gray-600 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }), hotel.address] })] }), hotel.categories.overall?.score && hotel.categories.overall.score >= 60 && (() => {
                                                    const ratingDisplay = getGuestRatingDisplay(hotel.categories.overall.score);
                                                    return ratingDisplay ? (_jsx("div", { className: "flex-shrink-0", children: _jsxs("span", { className: `inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${ratingDisplay.bgColor} ${ratingDisplay.textColor} ${ratingDisplay.borderColor} border`, "data-cy": 'rating-text', children: [_jsx("svg", { className: "w-4 h-4 mr-1.5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41.81 4.5 2.09C11.59 4.81 13.26 4 15 4 17.58 4 19 5.42 19 7.5c0 3.78-3.4 6.86-6.55 9.18L10 18z", clipRule: "evenodd" }) }), ratingDisplay.text, _jsxs("span", { className: "ml-1.5 text-xs opacity-75", children: [hotel.categories.overall.score, "/100"] })] }) })) : null;
                                                })()] }), hotel.distance && (_jsxs("p", { className: "text-sm text-gray-500", children: [(hotel.distance / 1000).toFixed(1), " km from center"] })), amenityKeys.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1", "data-cy": 'AmenityList', children: [previewAmenities.map((key) => (_jsx("span", { "data-cy": 'preview-amenities', className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: formatAmenityName(key) }, key))), extraAmenityCount > 0 && (_jsxs("span", { className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 cursor-help", "data-tooltip-id": `tooltip-${hotel.id}`, "data-tooltip-content": tooltipContent, children: ["+", extraAmenityCount, " more"] })), _jsx(Tooltip, { id: `tooltip-${hotel.id}`, place: "bottom", style: {
                                                        backgroundColor: '#1f2937',
                                                        color: '#ffffff',
                                                        borderRadius: '8px',
                                                        padding: '12px 16px',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        maxWidth: '300px',
                                                        textAlign: 'center',
                                                        lineHeight: '1.4',
                                                        wordWrap: 'break-word',
                                                        zIndex: 1000,
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                                    }, opacity: 1 })] }))] }), _jsxs("div", { className: "flex items-center justify-between mt-4 pt-3 border-t border-gray-100", children: [_jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-2xl font-bold text-gray-900", "data-cy": 'hotel-price', children: [hotel.currency, " ", showTotalPrice ? hotel.totalPrice : hotel.price] }), _jsx("p", { className: "text-sm text-gray-500", children: showTotalPrice ?
                                                        `total stay${hotel.nights ? ` (${hotel.nights} night${hotel.nights > 1 ? 's' : ''})` : ''}` :
                                                        'per night' })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setShowMapPopup(true), className: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2", children: "View on Map" }), _jsx("button", { onClick: handleViewDetails, className: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: "View Details" })] })] })] })] }) }), showMapPopup && ReactDOM.createPortal(_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-40 z-10", onClick: () => setShowMapPopup(false) }), _jsxs("div", { className: "fixed z-50 bg-white border border-gray-300 shadow-xl p-4 rounded-lg w-[90vw] h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-col", style: { zIndex: 9999 }, children: [_jsx("div", { className: "flex justify-end mb-2", children: _jsx("button", { onClick: () => setShowMapPopup(false), className: "text-gray-500 hover:text-black text-xl font-bold", "aria-label": "Close map popup", children: "\u00D7" }) }), _jsx(GoogleMapPage, { position: { lat: hotel.latitude, lng: hotel.longitude } })] })] }), document.body)] }));
}
