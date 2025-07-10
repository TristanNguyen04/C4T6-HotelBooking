import React from 'react';
import type { Hotel } from '../../types/hotel';
import { useNavigate } from 'react-router-dom';

interface HotelCardProps {
    hotel: Hotel;
    destination_id: string;
    checkin: string;
    checkout: string;
    guests: string;
}

export default function HotelCard({ 
    hotel,
    destination_id,
    checkin,
    checkout,
    guests
}: HotelCardProps){
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(
            `/hotels/${hotel.id}/details?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`
        )
    };
        
    return (
        <li style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h4>{hotel.name}</h4>
            <p>{hotel.address}</p>
            <p>Price: {hotel.currency} {hotel.price ?? 'N/A'}</p>
            <p>Stars: {hotel.rating ?? 'N/A'}</p>
            <p>Distance: {hotel.distance ? (hotel.distance / 1000).toFixed(1) + " km" : 'N/A'}</p>
            <button onClick={handleViewDetails}>View Details</button>
        </li>
    )
}