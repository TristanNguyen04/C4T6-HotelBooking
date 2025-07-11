import React from 'react';
import { Tooltip } from 'react-tooltip';
import type { Hotel } from '../../types/hotel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface HotelCardProps {
    hotel: Hotel;
    destination_id: string;
    checkin: string;
    checkout: string;
    guests: string;
}


const formatAmenityName = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

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

    const [imgSrc, setImgSrc] = useState(
        hotel.image_details
            ? `${hotel.image_details.prefix}${hotel.image_details.count}${hotel.image_details.suffix}`
            : 'fallback.webp'
    )

    const handleImgError = () => {
        setImgSrc('fallback.webp');
    }
    

    const amenityKeys = Object.entries(hotel.amenities || {})
        .filter(([_, value]) => value === true)
        .map(([key]) => key);

    const previewAmenities = amenityKeys.slice(0, 3);
    const extraAmenityCount = amenityKeys.length - previewAmenities.length;

    const tooltipContent = amenityKeys
        .map(formatAmenityName)
        .join(', ');
        
    return (
        <li style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <img 
                src={imgSrc} 
                alt={hotel.name}
                onError={handleImgError}
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.5rem' }}
            />
            <h4>{hotel.name}</h4>
            <p>{hotel.address}</p>
            <p>Price: {hotel.currency} {hotel.price ?? 'N/A'}</p>
            <p>Stars: {hotel.rating ?? 'N/A'}</p>
            <p>Distance: {hotel.distance ? (hotel.distance / 1000).toFixed(1) + " km" : 'N/A'}</p>

            {amenityKeys.length > 0 && (
                <>
                    <p
                        data-tooltip-id={`tooltip-${hotel.id}`}
                        data-tooltip-content={tooltipContent}
                        style={{ cursor: 'help' }}
                    >
                        Amenities:&nbsp;
                        {previewAmenities.map((key, idx) => (
                            <span key={key}>
                            {formatAmenityName(key)}{idx < previewAmenities.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                        {extraAmenityCount > 0 && (
                            <span style={{ color: '#888' }}>
                            &nbsp;+{extraAmenityCount}
                            </span>
                        )}
                    </p>

                    <Tooltip id={`tooltip-${hotel.id}`} place="top" />
                </>
            )}

            <button onClick={handleViewDetails}>View Details</button>
        </li>
    )
}