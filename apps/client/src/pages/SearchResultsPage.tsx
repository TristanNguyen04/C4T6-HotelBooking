import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchHotels } from "../api/hotels";
import Spinner from '../components/Spinner/Spinner';

export default function SearchResultsPage(){
    const [params] = useSearchParams();
    const [hotels, setHotels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

            {!loading && hotels.length === 0 && <p>No hotels found.</p>}
            
            {!loading && hotels.length > 0 && (
                <ul>
                    {hotels.map(h => (
                        <li key={h.id}>
                            <h4>{h.name}</h4>
                            <p>{h.address}</p>
                            <p>{h.currency} {h.price ?? "N/A"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}