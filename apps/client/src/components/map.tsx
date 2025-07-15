// src/pages/GoogleMapPage.tsx
import { useEffect, useState, type SetStateAction } from "react";
import "../styles/map.css";
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import type { Destination } from "../../../server/src/models/Destination";

type hotel = {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
};


// fetch from destinationController based on radius
async function fetchNearbyDestination(lat: number, lng:number, radius: number){
  try{
    // this is fetching the current lat lng and range (can use zoom score)
    const res = await fetch(`http://localhost:3000/api/hotels/00Qh/details/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    // const res = await fetch(`http://localhost:3000/api/hotels/9jx5/basic-details`);
    const data = await res.json();
    console.log(data);
    return data;
  }
  catch{
    console.log("die")
    return [];
  }
};

export default function GoogleMapPage() {
  // This center should be mapped to the hotel position from the hotel details page
  // center and zoom will be used for mapping the current location of the map
  // when zooming in , 
  const [center , setCenter] = useState({ lat: 53.54, lng: 10.01 });
  // use zoom to calculate dynamically the radius we want to query from the destinations.json using lat lng
  // using the destinations code that is queried, we want to query from the api to retrieve all the hotels in each destination code
  // from the destination code, 
  // 
  const [zoom , setZoom] = useState(18);
  const [selectedHotelId , setSelectedHotelId] = useState<number | null> (null);
  const [hotels, setHotels] = useState<hotel[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const radius = 40 / zoom;
    fetchNearbyDestination(center.lat, center.lng, radius).then(data => {
      console.log("Destinations from backend:", data);
      setDestinations(data);
    });
  }, [center,zoom]);
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
      <div style={{ height: "80vh", width: "100vw", overflow: "visible" }}>
        <Map
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
          {hotels.map((hotel) => (
            <AdvancedMarker key={hotel.id}  position={hotel.position} onClick={()=> setSelectedHotelId(hotel.id)}>
              <Pin background="orange" borderColor="orange" glyphColor="white" />
            </AdvancedMarker>
          ))}
          {/* Map the info window to the markers and the info window at the hotel position */}
          {selectedHotelId !== null && (
            <InfoWindow position={hotels.find((h)=> h.id === selectedHotelId)?.position || center}
              onCloseClick={()=>setSelectedHotelId(null)}>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
