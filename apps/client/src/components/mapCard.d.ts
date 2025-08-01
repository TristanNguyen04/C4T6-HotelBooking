import "../styles/map.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { Hotel } from "../types/hotel";
type HotelInfoWindowProps = {
    hotel: Hotel;
    onClose: () => void;
};
export default function HotelInfoWindow({ hotel, onClose }: HotelInfoWindowProps): import("react/jsx-runtime").JSX.Element;
export {};
