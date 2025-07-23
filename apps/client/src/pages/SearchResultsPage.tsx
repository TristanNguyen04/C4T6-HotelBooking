import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { searchHotels } from "../api/hotels";
import type { SortOption, Hotel, Histogram } from "../types/hotel";
import HotelCardSkeleton from '../components/HotelCardSkeleton';
import { getPriceHistogram } from "../utils/histogram";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import { usePollingFetch } from "../hooks/usePollingFetch";
import { useHotelFilter } from "../hooks/useHotelFilter";
import { useHotelSort } from "../hooks/useHotelSort";
import FilterBar from "../components/FilterBar";
import FilterBarSkeleton from "../components/FilterBarSkeleton";
import FullScreenLoader from "../components/ScreenLoader"; 

export default function SearchResultsPage(){
    const navigate = useNavigate();

    const [params] = useSearchParams();

    //Preload state
    const [initialLoading, setInitialLoading] = useState(true);

    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);

    const [sortOption, setSortOption] = useState<SortOption>("Relevance (Default)");

    const [histogram, setHistogram] = useState<Histogram | null>(null);

    const [priceMin, setPriceMin] = useState<number>(0);
    const [priceMax, setPriceMax] = useState<number>(Infinity);
    const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([]);
    const [selectedGuestRatings, setSelectedGuestRatings] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const [visibleCount, setVisibleCount] = useState(10);

    const destination_id = params.get('destination_id') || ''; 
    const checkin = params.get('checkin') || '';
    const checkout = params.get('checkout') || '';
    const guests = params.get('guests') || '';
    const rooms = guests.split('|').length;
    const adults = parseInt(params.get('adults') || '');
    const children = parseInt(params.get('children') || '');
    const term = params.get("term") || '';

    const shouldFetch = destination_id && checkin && checkout && guests;


    const fetchHotels = useCallback(() => {
        if (!shouldFetch) return Promise.resolve([]);
        return searchHotels({ destination_id, checkin, checkout, guests }).then(res => res.data);
    }, [destination_id, checkin, checkout, guests, shouldFetch]);

    const { data: hotels, loading, error } = usePollingFetch<Hotel[]>(
        fetchHotels,
        {
            maxRetries: 5,
            interval: 3000,
            skip: !shouldFetch
        }
    )

    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => {
                setInitialLoading(false);
            }, 2500); // small buffer to prevent flashing
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    useEffect(() => {
        if(hotels && hotels.length > 0){
            const hist = getPriceHistogram(hotels, 30);
            setHistogram(hist);
            setPriceMin(hist.min);
            setPriceMax(hist.max);
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
            selectedAmenities
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

    if (initialLoading) return <FullScreenLoader />;

    return (
        <div className="min-h-screen bg-gray-100 w-screen m-0 p-0 box-border">
            <header className="bg-[#003580] text-white sticky top-20 z-[1000] shadow-lg w-full">
                <div className="max-w-screen-xl mx-auto px-6 py-4 w-full">
                    <SearchBar
                        onSubmit={({ destination, checkin, checkout, guests, rooms, adults, children }) => {
                            setHistogram(null);
                            // setPriceMin(0);
                            // setPriceMax(Infinity);
                            // setSelectedStarRatings([]);
                            // setSelectedGuestRatings([]);
                            // setSelectedAmenities([]);
                            // setVisibleCount(10);
                            
                            navigate(`/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&adults=${adults}&children=${children}&rooms=${rooms}`);
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
                            children: children
                        }}
                    />
                </div>
            </header>


            <main className="w-full p-6 bg-gray-100 md:mt-5 md:p-4 sm:p-3 pt-24 md:pt-20">
                <div className="max-w-screen-xl mx-auto flex gap-6 items-start w-full flex-col md:flex-row md:gap-4 xl:max-w-none xl:px-10">
                    <aside className="w-full md:w-80 md:flex-shrink-0 bg-white rounded-lg p-5 shadow-sm sticky md:top-48 md:max-h-[calc(100vh-12rem)] md:overflow-y-auto border border-gray-200 order-2 md:order-1 md:p-4">
                        {loading && (
                            <FilterBarSkeleton />
                        )}
                        {hotels && hotels.length > 0 && (
                            <FilterBar
                                hotels={hotels}
                                rooms={rooms}
                                histogram={histogram}
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
                            />
                        )}
                    </aside>


                    <section className="flex-1 min-w-0 order-1 md:order-2">
                        {loading && (
                            <div className="space-y-4">
                                <div className="mb-5 pb-4 border-b border-gray-200">
                                    <div className="w-48 h-8 bg-gray-200 rounded shimmer"></div>
                                </div>
                                
                                <ul className="list-none p-0 m-0 flex flex-col gap-4">
                                    {[...Array(6)].map((_, index) => (
                                        <HotelCardSkeleton key={index} />
                                    ))}
                                </ul>
                            </div>
                        )}

                        {error && (
                            <p className="text-center py-15 px-5 text-red-700 bg-red-50 rounded-lg border border-red-200">
                                {error}
                            </p>
                        )}
                        
                        {!loading && hotels && displayedHotels.length === 0 && (
                            <p className="text-center py-15 px-5 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                                No hotels match your criteria.
                            </p>
                        )}

                        {!loading && displayedHotels.length > 0 && (
                            <>
                                <div className="mb-5 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between flex-wrap gap-4 flex-col md:flex-row md:gap-3 items-start md:items-center">
                                        <h2 className="m-0 text-2xl font-medium text-gray-800 md:text-xl">
                                            Found {displayedHotels.length} hotels
                                        </h2>
                                        

                                        <div className="flex items-center gap-2 min-w-[220px] w-full md:w-auto md:min-w-auto">
                                            <label htmlFor="sort-select" className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                                Sort by:
                                            </label>
                                            <select
                                                id="sort-select"
                                                value={sortOption}
                                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-white text-sm text-gray-800 cursor-pointer transition-colors duration-200 ease-in-out hover:border-[#003580] focus:outline-none focus:border-[#003580] focus:shadow-[0_0_0_2px_rgba(0,53,128,0.1)]"
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
                                    </div>
                                </div>
                                
                                <ul className="list-none p-0 m-0 flex flex-col gap-4">
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
                                                term
                                            }}
                                        />
                                    ))}
                                </ul>

                                {visibleCount < displayedHotels.length && (
                                    <div className="text-center mt-8 p-5">
                                        <button 
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