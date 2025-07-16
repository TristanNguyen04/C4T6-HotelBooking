import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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
import type { Hotel, SearchContext } from '../types/hotel';

export default function HotelDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();

    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Extract search context from URL parameters
    const searchContext: SearchContext | null = useMemo(() => {
        return searchParams.get('destination_id') ? {
            destination_id: searchParams.get('destination_id') || '',
            checkin: searchParams.get('checkin') || '',
            checkout: searchParams.get('checkout') || '',
            guests: searchParams.get('guests') || '',
            rooms: parseInt(searchParams.get('rooms') || '1'),
            adults: parseInt(searchParams.get('adults') || '2'),
            children: parseInt(searchParams.get('children') || '0'),
            term: searchParams.get('term') || ''
        } : null;
    }, [searchParams]);

    useEffect(() => {
        if (!id) {
            setError('Hotel ID is required.');
            setLoading(false);
            return;
        }

        setLoading(true);
        
        if (searchContext) {
            searchHotelDetails(id, {
                destination_id: searchContext.destination_id,
                checkin: searchContext.checkin,
                checkout: searchContext.checkout,
                guests: searchContext.guests
            })
                .then(res => {
                    setHotel(res.data);
                    setError(null);
                })
                .catch(err => {
                    console.error('Failed to load hotel details:', err);
                    setError('Failed to load hotel details. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError('Please access this hotel through the search results.');
            setLoading(false);
        }
    }, [id, searchContext]);

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
                rooms: searchContext.rooms.toString()
            });
            navigate(`/search?${params.toString()}`);
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Spinner />
                <p className="mt-4 text-gray-600">Loading hotel details...</p>
            </div>
        );
    }

    if (error) {
        return <HotelDetailsError error={error} onBackToSearch={handleBackToSearch} />;
    }

    if (!hotel) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Bar Header */}
            {searchContext && (
                <header className="bg-[#003580] text-white sticky top-20 z-[1000] shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <SearchBar
                            onSubmit={({ destination, checkin, checkout, guests, rooms, adults, children }) => {
                                navigate(
                                    `/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&adults=${adults}&children=${children}&rooms=${rooms}`
                                );
                            }}
                            initialValues={{
                                destination: {
                                    uid: searchContext.destination_id,
                                    term: searchContext.term
                                },
                                checkin: searchContext.checkin,
                                checkout: searchContext.checkout,
                                guests: searchContext.guests,
                                rooms: searchContext.rooms,
                                adults: searchContext.adults,
                                children: searchContext.children
                            }}
                        />
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className={`max-w-7xl mx-auto px-4 py-8 ${searchContext ? 'pt-24' : ''}`}>
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={handleBackToSearch}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Search Results
                    </button>
                </div>

                {/* Hotel Header */}
                <HotelDetailsHeader hotel={hotel} />

                {/* Hotel Image */}
                <HotelImage hotel={hotel} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Overview and Amenities */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <OverviewCard hotel={hotel} />
                        </div>

                        {/* Amenities */}
                        <HotelAmenities hotel={hotel} />
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="space-y-6">
                        {/* Hotel Information */}
                        <HotelInformation searchContext={searchContext} />

                        {/* Quick Actions */}
                        <HotelQuickActions />
                    </div>
                </div>
            </main>
        </div>
    );
}
