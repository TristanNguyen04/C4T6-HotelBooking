import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useMemo, useCallback, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import { searchHotelDetails } from '../api/hotels';
import SearchBar from '../components/SearchBar';
import OverviewCard from '../components/hotelDetails/OverviewCard';
import HotelDetailsError from '../components/hotelDetails/HotelDetailsError';
import HotelDetailsHeader from '../components/hotelDetails/HotelDetailsHeader';
import HotelImage from '../components/hotelDetails/HotelImage';
import HotelAmenities from '../components/hotelDetails/HotelAmenities';
import HotelInformation from '../components/hotelDetails/HotelInformation';
import HotelQuickActions from '../components/hotelDetails/HotelQuickActions';
import HotelRoomOptions from '../components/hotelDetails/HotelRoomOptions';
import LoginPromptModal from '../components/LoginPromptModal';
import { usePollingFetch } from '../hooks/usePollingFetch';
import { parseChildrenAges } from '../utils/age';
import { useAuth } from '../contexts/AuthContext';
export default function HotelDetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const roomOptionsRef = useRef(null);
    const searchContext = useMemo(() => {
        const childrenAges = searchParams.get('guests') ? parseChildrenAges(searchParams.get('guests') || '') : [];
        return searchParams.get('destination_id') ? {
            destination_id: searchParams.get('destination_id') || '',
            checkin: searchParams.get('checkin') || '',
            checkout: searchParams.get('checkout') || '',
            guests: searchParams.get('guests') || '',
            rooms: parseInt(searchParams.get('rooms') || '1'),
            adults: parseInt(searchParams.get('adults') || '2'),
            children: parseInt(searchParams.get('children') || '0'),
            term: searchParams.get('term') || '',
            childrenAges: childrenAges
        } : null;
    }, [searchParams]);
    const shouldFetch = id && searchContext;
    const fetchHotelDetails = useCallback(async () => {
        if (!shouldFetch)
            return Promise.resolve({ data: null, completed: true });
        return searchHotelDetails(id, {
            destination_id: searchContext.destination_id,
            checkin: searchContext.checkin,
            checkout: searchContext.checkout,
            guests: searchContext.guests,
        }).then(res => {
            const responseData = res.data;
            const { completed, ...hotelData } = responseData;
            return {
                data: hotelData,
                completed: completed
            };
        });
    }, [id, searchContext, shouldFetch]);
    const validateHotelData = useCallback((hotel) => {
        const hasBasicData = !!(hotel &&
            typeof hotel === 'object' &&
            'id' in hotel &&
            'name' in hotel);
        const hasRoomsData = !!(hotel.rooms &&
            Array.isArray(hotel.rooms) &&
            hotel.rooms.length > 0);
        console.log('Hotel validation:', {
            hasBasicData,
            hasRoomsData,
            roomsCount: hotel.rooms?.length || 0
        });
        return hasBasicData && hasRoomsData;
    }, []);
    const { data: hotel, loading, error } = usePollingFetch(fetchHotelDetails, {
        maxRetries: 10,
        interval: 3000,
        skip: !shouldFetch,
        validateData: validateHotelData
    });
    // Handle specific error cases
    const errorMessage = useMemo(() => {
        if (!id)
            return 'Hotel ID is required.';
        if (!searchContext)
            return 'Please access this hotel through the search results.';
        if (error)
            return 'Failed to load hotel details. Please try again.';
        return null;
    }, [id, searchContext, error]);
    const handleBackToSearch = () => {
        if (searchContext) {
            const params = new URLSearchParams({
                term: searchContext.term,
                destination_id: searchContext.destination_id,
                checkin: searchContext.checkin,
                checkout: searchContext.checkout,
                guests: searchContext.guests,
                adults: searchContext.adults.toString(),
                children: searchContext.children.toString(),
                rooms: searchContext.rooms.toString(),
                childrenAges: searchContext.childrenAges.join(',')
            });
            navigate(`/search?${params.toString()}`);
        }
        else {
            navigate('/');
        }
    };
    const { user } = useAuth();
    const handleBookRoom = (roomKey) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        const room = hotel?.rooms?.find(r => r.key === roomKey);
        if (!room || !hotel || !searchContext)
            return;
        // Create URL parameters from search context
        const params = new URLSearchParams({
            roomKey: roomKey,
            hotelId: hotel.id,
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
        // Navigate to checkout page with URL parameters
        navigate(`/checkout?${params.toString()}`);
    };
    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        // Get current URL with all search parameters to return here after login
        const currentUrl = `${location.pathname}${location.search}`;
        navigate('/login', {
            state: { returnTo: currentUrl }
        });
    };
    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };
    const handleBookNowScroll = () => {
        if (roomOptionsRef.current) {
            roomOptionsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    if (loading) {
        return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col items-center justify-center", children: [_jsx(Spinner, {}), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading hotel details..." })] }));
    }
    if (errorMessage) {
        return _jsx(HotelDetailsError, { error: errorMessage, onBackToSearch: handleBackToSearch });
    }
    if (!hotel)
        return _jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col items-center justify-center", children: [_jsx(Spinner, {}), _jsx("p", { className: "mt-4 text-gray-600", children: "hotel not found" })] });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [searchContext && (_jsx("header", { className: "bg-[#003580] text-white sticky top-20 z-[1000] shadow-lg w-full", children: _jsx("div", { className: "max-w-screen-xl mx-auto px-4 pb-3 pt-5 w-full", children: _jsx(SearchBar, { onSubmit: ({ destination, checkin, checkout, guests, rooms, adults, children }) => {
                            navigate(`/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&adults=${adults}&children=${children}&rooms=${rooms}`);
                        }, initialValues: {
                            destination: {
                                uid: searchContext.destination_id,
                                term: searchContext.term
                            },
                            checkin: searchContext.checkin,
                            checkout: searchContext.checkout,
                            guests: searchContext.guests,
                            rooms: searchContext.rooms,
                            adults: searchContext.adults,
                            children: searchContext.children,
                            childrenAges: searchContext.childrenAges
                        } }) }) })), _jsxs("main", { className: `max-w-7xl mx-auto px-4 py-8 ${searchContext ? 'pt-24' : ''}`, children: [_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: handleBackToSearch, className: "flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "Back to Search Results"] }) }), _jsx(HotelDetailsHeader, { hotel: hotel, onBookNow: handleBookNowScroll }), _jsx(HotelImage, { hotel: hotel }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Overview" }), _jsx(OverviewCard, { hotel: hotel })] }), _jsx(HotelAmenities, { hotel: hotel }), _jsx("div", { ref: roomOptionsRef, children: _jsx(HotelRoomOptions, { hotel: hotel, onBookRoom: handleBookRoom, searchContext: searchContext }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(HotelInformation, { searchContext: searchContext }), _jsx(HotelQuickActions, { onBookNow: handleBookNowScroll })] })] })] }), _jsx(LoginPromptModal, { isOpen: showLoginModal, onClose: handleCloseLoginModal, onLogin: handleLoginRedirect })] }));
}
