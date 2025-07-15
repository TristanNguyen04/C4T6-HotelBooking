import { useEffect, useState, type SetStateAction } from "react";
import "../styles/map.css";
import { APIProvider, Map as Gmap, AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";

type HotelInfoWindowProps = {
  lat: number;
  lng: number;
  name: string;
  address: string;
  rating: number;
  imageUrl?: string;
  onClose: () => void;
};


export default function HotelInfoWindow({ lat, lng, name, address, rating, imageUrl, onClose }: HotelInfoWindowProps) {
  return (
    <InfoWindow position={{ lat, lng }} onCloseClick={onClose}>
      <div style={{ fontSize: "14px", maxWidth: "200px" }}>
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{name}</div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
          />
        )}
        <div style={{fontWeight: "bold" , marginBottom:"7px"}}>{address}</div>
        <div style={{fontWeight: "bold" , marginBottom:"7px"}}>{rating}</div>
      </div>
    </InfoWindow>
  );
}