// src/pages/GoogleMapPage.tsx
import { useState, type SetStateAction } from "react";
import "../styles/map.css";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function GoogleMapPage() {
  const position = { lat: 53.53, lng: 10 };
  const [center , setCenter] = useState({ lat: 53.53, lng: 10 });
  const [zoom , setZoom] = useState(10);
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}>
      <div style={{ height: "100vh", width: "100vw", overflow: "visible" }}>
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
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}
