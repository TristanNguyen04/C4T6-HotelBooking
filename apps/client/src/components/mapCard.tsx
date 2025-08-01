import "../styles/map.css";
import {InfoWindow} from "@vis.gl/react-google-maps";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import type {Hotel} from "../types/hotel";
import default_hotel_image from "../assets/default_hotel_image.png";
import { useNavigate ,  useLocation } from "react-router-dom";

type HotelInfoWindowProps = {
  hotel: Hotel;
  onClose: () => void;
};

export default function HotelInfoWindow({ hotel, onClose }: HotelInfoWindowProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToDetails = () => {
    const queryParams = location.search;
    navigate(`/hotels/${hotel.id}/details${queryParams}`);
  };

  return (
    <InfoWindow position={{ lat: hotel.latitude, lng: hotel.longitude }} onCloseClick={onClose}>
      <div style={{ width: "300px"}}>
        <div className="hotel-name text-orange-600 hover:underline hover:text-blue-800 cursor-pointer font-semibold text-lg mb-2" 
        onClick={handleNavigateToDetails}>
          {hotel.name}
        </div> {/**maybe can use name to be onclick and link to hotel page */}
        {hotel.image_details.count > 0 ? (
            <Carousel showThumbs={false} showStatus={false} showIndicators={false} infiniteLoop autoPlay>
              {Array.from({ length: hotel.image_details.count }).map((_, index) => (
                <div key={index} className="hotel-image">
                  <img className="carousel"
                    src={`${hotel.image_details.prefix}${index}${hotel.image_details.suffix}`}
                    alt={`${hotel.name} image ${index + 1}`}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              ))}
            </Carousel>
        ): (
          <div className="hotel-image">
            <img
              src={default_hotel_image}
              alt="Default hotel preview"
              style={{ width: "100%", height: "200px", objectFit: "contain"}}
            />
          </div>
        )}
        <div className="hotel-description">Address: {hotel.address}</div>
        <div className="hotel-description">Rating:{hotel.rating}</div>
        <div className="hotel-description">Description:</div>
        <div
          dangerouslySetInnerHTML={{ __html: hotel.description }}
        />
      </div>
    </InfoWindow>
  );
}