import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { format } from 'date-fns';
const BookingCard = ({ booking }) => {
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMM dd, yyyy');
    };
    const calculateNights = (checkin, checkout) => {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
    const getBookingStatus = (checkin, checkout) => {
        const now = new Date();
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        if (now < checkinDate) {
            return { status: 'Upcoming', color: 'text-blue-600 bg-blue-100' };
        }
        else if (now >= checkinDate && now <= checkoutDate) {
            return { status: 'Current', color: 'text-green-600 bg-green-100' };
        }
        else {
            return { status: 'Completed', color: 'text-gray-600 bg-gray-100' };
        }
    };
    const { status, color } = getBookingStatus(booking.checkin, booking.checkout);
    const nights = calculateNights(booking.checkin, booking.checkout);
    const totalPrice = booking.baseRateInCurrency + booking.includedTaxesAndFeesInCurrency;
    return (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200", children: _jsx("div", { className: "p-6", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: booking.roomImage ? (_jsx("img", { src: booking.roomImage, alt: booking.hotelName, className: "w-20 h-20 object-cover rounded-lg" })) : (_jsx("div", { className: "w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-gray-400 text-2xl", children: "\uD83C\uDFE8" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 truncate", children: booking.hotelName }), _jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${color}`, children: status })] }), _jsx("p", { className: "text-gray-600 mb-2", children: booking.roomDescription }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Check-in:" }), _jsx("br", {}), formatDate(booking.checkin)] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Check-out:" }), _jsx("br", {}), formatDate(booking.checkout)] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Duration:" }), _jsx("br", {}), nights, " night", nights !== 1 ? 's' : ''] })] }), _jsxs("div", { className: "mt-3 text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Primary Guest:" }), " ", booking.guestName, booking.guestNumber && (_jsxs(_Fragment, { children: [_jsx("span", { className: "mx-2", children: "\u2022" }), _jsx("span", { className: "font-medium", children: "Phone:" }), " ", booking.guestNumber] }))] }), booking.request && (_jsxs("div", { className: "mt-2 text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Special Request:" }), " ", booking.request] }))] })] }) }), _jsxs("div", { className: "mt-4 lg:mt-0 lg:ml-6 lg:text-right", children: [_jsxs("div", { className: "text-2xl font-bold text-gray-900", children: ["$", totalPrice.toFixed(2)] }), _jsxs("div", { className: "text-sm text-gray-500 mt-1", children: ["Total for ", nights, " night", nights !== 1 ? 's' : ''] }), _jsxs("div", { className: "mt-4 text-xs text-gray-500", children: ["Booked on ", formatDate(booking.createdAt)] })] })] }) }) }));
};
export default BookingCard;
