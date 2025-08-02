import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createCheckoutSession } from '../api/booking';
import { searchHotelDetails } from '../api/hotels';
import { calculateRoomPrice } from '../utils/pricing';
import { calculateNights } from '../utils/date';
import BookingSummary from '../components/booking/BookingSummary';
import PrimaryGuestCard from '../components/booking/PrimaryGuestCard';
import Spinner from '../components/Spinner';
import type { GuestDetails, BookingDetails, PaymentItem, Room, Hotel, SearchContext, HotelSearchParams } from '../types/hotel';
import { assets } from '../assets/assets';

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    primaryGuestTitle: 'Mr',
    primaryGuestFirstName: '',
    primaryGuestLastName: '',
    primaryGuestPhoneNumber: '',
    specialRequest: ''
  });

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [searchContext, setSearchContext] = useState<SearchContext | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract parameters from URL
  useEffect(() => {
    const roomKey = searchParams.get('roomKey');
    const hotelId = searchParams.get('hotelId');
    const destination_id = searchParams.get('destination_id');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const guests = searchParams.get('guests');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const rooms = searchParams.get('rooms');
    const term = searchParams.get('term');
    const childrenAgesParam = searchParams.get('childrenAges');

    // Redirect if not logged in
    if (!user) {
      navigate('/login', { state: { returnTo: `/checkout?${searchParams.toString()}` } });
      return;
    }

    // Validate required parameters
    if (!roomKey || !hotelId || !destination_id || !checkin || !checkout || !guests || !adults || !children || !rooms) {
      setError('Missing required booking parameters');
      setLoading(false);
      return;
    }

    // Parse children ages
    const childrenAges = childrenAgesParam ? 
      childrenAgesParam.split(',').map(age => parseInt(age)).filter(age => !isNaN(age)) : 
      [];

    // Reconstruct search context
    const reconstructedSearchContext: SearchContext = {
      destination_id,
      checkin,
      checkout,
      guests,
      adults: parseInt(adults),
      children: parseInt(children),
      rooms: parseInt(rooms),
      term: term || '',
      childrenAges
    };

    setSearchContext(reconstructedSearchContext);

    // Fetch hotel details
    const fetchHotelAndRoom = async (retryCount = 0) => {
      try {
        const hotelParams: HotelSearchParams = {
          destination_id,
          checkin,
          checkout,
          guests
        };

        const response = await searchHotelDetails(hotelId, hotelParams);
        const hotelData = response.data;
        
        if (!hotelData) {
          setError('Hotel not found');
          setLoading(false);
          return;
        }

        // Find the specific room
        const selectedRoom = hotelData.rooms?.find((r: Room) => r.key === roomKey);
        if (!selectedRoom) {
          setError('Room not found');
          setLoading(false);
          return;
        }
       

        setHotel(hotelData);
        setRoom(selectedRoom);

        // Calculate booking details
        const nights = calculateNights(checkin, checkout);
        const priceBreakdown = calculateRoomPrice(selectedRoom, { nights });

        const booking: BookingDetails = {
          hotelId: hotelData.id,
          hotelName: hotelData.name,
          roomKey: selectedRoom.key,
          roomDescription: selectedRoom.roomDescription,
          roomImage: selectedRoom.images?.[0]?.url,
          checkin,
          checkout,
          guests,
          adults: parseInt(adults),
          rooms: parseInt(rooms),
          children: parseInt(children),
          childrenAges,
          priceBreakdown,
          ...guestDetails
        };

        setBookingDetails(booking);
        setLoading(false);
      } catch (err) {
        if (retryCount < 2) {
          // Simple retry without polling
          setTimeout(() => fetchHotelAndRoom(retryCount + 1), 1000);
          return;
        }
        console.error('Error fetching hotel details:', err);
        setError('Failed to load booking information');
        setLoading(false);
      }
    };

    fetchHotelAndRoom();
  }, [searchParams, user, navigate]);

  // Update booking details when guest details change
  useEffect(() => {
    if (bookingDetails) {
      setBookingDetails(prev => prev ? { ...prev, ...guestDetails } : null);
    }
  }, [guestDetails]);

  // Validate form
  useEffect(() => {
    const isValid = 
      guestDetails.primaryGuestFirstName.trim() !== '' &&
      guestDetails.primaryGuestLastName.trim() !== '' &&
      guestDetails.primaryGuestPhoneNumber.trim() !== '';
    
    setIsFormValid(isValid);
  }, [guestDetails]);

  const handleGuestDetailsChange = (newGuestDetails: GuestDetails) => {
    setGuestDetails(newGuestDetails);
  };

  const handleBookingConfirm = async () => {
    if (!bookingDetails || !user || !isFormValid) return;

    setCheckoutLoading(true);
    try {
      const paymentItem: PaymentItem = {
        hotelId: bookingDetails.hotelId,
        hotelName: bookingDetails.hotelName,
        roomKey: bookingDetails.roomKey,
        roomDescription: bookingDetails.roomDescription,
        roomImage: bookingDetails.roomImage || assets.hotelNotFound,
        name: `${bookingDetails.hotelName} - ${bookingDetails.roomDescription}`,
        image: bookingDetails.roomImage || '',
        price: Math.round(bookingDetails.priceBreakdown.total_price * 100), // Stripe expects cents
        currency: bookingDetails.priceBreakdown.currency,
        quantity: 1,
        checkin: bookingDetails.checkin,
        checkout: bookingDetails.checkout,
        guests: bookingDetails.guests,
        adults: bookingDetails.adults,
        rooms: bookingDetails.rooms,
        children: bookingDetails.children,
        childrenAges: bookingDetails.childrenAges,
        baseRateInCurrency: bookingDetails.priceBreakdown.base_rate_in_currency,
        includedTaxesAndFeesInCurrency: bookingDetails.priceBreakdown.included_taxes_and_fees_total_in_currency,
        excludedTaxesAndFeesInCurrency: bookingDetails.priceBreakdown.excluded_taxes_and_fees_total_in_currency,
        primaryGuestTitle: bookingDetails.primaryGuestTitle,
        primaryGuestFirstName: bookingDetails.primaryGuestFirstName,
        primaryGuestLastName: bookingDetails.primaryGuestLastName,
        primaryGuestPhoneNumber: bookingDetails.primaryGuestPhoneNumber,
        specialRequest: bookingDetails.specialRequest
      };

      const response = await createCheckoutSession({
        items: [paymentItem],
        userId: user.id
      });

      // Redirect to Stripe checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleBackToHotel = () => {
    if (hotel && searchContext) {
      const params = new URLSearchParams({
        destination_id: searchContext.destination_id,
        checkin: searchContext.checkin,
        checkout: searchContext.checkout,
        guests: searchContext.guests,
        adults: searchContext.adults.toString(),
        children: searchContext.children.toString(),
        rooms: searchContext.rooms.toString(),
        term: searchContext.term,
        childrenAges: searchContext.childrenAges.join(',')
      });

      navigate(`/hotels/${hotel.id}/details?${params.toString()}`);
    } else {
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" data-cy="loading-booking-details">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <img 
              src={assets.hotelNotFound} 
              alt="Room not available" 
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Room No Longer Available
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We're sorry, but this room is no longer available for your selected dates. 
            This can happen when rooms are booked by other guests or when availability changes.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleBackToHotel}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Other Rooms
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Search Different Hotels
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking information not found</h2>
          <p className="text-gray-600 mb-4">Please start your booking from the hotel details page.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-25">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleBackToHotel}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Complete Your Booking</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step 2 of 3: Guest Details
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <PrimaryGuestCard
              onGuestDetailsChange={handleGuestDetailsChange}
              initialData={guestDetails}
            />
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingSummary bookingDetails={bookingDetails} />
              
              {/* Continue Button */}
              <button
                data-cy={'continue-to-payment'}
                onClick={handleBookingConfirm}
                disabled={!isFormValid || checkoutLoading}
                className={`w-full mt-6 px-6 py-4 rounded-lg font-medium text-lg transition-colors ${
                  isFormValid && !checkoutLoading
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {checkoutLoading ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  'Continue to Payment'
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                You will be redirected to a secure payment page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 