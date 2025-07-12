import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function HotelDetailsPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Extended hotel data with detailed review ratings
  const getHotelData = (id: string) => {
    const hotels = {
      "1": {
        name: "Hotel Le Meurice",
        address: "228 Rue de Rivoli, 1st arr., 75001 Paris, France",
        rating: 4.5,
        reviewCount: 846,
        price: 576,
        originalPrice: 720,
        description: "Experience luxury in the heart of Paris at this iconic palace hotel with stunning Tuileries Garden views. Located in the prestigious 1st arrondissement, Hotel Le Meurice offers unparalleled elegance and world-class service in one of the most desirable locations in Paris.",
        amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "Concierge", "Room Service", "Valet Parking", "Business Center", "Pet Friendly", "Pool", "Air Conditioning", "Bar"],
        highlights: ["Historic Landmark", "Spa & Wellness", "Fine Dining", "Free Wi-Fi"],
        images: ["/hotel1-1.jpg", "/hotel1-2.jpg", "/hotel1-3.jpg", "/hotel1-4.jpg"],
        coordinates: { lat: 48.8647, lng: 2.3282 },
        rooms: [
          {
            type: "Classic Room",
            description: "Elegant room with city views and classic French décor",
            price: 576,
            cancellation: true,
            image: "/room1-1.jpg",
            amenities: ["King Bed", "City View", "Free WiFi", "Air Conditioning"]
          },
          {
            type: "Deluxe Room",
            description: "Spacious room with garden views and premium amenities", 
            price: 720,
            cancellation: true,
            image: "/room1-2.jpg",
            amenities: ["King Bed", "Garden View", "Free WiFi", "Minibar"]
          }
        ],
        reviewRatings: {
          overall: 4.5,
          location: 4.8,
          cleanliness: 4.7, 
          service: 4.9,
          value: 4.3
        },
        reviews: [
          { name: "Sarah M.", rating: 5, comment: "Absolutely stunning hotel with exceptional service. The location is perfect!", date: "2 days ago" },
          { name: "John D.", rating: 4, comment: "Beautiful property, though quite expensive. The spa was amazing.", date: "1 week ago" },
          { name: "Maria L.", rating: 5, comment: "Perfect for a romantic getaway. Every detail was thoughtfully planned.", date: "2 weeks ago" }
        ]
      },
      "2": {
        name: "Hotel Plaza Athénée", 
        address: "25 Avenue Montaigne, 8th arr., 75008 Paris, France",
        rating: 4.7,
        reviewCount: 1240,
        price: 850,
        originalPrice: 1020,
        description: "Legendary Parisian palace hotel on the prestigious Avenue Montaigne with Eiffel Tower views. This iconic hotel combines timeless elegance with modern luxury.",
        amenities: ["Free WiFi", "Spa", "Restaurant", "Bar", "Concierge", "Fitness Center", "Valet Parking", "Room Service"],
        highlights: ["Eiffel Tower Views", "Designer Shopping", "Michelin Restaurant", "Free Wi-Fi"],
        images: ["/hotel2-1.jpg", "/hotel2-2.jpg", "/hotel2-3.jpg"],
        coordinates: { lat: 48.8704, lng: 2.3089 },
        rooms: [
          {
            type: "Superior Room",
            description: "Luxurious room with courtyard views",
            price: 850,
            cancellation: true,
            image: "/room2-1.jpg",
            amenities: ["Queen Bed", "Courtyard View", "Free WiFi", "Marble Bathroom"]
          }
        ],
        reviewRatings: {
          overall: 4.7,
          location: 4.9,
          cleanliness: 4.6, 
          service: 4.8,
          value: 4.5
        },
        reviews: [
          { name: "Emma R.", rating: 5, comment: "The Eiffel Tower view from our room was breathtaking!", date: "3 days ago" },
          { name: "David K.", rating: 4, comment: "Excellent service and location. The restaurant was world-class.", date: "5 days ago" }
        ]
      },
      "3": {
        name: "Le Bristol Paris",
        address: "112 Rue du Faubourg Saint-Honoré, 8th arr., 75008 Paris, France", 
        rating: 4.6,
        reviewCount: 932,
        price: 920,
        originalPrice: 1100,
        description: "Palace hotel combining French elegance with modern luxury in the heart of the fashion district.",
        amenities: ["Free WiFi", "Spa", "Swimming Pool", "Restaurant", "Bar", "Fitness Center"],
        highlights: ["Indoor Pool", "Spa & Wellness", "Fashion District", "Free Wi-Fi"],
        images: ["/hotel3-1.jpg", "/hotel3-2.jpg"],
        coordinates: { lat: 48.8713, lng: 2.3186 },
        rooms: [
          {
            type: "Classic Room",
            description: "Refined room with French décor",
            price: 920,
            cancellation: false,
            image: "/room3-1.jpg",
            amenities: ["King Bed", "Street View", "Free WiFi", "Sitting Area"]
          }
        ],
        reviewRatings: {
          overall: 4.6,
          location: 4.7,
          cleanliness: 4.8, 
          service: 4.6,
          value: 4.3
        },
        reviews: [
          { name: "Sophie B.", rating: 5, comment: "The pool area was incredible and the staff was so attentive.", date: "1 day ago" }
        ]
      },
      "4": {
        name: "Hotel George V",
        address: "31 Avenue George V, 8th arr., 75008 Paris, France",
        rating: 4.8,
        reviewCount: 1567,
        price: 1200,
        originalPrice: 1400,
        description: "Art Deco masterpiece steps from the Champs-Élysées with world-class dining and service.",
        amenities: ["Free WiFi", "Spa", "Restaurant", "Bar", "Concierge", "Business Center"],
        highlights: ["Champs-Élysées", "Michelin Dining", "Art Deco Design", "Free Wi-Fi"],
        images: ["/hotel4-1.jpg", "/hotel4-2.jpg"],
        coordinates: { lat: 48.8681, lng: 2.3006 },
        rooms: [
          {
            type: "Deluxe Room",
            description: "Spacious room with marble bathroom",
            price: 1200,
            cancellation: true,
            image: "/room4-1.jpg",
            amenities: ["King Bed", "Avenue View", "Free WiFi", "Marble Bathroom"]
          }
        ],
        reviewRatings: {
          overall: 4.8,
          location: 4.9,
          cleanliness: 4.7, 
          service: 4.9,
          value: 4.5
        },
        reviews: [
          { name: "James W.", rating: 5, comment: "Absolutely perfect in every way. Worth every penny!", date: "4 days ago" }
        ]
      }
    };
    
    return hotels[id as keyof typeof hotels] || hotels["1"];
  };

  const hotel = getHotelData(hotelId || "1");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
    { id: "reviews", label: "Reviews" },
    { id: "similar", label: "Similar Hotels" }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">☆</span>);
      }
    }
    return stars;
  };

  // Get amenity icon based on name
  const getAmenityIcon = (amenity: string) => {
    // This would be replaced with actual icons in a real implementation
    const iconMap: Record<string, string> = {
      "Free WiFi": "📶",
      "Spa": "💆",
      "Fitness Center": "🏋️",
      "Restaurant": "🍽️",
      "Concierge": "👨‍💼",
      "Room Service": "🛎️",
      "Valet Parking": "🚗",
      "Business Center": "💼",
      "Pet Friendly": "🐾",
      "Pool": "🏊",
      "Air Conditioning": "❄️",
      "Bar": "🍸",
      "Swimming Pool": "🏊",
      "King Bed": "🛏️",
      "Queen Bed": "🛏️",
      "City View": "🏙️",
      "Garden View": "🌳",
      "Courtyard View": "🏡",
      "Street View": "🛣️",
      "Avenue View": "🛣️",
      "Minibar": "🍾",
      "Marble Bathroom": "🛁",
      "Sitting Area": "🛋️"
    };
    
    return iconMap[amenity] || "✓";
  };

  const similarHotels = [
    { name: "Four Seasons George V", price: 1100, rating: 4.6, image: "/similar1.jpg" },
    { name: "The Ritz Paris", price: 950, rating: 4.5, image: "/similar2.jpg" },
    { name: "Shangri-La Hotel Paris", price: 800, rating: 4.4, image: "/similar3.jpg" }
  ];

  return (
    <div className="min-h-screen w-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="px-6 sm:px-12">
          <div className="flex gap-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeSection === section.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="px-6 sm:px-12 py-8 max-w-7xl mx-auto">
        {/* Photo Gallery */}
        <section id="overview" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-96">
              <div className="md:col-span-2 lg:col-span-2">
                <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm">Main Hotel Image</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <div className="bg-gray-200 h-44 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-1"></div>
                    <p className="text-xs">Gallery 1</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-44 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-1"></div>
                    <p className="text-xs">Gallery 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Header */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(hotel.rating)}</div>
                  <span className="text-sm text-gray-600">({hotel.reviewCount} reviews)</span>
                </div>
                <p className="text-gray-600">{hotel.address}</p>
              </div>
              <div className="bg-white border rounded-lg p-6 lg:w-80">
                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold">€{hotel.price}</span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>
                  <p className="text-sm text-gray-500 line-through">€{hotel.originalPrice}</p>
                  <p className="text-sm text-green-600">Save €{hotel.originalPrice - hotel.price}</p>
                </div>
                <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
                  Book Now
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className="text-gray-700 text-lg leading-relaxed">{hotel.description}</p>
            </div>
          </div>
        </section>

        {/* Featured Highlights */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Featured Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotel.highlights.map((highlight, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 text-xl">★</span>
                  </div>
                  <p className="text-sm font-medium text-blue-800">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms */}
        <section id="rooms" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
            <div className="grid gap-6">
              {hotel.rooms.map((room, index) => (
                <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 bg-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
                        <p className="text-sm">Room Image</p>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
                          <p className="text-gray-600 mb-3">{room.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.amenities.map((amenity, i) => (
                              <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                                <span>{getAmenityIcon(amenity)}</span> {amenity}
                              </span>
                            ))}
                          </div>
                          {room.cancellation && (
                            <p className="text-green-600 text-sm flex items-center gap-1">
                              <span>✓</span> Free cancellation
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold mb-2">€{room.price}</p>
                          <p className="text-sm text-gray-500 mb-4">per night</p>
                          <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Property Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Location</h2>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <div className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">{hotel.address}</p>
                  <p className="text-xs mt-2">Google Maps integration would go here</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
            
            {/* Review Summary */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Overall Rating */}
                <div className="flex-1 text-center md:text-left md:border-r md:border-blue-200 md:pr-6">
                  <p className="text-gray-600 mb-1">Overall Rating</p>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-4xl font-bold text-blue-800">{hotel.reviewRatings.overall}</span>
                    <span className="text-sm text-gray-600">/ 5</span>
                  </div>
                  <div className="flex mt-2 justify-center md:justify-start">
                    {renderStars(hotel.reviewRatings.overall)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{hotel.reviewCount} reviews</p>
                </div>
                
                {/* Rating Categories */}
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm font-bold">{hotel.reviewRatings.location}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${(hotel.reviewRatings.location / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Cleanliness</span>
                      <span className="text-sm font-bold">{hotel.reviewRatings.cleanliness}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${(hotel.reviewRatings.cleanliness / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Service</span>
                      <span className="text-sm font-bold">{hotel.reviewRatings.service}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${(hotel.reviewRatings.service / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Value</span>
                      <span className="text-sm font-bold">{hotel.reviewRatings.value}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${(hotel.reviewRatings.value / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Individual Reviews */}
            <div className="space-y-6">
              {hotel.reviews.map((review, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Similar Hotels */}
        <section id="similar" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Similar Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarHotels.map((similarHotel, index) => (
                <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
                      <p className="text-sm">Hotel Image</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{similarHotel.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(similarHotel.rating)}</div>
                      <span className="text-sm text-gray-600">{similarHotel.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">€{similarHotel.price}</span>
                      <button className="text-blue-600 text-sm hover:underline">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}