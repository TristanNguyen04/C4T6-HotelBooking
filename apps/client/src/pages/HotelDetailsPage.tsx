import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { searchHotelDetails } from '../api/hotels';

export default function HotelDetailsPage(){
    const { id } = useParams();
    const [params] = useSearchParams();

    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const destination_id = params.get("destination_id");
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");
    const guests = params.get("guests");

    useEffect(() => {
        if(!id || !destination_id || !checkin || !checkout || !guests){
            setError('Missing query parameters.');
            setLoading(false);
            return;
        }

        setLoading(true);
        searchHotelDetails(id, { destination_id, checkin, checkout, guests} )
            .then(res => {
                setHotel(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load hotel details.');
                setLoading(false);
            })
    }, [id, destination_id, checkin, checkout, guests]);

    if(loading) return (
        <div style={{ textAlign: 'center' }}>
            <Spinner/>
            <p>Loading hotel details...</p>
        </div>
    );

    if(error) return <p style={{ color: 'red' }}>{error}</p>;

    if(!hotel) return null;

    return (
        <div>
            <h2>{hotel.name}</h2>
            <p>{hotel.address}</p>
            <p>Rating: {hotel.rating ?? 'N/A'} stars</p>
            <p>Price: {hotel.currency} {hotel.price ?? 'N/A'}</p>
            <p>Distance to center: {hotel.distance ? (hotel.distance / 1000).toFixed(1) + ' km' : 'N/A'}</p>
            <p>Description: {hotel.description ?? 'No description available.'}</p>
            {/* TODO: add images, amenities, map, */}
            {/* TODO: add all room types */}
        </div>
    );
}
