import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { searchHotels } from "../../api/hotels";
import type { SortOption, Hotel } from "../../types/hotel";
import Spinner from '../../components/Spinner/Spinner';
import { getPriceHistogram } from "../../utils/histogram";
import SearchBar from "../../components/SearchBar";
import HotelCard from "../../components/HotelCard";
import { usePollingFetch } from "../../hooks/usePollingFetch";
import { useHotelFilter } from "../../hooks/useHotelFilter";
import { useHotelSort } from "../../hooks/useHotelSort";
import FilterBar from "../../components/FilterBar/FilterBar";
import './SearchResultsPage.css';

export default function SearchResultsPage(){
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);

    const [sortOption, setSortOption] = useState<SortOption>("Relevance (Default)");

    const [histogram, setHistogram] = useState<{bins: number[], min: number, max: number} | null>(null);

    const [priceMin, setPriceMin] = useState<number>(0);
    const [priceMax, setPriceMax] = useState<number>(Infinity);
    const [minStars, setMinStars] = useState<number | ''>('');

    const [visibleCount, setVisibleCount] = useState(10);

    const destination_id = params.get('destination_id') || ''; 
    const checkin = params.get('checkin') || '';
    const checkout = params.get('checkout') || '';
    const guests = params.get('guests') || '';

    const shouldFetch = destination_id && checkin && checkout && guests;

    const fetchHotels = useCallback(
        () => searchHotels({ destination_id, checkin, checkout, guests }).then(res => res.data),
        [destination_id, checkin, checkout, guests]
    );

    const { data: hotels, loading, error } = usePollingFetch<Hotel[]>(
        fetchHotels,
        {
            maxRetries: 5,
            interval: 3000,
            skip: !shouldFetch
        }
    )

    useEffect(() => {
        if(hotels && hotels.length > 0){
            const hist = getPriceHistogram(hotels);
            setHistogram(hist);

            if(priceMin === 0) setPriceMin(hist.min);
            if(priceMax === Infinity) setPriceMax(hist.max);
        }
    }, [hotels]);

    const filteredHotels = useHotelFilter(
        {
            hotels: hotels ?? [],
            priceMin,
            priceMax,
            minStars
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
        <div className="search-page">
            {/* Header with search bar */}
            <header className="search-header">
                <div className="search-header-content">
                    <SearchBar
                        onSubmit={({ destination, checkin, checkout, guests }) => {
                            navigate(`/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`);
                        }}

                        initialValues={{
                            destination: {
                                uid: params.get('destination_id') || '',
                                term: params.get('term') || ''
                            },
                            checkin: params.get('checkin') || '',
                            checkout: params.get('checkout') || '',
                            guests: params.get('guests') || '2'
                        }}
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="main-content">
                <div className="content-container">
                    {/* Filter sidebar */}
                    <aside className="filter-sidebar">
                        {hotels && hotels.length > 0 && (
                            <FilterBar
                                histogram={histogram}
                                sortOption={sortOption}
                                setSortOption={setSortOption}
                                priceMin={priceMin}
                                setPriceMin={setPriceMin}
                                priceMax={priceMax}
                                setPriceMax={setPriceMax}
                                minStars={minStars}
                                setMinStars={setMinStars}
                            />
                        )}
                    </aside>

                    {/* Hotel results */}
                    <section className="results-section">
                        {loading && (
                            <div className="loading">
                                <Spinner />
                                <p>Fetching hotel results...</p>
                            </div>
                        )}

                        {error && <p className="error">{error}</p>}
                        
                        {!loading && hotels && displayedHotels.length === 0 && (
                            <p className="empty">No hotels match your criteria.</p>
                        )}

                        {!loading && displayedHotels.length > 0 && (
                            <>
                                <div className="results-header">
                                    <h2>Found {displayedHotels.length} hotels</h2>
                                </div>
                                <ul className="hotel-list">
                                    {displayedHotels.slice(0, visibleCount).map(h => (
                                        <HotelCard
                                            key={h.id}
                                            hotel={h}
                                            destination_id={params.get('destination_id') || ''}
                                            checkin={params.get('checkin') || ''}
                                            checkout={params.get('checkout') || ''}
                                            guests={params.get('guests') || '2'}
                                        />
                                    ))}
                                </ul>

                                {visibleCount < displayedHotels.length && (
                                    <div className="load-more-container">
                                        <button 
                                            className="load-more-btn"
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