import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMyBookings } from '../api/booking';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../components/booking/BookingCard';
import BookingFilterTabs, {} from '../components/booking/BookingFilterTabs';
const BookingHistoryPage = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await getMyBookings();
                setBookings(response.data);
            }
            catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Failed to load booking history');
            }
            finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchBookings();
        }
    }, [user]);
    const isBookingUpcoming = (_checkin, checkout) => {
        const now = new Date();
        const checkoutDate = new Date(checkout);
        return now <= checkoutDate; // Includes current and future bookings
    };
    const isBookingPast = (_checkin, checkout) => {
        const now = new Date();
        const checkoutDate = new Date(checkout);
        return now > checkoutDate; // Only past bookings
    };
    const filteredBookings = bookings.filter((booking) => {
        if (activeFilter === 'all')
            return true;
        if (activeFilter === 'upcoming')
            return isBookingUpcoming(booking.checkin, booking.checkout);
        if (activeFilter === 'past')
            return isBookingPast(booking.checkin, booking.checkout);
        return true;
    });
    const getFilterCounts = () => {
        const upcoming = bookings.filter(booking => isBookingUpcoming(booking.checkin, booking.checkout)).length;
        const past = bookings.filter(booking => isBookingPast(booking.checkin, booking.checkout)).length;
        return {
            all: bookings.length,
            upcoming,
            past
        };
    };
    const filterCounts = getFilterCounts();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-40 pb-8", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B] mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading your bookings..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-40 pb-8", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-red-500 text-xl mb-4", children: "\u26A0\uFE0F" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Unable to load bookings" }), _jsx("p", { className: "text-gray-600", children: error })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-30 pb-8", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "My Bookings" }), _jsx("p", { className: "mt-2 text-gray-600", children: "View and manage your hotel reservations" })] }), bookings.length > 0 && (_jsx(BookingFilterTabs, { activeFilter: activeFilter, setActiveFilter: setActiveFilter, filterCounts: filterCounts })), filteredBookings.length === 0 && bookings.length > 0 ? (
                /* No results for current filter */
                _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-400 text-6xl mb-4", children: "\uD83D\uDD0D" }), _jsxs("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: ["No ", activeFilter, " bookings found"] }), _jsxs("p", { className: "text-gray-600 mb-6", children: [activeFilter === 'upcoming' && "You don't have any upcoming bookings.", activeFilter === 'past' && "You don't have any past bookings."] }), _jsx("button", { onClick: () => setActiveFilter('all'), className: "text-[#FF6B6B] hover:text-[#ff5a5a] font-medium", children: "View all bookings" })] })) : bookings.length === 0 ? (
                /* Empty State */
                _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-400 text-6xl mb-4", children: "\uD83C\uDFE8" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No bookings yet" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Start planning your next trip by searching for hotels." }), _jsx("button", { onClick: () => navigate('/'), className: "bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200", children: "Search Hotels" })] })) : (
                /* Bookings List */
                _jsx("div", { className: "space-y-6", children: filteredBookings.map((booking) => (_jsx(BookingCard, { booking: booking }, booking.id))) }))] }) }));
};
export default BookingHistoryPage;
