import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/GoogleMapPage.tsx
import { useEffect, useMemo, useState } from "react";
import "../styles/map.css";
import { useSearchParams } from "react-router-dom";
import { APIProvider, Map as Gmap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import HotelInfoWindow from "../components/mapCard";
import { searchHotelwithDest, searchDestinationNearby } from '../api/hotels';
function zoomToRadius(zoomNo) {
    const zoomRadiusMap = {
        21: 1,
        20: 1,
        19: 1,
        18: 1,
        17: 1,
        16: 2,
        15: 2,
        14: 2,
        13: 3,
        12: 3,
        11: 3,
        10: 3,
    };
    return zoomRadiusMap[Math.round(zoomNo)] || 5;
}
// fetch from destinationController based on radius
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const EARTH_RADIUS_KM = 6371;
    const toRadian = (degrees) => degrees * Math.PI / 180;
    const dLat = toRadian(lat2 - lat1);
    const dLng = toRadian(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c;
};
export default function GoogleMapPage({ position }) {
    const [center, setCenter] = useState({ lat: position.lat, lng: position.lng });
    const [zoom, setZoom] = useState(18);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [hotels, setHotels] = useState([]);
    // const [destinations, setDestinations] = useState<Destination[]>([]);
    const [lastFetch, setLastFetch] = useState(null);
    const [debounce, setDebounce] = useState(center);
    const [searchParams] = useSearchParams();
    const searchContext = useMemo(() => {
        if (!searchParams.get('destination_id'))
            return null;
        return {
            destination_id: searchParams.get('destination_id') || '',
            checkin: searchParams.get('checkin') || '',
            checkout: searchParams.get('checkout') || '',
            guests: searchParams.get('guests') || '',
            rooms: parseInt(searchParams.get('rooms') || '1'),
            adults: parseInt(searchParams.get('adults') || '2'),
            children: parseInt(searchParams.get('children') || '0'),
            term: searchParams.get('term') || '',
            childrenAges: searchParams.get('childrenAges')
                ? searchParams.get('childrenAges').split(',').map(Number)
                : [],
        };
    }, [searchParams]);
    useEffect(() => {
        // this effect sets timeout when center changes
        const handler = setTimeout(() => {
            setDebounce(center);
        }, 500);
        return () => clearTimeout(handler);
    }, [center]);
    useEffect(() => {
        // this effect is used for calling api to fetch hotels and filtering based on the radius.
        // dependency array is based on debounce timeout and zoom
        const radiusKm = zoomToRadius(zoom);
        if (lastFetch && calculateDistance(center.lat, center.lng, lastFetch.lat, lastFetch.lng) < radiusKm / 2) {
            return;
        }
        fetchNearbyDestination(center.lat, center.lng, radiusKm, searchContext).then(data => {
            if (!data)
                return;
            const hotelsData = data.hotelsData;
            //const destinations = {...data} as Destination;
            const hotelWithRadius = hotelsData.filter((hotel) => {
                const lat = hotel.latitude;
                const lng = hotel.longitude;
                return calculateDistance(center.lat, center.lng, lat, lng) <= radiusKm;
            });
            const uniqueHotelsMap = new Map();
            hotelWithRadius.forEach((hotel) => {
                const key = `${hotel.id}_${hotel.latitude}_${hotel.longitude}`;
                if (!uniqueHotelsMap.has(key)) {
                    uniqueHotelsMap.set(key, {
                        ...hotel,
                        image_details: hotel.image_details,
                        latitude: hotel.latitude,
                        longitude: hotel.longitude,
                    });
                }
            });
            const uniqueHotels = Array.from(uniqueHotelsMap.values());
            setHotels(uniqueHotels);
            // setDestinations([destinations]);
            setLastFetch(debounce);
        });
    }, [debounce, zoom]);
    async function fetchNearbyDestination(lat, lng, radius, searchCtx) {
        try {
            // use api to fetch for destinations using lat, lng, radius
            const res = await searchDestinationNearby({
                lat: String(lat),
                lng: String(lng),
                radius: String(radius),
            });
            console.log("res.data", res.data);
            const destinations = res.data;
            if (destinations.length === 0)
                return null;
            const firstDest = destinations[0];
            try {
                // use first destination for rendering only
                const hotelRes = await searchHotelwithDest({
                    destination_id: searchCtx?.destination_id || firstDest.uid,
                    checkin: searchCtx?.checkin || '2025-08-01',
                    checkout: searchCtx?.checkout || '2025-08-10',
                    guests: searchCtx?.guests || '1',
                });
                const hotelsData = await hotelRes.data;
                return { ...firstDest, hotelsData };
            }
            catch {
                return { ...firstDest, hotels: [] };
            }
        }
        catch {
            return [];
        }
    }
    ;
    return (_jsx(APIProvider, { apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY, children: _jsx("div", { style: { height: "80vh", width: "100vw", overflow: "visible" }, children: _jsxs(Gmap, { center: center, zoom: zoom, mapId: import.meta.env.VITE_MAP_ID, onZoomChanged: (e) => setZoom(e.detail.zoom), onCenterChanged: (e) => {
                    const newCenter = e.detail.center;
                    setCenter({ lat: newCenter.lat, lng: newCenter.lng });
                }, gestureHandling: "greedy", scrollwheel: true, zoomControl: true, disableDefaultUI: false, draggable: true, style: { height: "100%", width: "100%" }, children: [hotels.map((hotel) => {
                        let background;
                        if (hotel.rating <= 5) {
                            background = "green";
                        }
                        if (hotel.rating <= 4) {
                            background = "orange";
                        }
                        if (hotel.rating <= 3) {
                            background = "red";
                        }
                        return (_jsx(AdvancedMarker, { position: { lat: hotel.latitude, lng: hotel.longitude }, onClick: () => setSelectedHotelId(hotel.id), children: _jsx(Pin, { background: background, borderColor: "orange", glyphColor: "white" }) }, `${hotel.id}_${hotel.latitude}_${hotel.longitude}`));
                    }), selectedHotelId !== null && (() => {
                        const hotel = hotels.find(h => h.id === selectedHotelId);
                        if (!hotel) {
                            return;
                        }
                        return hotel ? (_jsx(HotelInfoWindow, { hotel: hotel, onClose: () => setSelectedHotelId(null) })) : null;
                    })()] }) }) }));
}
