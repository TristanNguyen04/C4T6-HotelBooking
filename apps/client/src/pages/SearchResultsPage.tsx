import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { searchHotels } from "../api/hotels";
import type { Hotel, SortBy, SortOrder } from "../types/hotel";
import Spinner from '../components/Spinner/Spinner';
import { getPriceHistogram } from "../utils/histogram";
import SearchBar from "../components/SearchBar/SearchBar";

export default function SearchResultsPage(){
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [hotels, setHotels] = useState<any[]>([]);
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>("searchRank");
    const [sortOrder, setSortOrder] = useState<''|'asc'|'desc'>('asc');
    const [histogram, setHistogram] = useState<{bins: number[], min: Number, max: number} | null>(null);

    const [priceMin, setPriceMin] = useState<number>(0);
    const [priceMax, setPriceMax] = useState<number>(Infinity);
    const [minStars, setMinStars] = useState<number | ''>('');

    useEffect(() => {
        const destination_id = params.get('destination_id');
        const checkin = params.get('checkin');
        const checkout = params.get('checkout');
        const guests = params.get('guests');

        if(destination_id && checkin && checkout && guests){
            setLoading(true);
            setError(null);
            searchHotels( {destination_id, checkin, checkout, guests} )
                .then(res => {
                    setHotels(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setHotels([])
                    setError("Failed to load hotels.");
                    setLoading(false);
                });
        }
    }, [params])

    useEffect(() => {
        if(hotels.length > 0){
            const hist = getPriceHistogram(hotels);
            setHistogram(hist);

            if(priceMin === 0) setPriceMin(hist.min);
            if(priceMax === Infinity) setPriceMax(hist.max);
        }
    }, [hotels]);

    useEffect(() => {
        const filtered = hotels.filter((hotel) => {
            const price = hotel.price ?? Infinity;
            const rating = hotel.rating ?? 0;

            const withinMin = priceMin === 0 || price >= priceMin;
            const withinMax = priceMax === Infinity || price <= priceMax;
            const meetsStars = minStars === '' || rating >= minStars;

            return withinMin && withinMax && meetsStars;
        });

        const sorted = [...filtered].sort((a, b) => {
            const getValue = (hotel: Hotel): number => {
                switch(sortBy){
                    case "price":
                        return hotel.price ?? Infinity;
                    case "distance":
                        return hotel.distance ?? Infinity;
                    case "rating":
                        return hotel.rating ?? Infinity;
                    case "searchRank":
                        return hotel.searchRank ?? Infinity;
                };
            }

            const aVal = getValue(a);
            const bVal = getValue(b);

            return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        });

        setDisplayedHotels(sorted);
    }, [hotels, sortBy, sortOrder, priceMin, priceMax, minStars]);

    return (
        <div>
            <h2>Hotel Results</h2>
            {loading && (
                <>
                    <Spinner />
                    <p style={{ textAlign: 'center'}}>Fetching hotel results...</p>
                </>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

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

            {!loading && hotels.length > 0 && (
                <>
                    {histogram && (
                        <div style={{ width: '100%', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '80px', gap: '4px', marginBottom: '8px' }}>
                                {histogram.bins.map((count, i) => {
                                    const maxCount = Math.max(...histogram.bins);
                                    const height = (count / maxCount) * 100;
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                flex: 1,
                                                height: `${height}%`,
                                                backgroundColor: '#4a90e2',
                                                borderRadius: '2px'
                                            }}
                                            title={`${count} hotels`}
                                        />
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="range"
                                    min={histogram.min.toString()}
                                    max={histogram.max.toString()}
                                    step={1}
                                    value={priceMin === 0 ? histogram.min.toString() : priceMin.toString()}
                                    onChange={e => {
                                        const val = parseFloat(e.target.value);
                                        if (val <= Number(priceMax || histogram?.max)) setPriceMin(val);
                                    }}
                                    style={{ flex: 1 }}
                                />
                                <input
                                    type="range"
                                    min={histogram.min.toString()}
                                    max={histogram.max.toString()}
                                    step={1}
                                    value={priceMax === Infinity ? histogram.max.toString() : priceMax.toString()}
                                    onChange={e => {
                                        const val = parseFloat(e.target.value);
                                        if (val >= Number(priceMin || histogram?.min)) setPriceMax(val);
                                    }}
                                    style={{ flex: 1 }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <span>{Math.floor(Number(histogram.min))}</span>
                                <span>{Math.ceil(histogram.max)}</span>
                            </div>
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: "1rem" }}>
                        <div>
                            <label>
                                Sort by:&nbsp;
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                                >
                                    <option value="price">Price</option>
                                    <option value="distance">Distance</option>
                                    <option value="rating">Hotel Stars</option>
                                    <option value="searchRank">Relevance (Default)</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Order:&nbsp;
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                                >
                                    <option value="asc">Asc ↑</option>
                                    <option value="desc">Desc ↓</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>Price Min:&nbsp;
                                <input
                                    type="number"
                                    min={0}
                                    value={priceMin}
                                    onChange={e => setPriceMin(e.target.value ? parseFloat(e.target.value) : 0)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>Price Max:&nbsp;
                                <input
                                    type="number"
                                    min={0}
                                    value={priceMax}
                                    onChange={e => setPriceMax(e.target.value ? parseFloat(e.target.value) : Infinity)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>Minimum Stars:&nbsp;
                                <input
                                    type="number"
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    value={minStars}
                                    onChange={e => setMinStars(e.target.value ? parseFloat(e.target.value) : '')}
                                />
                            </label>
                        </div>
                    </div>
                </>
            )}

            {!loading && displayedHotels.length === 0 && (
                <p>No hotels match your criteria.</p>
            )}

            {!loading && displayedHotels.length > 0 && (
                <ul>
                    {displayedHotels.map(h => (
                        <li key={h.id} style={{ marginBottom: "1rem" }}>
                            <h4>{h.name}</h4>
                            <p>{h.address}</p>
                            <p>Price: {h.currency} {h.price ?? "N/A"}</p>
                            <p>Stars: {h.rating ?? "N/A"}</p>
                            <p>Distance: {h.distance ? (h.distance / 1000).toFixed(1) + " km" : "N/A"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}