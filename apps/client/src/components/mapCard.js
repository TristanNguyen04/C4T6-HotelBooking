import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/map.css";
import { InfoWindow } from "@vis.gl/react-google-maps";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import default_hotel_image from "../assets/default_hotel_image.png";
import { useNavigate, useLocation } from "react-router-dom";
export default function HotelInfoWindow({ hotel, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigateToDetails = () => {
        const queryParams = location.search;
        navigate(`/hotels/${hotel.id}/details${queryParams}`);
    };
    return (_jsx(InfoWindow, { position: { lat: hotel.latitude, lng: hotel.longitude }, onCloseClick: onClose, children: _jsxs("div", { style: { width: "300px" }, children: [_jsx("div", { className: "hotel-name text-orange-600 hover:underline hover:text-blue-800 cursor-pointer font-semibold text-lg mb-2", onClick: handleNavigateToDetails, children: hotel.name }), " ", hotel.image_details.count > 0 ? (_jsx(Carousel, { showThumbs: false, showStatus: false, showIndicators: false, infiniteLoop: true, autoPlay: true, children: Array.from({ length: hotel.image_details.count }).map((_, index) => (_jsx("div", { className: "hotel-image", children: _jsx("img", { className: "carousel", src: `${hotel.image_details.prefix}${index}${hotel.image_details.suffix}`, alt: `${hotel.name} image ${index + 1}`, style: { borderRadius: "8px" } }) }, index))) })) : (_jsx("div", { className: "hotel-image", children: _jsx("img", { src: default_hotel_image, alt: "Default hotel preview", style: { width: "100%", height: "200px", objectFit: "contain" } }) })), _jsxs("div", { className: "hotel-description", children: ["Address: ", hotel.address] }), _jsxs("div", { className: "hotel-description", children: ["Rating:", hotel.rating] }), _jsx("div", { className: "hotel-description", children: "Description:" }), _jsx("div", { dangerouslySetInnerHTML: { __html: hotel.description } })] }) }));
}
