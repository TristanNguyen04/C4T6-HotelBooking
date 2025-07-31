import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMyBookings } from '../api/booking';
import type { BookingHistory } from '../types/hotel';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../components/booking/BookingCard';
import BookingFilterTabs, { type FilterType, type FilterCounts } from '../components/booking/BookingFilterTabs';

const BookingHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getMyBookings();
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);



  const isBookingUpcoming = (_checkin: string, checkout: string) => {
    const now = new Date();
    const checkoutDate = new Date(checkout);
    return now <= checkoutDate; // Includes current and future bookings
  };

  const isBookingPast = (_checkin: string, checkout: string) => {
    const now = new Date();
    const checkoutDate = new Date(checkout);
    return now > checkoutDate; // Only past bookings
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return isBookingUpcoming(booking.checkin, booking.checkout);
    if (activeFilter === 'past') return isBookingPast(booking.checkin, booking.checkout);
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

  const filterCounts: FilterCounts = getFilterCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load bookings</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-30 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">
            View and manage your hotel reservations
          </p>
        </div>

        {/* Filter Tabs */}
        {bookings.length > 0 && (
          <BookingFilterTabs
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filterCounts={filterCounts}
          />
        )}

        {filteredBookings.length === 0 && bookings.length > 0 ? (
          /* No results for current filter */
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No {activeFilter} bookings found
            </h2>
            <p className="text-gray-600 mb-6">
              {activeFilter === 'upcoming' && "You don't have any upcoming bookings."}
              {activeFilter === 'past' && "You don't have any past bookings."}
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-[#FF6B6B] hover:text-[#ff5a5a] font-medium"
            >
              View all bookings
            </button>
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-gray-600 mb-6">
              Start planning your next trip by searching for hotels.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200"
            >
              Search Hotels
            </button>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;