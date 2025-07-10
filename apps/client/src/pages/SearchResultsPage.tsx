import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchHotels } from "../api/hotels";
import type { Hotel, SortBy, SortOrder } from "../types/hotel";
import Spinner from '../components/Spinner/Spinner';

export default function SearchResultsPage(){
    const [params] = useSearchParams();
    const [hotels, setHotels] = useState<any[]>([]);
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>("searchRank");
    const [sortOrder, setSortOrder] = useState<''|'asc'|'desc'>('asc');

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
        const sorted = [...hotels].sort((a, b) => {
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
    }, [hotels, sortBy, sortOrder]);

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

            {!loading && hotels.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
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
                    &nbsp;&nbsp;
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
            )}

            {!loading && displayedHotels.length === 0 && <p>No hotels found.</p>}

            {!loading && displayedHotels.length > 0 && (
                <ul>
                    {displayedHotels.map(h => (
                        <li key={h.id}>
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