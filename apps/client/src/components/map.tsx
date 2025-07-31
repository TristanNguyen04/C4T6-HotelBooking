// src/pages/GoogleMapPage.tsx
import { useEffect, useMemo, useState, type SetStateAction } from "react";
import "../styles/map.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { APIProvider, Map as Gmap, AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import type { Destination, SearchContext } from "../types/hotel";
import HotelInfoWindow from "../components/mapCard";
import {searchHotelwithDest, searchDestinationNearby} from '../api/hotels';
import type {Hotel} from "../types/hotel";

function zoomToRadius(zoomNo: number): number{
  const zoomRadiusMap: {[key:number]:number} = {
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

const calculateDistance = (lat1: number, lng1: number , lat2: number, lng2: number) => {
  const EARTH_RADIUS_KM = 6371;
  const toRadian = (degrees:number) => degrees * Math.PI / 180 ;
  const dLat = toRadian(lat2 - lat1);
  const dLng = toRadian(lng2 - lng1);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
  Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a) , Math.sqrt(1-a));
  return EARTH_RADIUS_KM * c;
};

type positionParam = {
  position: {
  lat: number,
  lng: number,
  }
}
export default function GoogleMapPage({position}:positionParam) {
  const [center , setCenter] = useState({ lat: position.lat, lng: position.lng });
  const [zoom , setZoom] = useState(18);
  const [selectedHotelId , setSelectedHotelId] = useState<string | null> (null);
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [lastFetch, setLastFetch] = useState<{lat: number, lng:number} | null>(null);
  const [debounce,setDebounce] = useState(center);
  const [searchParams] = useSearchParams();

const searchContext: SearchContext | null = useMemo(() => {
  if (!searchParams.get('destination_id')) return null;

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
      ? searchParams.get('childrenAges')!.split(',').map(Number)
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
    if (lastFetch && calculateDistance(center.lat, center.lng, lastFetch.lat, lastFetch.lng) < radiusKm / 2) {return;}
    fetchNearbyDestination(center.lat, center.lng, radiusKm, searchContext).then(data => {
      if(!data)return;
      const hotelsData = (data as any).hotelsData;
      const destinations = {...data} as Destination;
      const hotelWithRadius = hotelsData.filter((hotel: any) => {
      const lat = hotel.latitude;
      const lng = hotel.longitude;
      return calculateDistance(center.lat, center.lng, lat, lng) <= radiusKm;
      })

      const uniqueHotelsMap = new Map<string, Hotel>();

      hotelWithRadius.forEach((hotel: Hotel) => {
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
      setHotels(uniqueHotels as Hotel[]);
      setDestinations([destinations]);
      setLastFetch(debounce);
    });
  }, [debounce,zoom]);


    async function fetchNearbyDestination(lat: number, lng:number, radius: number , searchCtx: SearchContext | null){
    try{
      // use api to fetch for destinations using lat, lng, radius
      const res = await searchDestinationNearby({
        lat: String(lat),
        lng: String(lng),
        radius: String(radius),
      });
      console.log("res.data" , res.data);
      const destinations: Destination[] = res.data;
      if(destinations.length === 0) return null;
      const firstDest = destinations[0]!;
      try{
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
      catch{
        return { ...firstDest, hotels: [] };
      }
    }
    catch{
      return [];
    }
  };
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
      <div style={{ height: "80vh", width: "100vw", overflow: "visible" }}>
        <Gmap
          center={center}
          zoom={zoom}
          mapId={import.meta.env.VITE_MAP_ID}
          onZoomChanged={(e: { detail: { zoom: SetStateAction<number>; }; })=> setZoom(e.detail.zoom)}
          onCenterChanged={(e: { detail: { center: any; }; })=> {
            const newCenter=e.detail.center;
            setCenter({lat: newCenter.lat , lng: newCenter.lng})
          }}
          mapOptions={{
            gestureHandling: "greedy",
            scrollwheel: true,
            zoomControl: true,
            disableDefaultUI: false,
            draggable: true,
          }}
          style={{ height: "100%", width: "100%" }}
        > 
        
          {/* Dynamically add hotel markers and pins */}
          {hotels.map((hotel) => {
            let background;
            if(hotel.rating <= 5){background = "green"}
            if(hotel.rating <= 4){background = "orange"}
            if(hotel.rating <= 3){background = "red"}
            return (
            <AdvancedMarker key={`${hotel.id}_${hotel.latitude}_${hotel.longitude}`}  position={{ lat: hotel.latitude, lng: hotel.longitude }} 
              onClick={()=> setSelectedHotelId(hotel.id)}>
              <Pin background={background} borderColor="orange" glyphColor="white" />
            </AdvancedMarker>
          )})};
          {/* Map the info window to the markers and the info window at the hotel position */}
          {selectedHotelId !== null && (() => {
            const hotel = hotels.find(h => h.id === selectedHotelId);
            if(!hotel){return};
            return hotel ? (
              <HotelInfoWindow
                hotel={hotel}
                onClose={() => setSelectedHotelId(null)}
              />
            ) : null;
          })()}
        </Gmap>
      </div>
    </APIProvider>
  );
}
