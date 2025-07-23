import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { searchHotels } from "../api/hotels";
import type { SortOption, Hotel } from "../types/hotel";
import HotelCardSkeleton from '../components/HotelCardSkeleton';
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import { usePollingFetch } from "../hooks/usePollingFetch";
import { useHotelFilter } from "../hooks/useHotelFilter";
import { useHotelSort } from "../hooks/useHotelSort";
import FilterBar from "../components/FilterBar";
import FilterBarSkeleton from "../components/FilterBarSkeleton";
import { assets } from "../assets/assets";
import { parseChildrenAges } from "../utils/age";

export default function SearchResultsPage(){
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);

    const [sortOption, setSortOption] = useState<SortOption>("Relevance (Default)");

    const [priceMin, setPriceMin] = useState<number>(0);
    const [priceMax, setPriceMax] = useState<number>(Infinity);
    const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([]);
    const [selectedGuestRatings, setSelectedGuestRatings] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const [visibleCount, setVisibleCount] = useState(10);
    const [showTotalPrice, setShowTotalPrice] = useState(false);

    const destination_id = params.get('destination_id') || ''; 
    const checkin = params.get('checkin') || '';
    const checkout = params.get('checkout') || '';
    const guests = params.get('guests') || '';
    const rooms = guests.split('|').length;
    const adults = parseInt(params.get('adults') || '');
    const children = parseInt(params.get('children') || '');
    const term = params.get("term") || '';

    const childrenAges = parseChildrenAges(guests);

    const shouldFetch = destination_id && checkin && checkout && guests;

    const fetchHotels = useCallback(async () => {
        if (!shouldFetch) return Promise.resolve({ data: [], completed: true });
        return searchHotels({ destination_id, checkin, checkout, guests }).then(res => res.data);
    }, [destination_id, checkin, checkout, guests, shouldFetch]);

    const { data: hotels, loading, error } = usePollingFetch<Hotel[]>(
        fetchHotels,
        {
            maxRetries: 10,
            interval: 3000,
            skip: !shouldFetch
        }
    )

    useEffect(() => {
        if(hotels && hotels.length > 0){
            const prices = hotels.map(h => h.price || 0).filter(p => p > 0);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setPriceMin(min);
            setPriceMax(max);
            setSelectedStarRatings([]);
            setSelectedGuestRatings([]);
            setSelectedAmenities([]);
            setVisibleCount(10);
        }
    }, [hotels]);

    const filteredHotels = useHotelFilter(
        {
            hotels: hotels ?? [],
            priceMin,
            priceMax,
            selectedStarRatings,
            selectedGuestRatings,
            selectedAmenities,
            showTotalPrice
        }
    );

    const sortedHotels = useHotelSort(
        filteredHotels,
        sortOption
    );

    useEffect(() => {
        setDisplayedHotels(sortedHotels);
    }, [sortedHotels])

    useEffect(() => {
        setVisibleCount(10);
    }, [displayedHotels]);

    return (
        <div className="min-h-screen bg-gray-100 w-screen m-0 p-0 box-border">
            <header className="bg-[#003580] text-white sticky top-20 z-[1000] shadow-lg w-full">
                <div className="max-w-screen-xl mx-auto px-6 py-4 w-full">
                    <SearchBar
                        onSubmit={({ destination, checkin, checkout, guests, rooms, adults, children }) => {
                            navigate(`/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&adults=${adults}&children=${children}&rooms=${rooms}`);
                        }}

                        initialValues={{
                            destination: {
                                uid: params.get('destination_id') || '',
                                term: params.get('term') || ''
                            },
                            checkin: params.get('checkin') || '',
                            checkout: params.get('checkout') || '',
                            guests: params.get('guests') || '2',
                            rooms: rooms,
                            adults: adults,
                            children: children,
                            childrenAges: childrenAges
                        }}
                    />
                </div>
            </header>


            <main className="w-full p-6 bg-gray-100 md:mt-5 md:p-4 sm:p-3 pt-24 md:pt-20">
                <div className="max-w-screen-xl mx-auto flex gap-6 items-start w-full flex-col md:flex-row md:gap-4 xl:max-w-none xl:px-10">
                    <aside className="w-full md:w-80 md:flex-shrink-0 bg-white rounded-lg p-5 shadow-sm sticky md:top-48 md:max-h-[calc(100vh-12rem)] md:overflow-y-auto border border-gray-200 order-2 md:order-1 md:p-4">
                        {(loading || error) && (
                            <FilterBarSkeleton />
                        )}
                        {!loading && !error && hotels && (
                            <FilterBar
                                hotels={hotels}
                                priceMin={priceMin}
                                setPriceMin={setPriceMin}
                                priceMax={priceMax}
                                setPriceMax={setPriceMax}
                                selectedStarRatings={selectedStarRatings}
                                setSelectedStarRatings={setSelectedStarRatings}
                                selectedGuestRatings={selectedGuestRatings}
                                setSelectedGuestRatings={setSelectedGuestRatings}
                                selectedAmenities={selectedAmenities}
                                setSelectedAmenities={setSelectedAmenities}
                                showTotalPrice={showTotalPrice}
                            />
                        )}
                    </aside>


                    <section className="flex-1 min-w-0 order-1 md:order-2">
                        {loading && (
                            <div className="space-y-4">
                                <div className="mb-5 pb-4 border-b border-gray-200">
                                    <div className="w-48 h-8 bg-gray-200 rounded shimmer"></div>
                                </div>
                                
                                <ul className="list-none p-0 m-0 flex flex-col gap-4"
                                    data-cy={'Loading'}
                                    data-class={'HotelCardSkele'}
                                    >
                                    {[...Array(6)].map((_, index) => (
                                        <HotelCardSkeleton key={index} />
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Handle actual fetch errors differently from no results */}
                        {error && (
                            <div className="flex flex-col items-center justify-center py-16 px-5">
                                <div className="max-w-md text-center">
                                    <img 
                                        src={assets.hotelNotFound} 
                                        alt="Error occurred" 
                                        className="w-48 h-48 mx-auto mb-6 opacity-75"
                                    />
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        Unable to load hotels
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        We're having trouble connecting to our servers. Please check your internet connection and try again.
                                    </p>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Handle no results found (successful fetch but empty results) */}
                        {!error && !loading && hotels && displayedHotels.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 px-5">
                                {/* Your existing "No hotels found" UI */}
                                <div className="max-w-md text-center">
                                    <img 
                                        src={assets.hotelNotFound} 
                                        alt="No hotels found" 
                                        className="w-48 h-48 mx-auto mb-6 opacity-75"
                                    />
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                        No hotels found
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        We couldn't find any hotels matching your current search criteria. 
                                        Try adjusting your filters or search parameters.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-medium text-blue-900 mb-2">Try these suggestions:</h4>
                                            <ul className="text-sm text-blue-800 space-y-1 text-left">
                                                <li>• Adjust your price range</li>
                                                <li>• Remove some filters</li>
                                                <li>• Try different dates</li>
                                                <li>• Search nearby destinations</li>
                                            </ul>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <button 
                                                onClick={() => {
                                                    // Reset all filters
                                                    const prices = hotels.map(h => h.price || 0).filter(p => p > 0);
                                                    const min = Math.min(...prices);
                                                    const max = Math.max(...prices);
                                                    setPriceMin(min);
                                                    setPriceMax(max);
                                                    setSelectedStarRatings([]);
                                                    setSelectedGuestRatings([]);
                                                    setSelectedAmenities([]);
                                                }}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                Clear All Filters
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    navigate('/');
                                                }}
                                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                            >
                                                Modify Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!loading && displayedHotels.length > 0 && (
                            <>
                                <div className="mb-5 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between flex-wrap gap-4 flex-col md:flex-row md:gap-3 items-start md:items-center">
                                        <h2 className="m-0 text-2xl font-medium text-gray-800 md:text-xl">
                                            Found {displayedHotels.length} hotels
                                        </h2>
                                        

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-[220px] w-full md:w-auto md:min-w-auto">
                                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                                <label htmlFor="sort-select" className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                                    Sort by:
                                                </label>
                                                <select
                                                    id="sort-select"
                                                    value={sortOption}
                                                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                                                    className="flex-1 sm:flex-initial px-3 py-2 border border-gray-200 rounded-md bg-white text-sm text-gray-800 cursor-pointer transition-colors duration-200 ease-in-out hover:border-[#003580] focus:outline-none focus:border-[#003580] focus:shadow-[0_0_0_2px_rgba(0,53,128,0.1)]"
                                                >
                                                    <option value="Relevance (Default)">Relevance</option>
                                                    <option value="Price (Low to High)">Price (Low to High)</option>
                                                    <option value="Price (High to Low)">Price (High to Low)</option>
                                                    <option value="Star Rating (Low to High)">Star Rating (Low to High)</option>
                                                    <option value="Star Rating (High to Low)">Star Rating (High to Low)</option>
                                                    <option value="Distance (Close to Far)">Distance (Close to Far)</option>
                                                    <option value="Distance (Far to Close)">Distance (Far to Close)</option>
                                                    <option value="Guest Rating (Low to High)">Guest Rating (Low to High)</option>
                                                    <option value="Guest Rating (High to Low)">Guest Rating (High to Low)</option>
                                                </select>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                                <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                                    Price display:
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={showTotalPrice}
                                                            onChange={(e) => setShowTotalPrice(e.target.checked)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out ${showTotalPrice ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${showTotalPrice ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                                        </div>
                                                        <span className="ml-2 text-sm text-gray-700">
                                                            {showTotalPrice ? 'Total stay' : 'Per night'}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <ul className="list-none p-0 m-0 flex flex-col gap-4"
                                    data-cy={'HotelListings'}
                                >
                                    {displayedHotels.slice(0, visibleCount).map(h => (
                                        <HotelCard
                                            key={h.id}
                                            hotel={h}
                                            searchContext={{
                                                destination_id,
                                                checkin,
                                                checkout,
                                                guests,
                                                rooms,
                                                adults,
                                                children,
                                                term,
                                                childrenAges
                                            }}
                                            showTotalPrice={showTotalPrice}
                                        />
                                    ))}
                                </ul>

                                {visibleCount < displayedHotels.length && (
                                    <div className="text-center mt-8 p-5">
                                        <button 
                                        data-cy={'LoadMoreHotels'}
                                            className="bg-blue-600 text-white border-none px-6 py-3 text-sm font-medium rounded cursor-pointer transition-colors duration-200 ease-in-out min-w-[160px] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                            onClick={() => setVisibleCount((prev) => prev + 10)}
                                            disabled={visibleCount >= displayedHotels.length}
                                        >
                                            {visibleCount + 10 >= displayedHotels.length ? 'Show all hotels' : 'Load more hotels'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}