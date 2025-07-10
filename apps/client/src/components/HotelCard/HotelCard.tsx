import React from 'react';
import type { Hotel } from '../../types/hotel';

interface HotelCardProps {
    hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps){
    return (
        <li style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h4>{hotel.name}</h4>
            <p>{hotel.address}</p>
            <p>Price: {hotel.currency} {hotel.price ?? 'N/A'}</p>
            <p>Stars: {hotel.rating ?? 'N/A'}</p>
            <p>Distance: {hotel.distance ? (hotel.distance / 1000).toFixed(1) + " km" : 'N/A'}</p>
        </li>
    )
}