// src/pages/GoogleMapPage.tsx
import { useEffect, useState, type SetStateAction } from "react";
import "../styles/map.css";
import { APIProvider, Map as Gmap, AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import type { Destination } from "../../../server/src/models/Destination";
import HotelInfoWindow from "../components/mapCard";
import luggageFallback from "../assets/luggage.png";
import {searchHotelwithDest, searchDestinationNearby} from '../api/hotels';

type hotel = {
  id: number;
  name: string;
  address: string;
  rating: number;
  imageUrl: {
    prefix: string;
    suffix: string;
    count: number;
  };
  default_image_index: number;
  position: {
    lat: number;
    lng: number;
  };
};

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
async function fetchNearbyDestination(lat: number, lng:number, radius: number){
  try{
    // this is fetching the current lat lng and radius
    const res = await searchDestinationNearby({
      lat: String(lat),
      lng: String(lng),
      radius: String(radius),
    });
    console.log("res.data" , res.data);
    const destinations: Destination[] = await res.data;
    if(destinations.length === 0) return null;
    const firstDest = destinations[0]!;
    try{
      const hotelRes = await searchHotelwithDest(firstDest.uid);
      const hotelsData = await hotelRes.data;
      return { ...firstDest, hotelsData };
    }
    catch{
      return { ...firstDest, hotels: [] };
    }
  }
  catch{
    console.log("die")
    return [];
  }
};

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

export default function GoogleMapPage() {
  const [center , setCenter] = useState({ lat: 1.2800945, lng: 103.8509491 });
  const [zoom , setZoom] = useState(18);
  const [selectedHotelId , setSelectedHotelId] = useState<number | null> (null);
  const [hotels, setHotels] = useState<hotel[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [lastFetch, setLastFetch] = useState<{lat: number, lng:number} | null>(null);
  const [debounce,setDebounce] = useState(center);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(center);
    }, 500); // Delay time
  
    return () => clearTimeout(handler); // Clear timeout if center changes
  }, [center]);

  useEffect(() => {
    const radiusKm = zoomToRadius(zoom);
    if (lastFetch && calculateDistance(center.lat, center.lng, lastFetch.lat, lastFetch.lng) < radiusKm / 2) {return;}
    fetchNearbyDestination(center.lat, center.lng, radiusKm).then(data => {
      if(!data)return;
      const hotelsData = (data as any).hotelsData;
      const destinations = {...data} as Destination;
      const hotelWithRadius = hotelsData.filter((hotel: any) => {
      const lat = hotel.latitude;
      const lng = hotel.longitude;
      return calculateDistance(center.lat, center.lng, lat, lng) <= radiusKm;
      })

      const uniqueHotelsMap = new Map<string, hotel>();

      hotelWithRadius.forEach((hotel: any) => {
        const key = `${hotel.id}_${hotel.latitude}_${hotel.longitude}`;
        if (!uniqueHotelsMap.has(key)) {
          uniqueHotelsMap.set(key, {
            ...hotel,
            position: { lat: hotel.latitude, lng: hotel.longitude },
          });
        }
      });

      const uniqueHotels = Array.from(uniqueHotelsMap.values());
      setHotels(uniqueHotels as hotel[]);
      setDestinations([destinations]);
      setLastFetch(debounce);
    });
  }, [debounce,zoom]);
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
            <AdvancedMarker key={`${hotel.id}_${hotel.position.lat}_${hotel.position.lng}`}  position={hotel.position} onClick={()=> setSelectedHotelId(hotel.id)}>
              <Pin background={background} borderColor="orange" glyphColor="white" />
            </AdvancedMarker>
          )})};
          {/* Map the info window to the markers and the info window at the hotel position */}
          {selectedHotelId !== null && (() => {
            const hotel = hotels.find(h => h.id === selectedHotelId);
            if(!hotel){return};
            const imageUrl = hotel.imageUrl && calculateDistance(center.lat,center.lng,hotel.position.lat, hotel.position.lng) <= 2 && hotel.default_image_index !== undefined
            ? `${hotel.imageUrl.prefix}${hotel.default_image_index}${hotel.imageUrl.suffix}`
            : luggageFallback;

            return hotel ? (
              <HotelInfoWindow
                lat={hotel.position.lat}
                lng={hotel.position.lng}
                name={hotel.name}
                address={hotel.address}
                rating={hotel.rating}
                imageUrl={imageUrl}
                onClose={() => setSelectedHotelId(null)}
              />
            ) : null;
          })()}
        </Gmap>
      </div>
    </APIProvider>
  );
}
