import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import hotelImg from '/src/assets/hotel.png';
import hotel1 from '/src/assets/hotel1.png';
import hotel2 from '/src/assets/hotel2.png';
import { 
  Star, 
  ThumbsUp, 
  WifiHigh, 
  Coffee, 
  Martini, 
  Bell,
  SwimmingPool,
  ForkKnife,
  Baby,
  Dog,
  Car,
  Waves,
  Barbell,
  Snowflake,
  Television,
  Lock,
  BuildingOffice,
  Bathtub,
  Phone,
  Prohibit,
  User,
  CurrencyDollar,
  Van,
  TShirt,
  MapPin,
  ShoppingBag,
  Airplane
} from "@phosphor-icons/react";

interface SimilarHotel {
  id: string;
  name: string;
  rating: number;
  price: number;
  image: string | string[];
}

interface ReviewRatings {
  overall: number;
  location: number;
  cleanliness: number;
  service: number;
  value: number;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Room {
  type: string;
  description: string;
  price: number;
  cancellation: boolean;
  image: string | string[];
  amenities: string[];
}

interface Hotel {
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  description: string;
  amenities: string[];
  highlights: string[];
  images: string[];
  coordinates: { lat: number; lng: number };
  rooms: Room[];
  reviewRatings: ReviewRatings;
  reviews: Review[];
}

interface Hotels {
  [key: string]: Hotel;
}

export default function HotelDetailsPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [activeReviewFilter, setActiveReviewFilter] = useState("All");
  const [reviewSearchTerm, setReviewSearchTerm] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(3);
  
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
    { id: "reviews", label: "Reviews" },
    { id: "similar", label: "Similar Hotels" },
  ];
  
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && sections[i]) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            const sectionId = sections[i]?.id;
            if (sectionId) {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  const renderStars = (rating: number, starSize = 20) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i} 
          size={starSize} 
          weight={i <= rating ? 'fill' : 'regular'} 
          color="#f97316"
        />
      );
    }
    return stars;
  };

  const getHotelData = (id: string): Hotel => {
    const hotels: Hotels = {
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
        images: [hotelImg, hotel1, hotel2, hotelImg, hotelImg, hotel1, hotel1, hotel1],
        coordinates: { lat: 48.8647, lng: 2.3282 },
        rooms: [
          {
            type: "Classic Room",
            description: "Elegant room with city views and classic French décor",
            price: 576,
            cancellation: true,
            image: [hotelImg],
            amenities: ["King Bed", "City View", "Free WiFi", "Air Conditioning"]
          },
          {
            type: "Deluxe Room",
            description: "Spacious room with garden views and premium amenities", 
            price: 720,
            cancellation: true,
            image: [hotelImg],
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
        images: [hotelImg, hotel1, hotel2],
        coordinates: { lat: 48.8704, lng: 2.3089 },
        rooms: [
          {
            type: "Superior Room",
            description: "Luxurious room with courtyard views",
            price: 850,
            cancellation: true,
            image: [hotelImg],
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
        images: [hotelImg, hotel1, hotel2],
        coordinates: { lat: 48.8713, lng: 2.3186 },
        rooms: [
          {
            type: "Classic Room",
            description: "Refined room with French décor",
            price: 920,
            cancellation: false,
            image: [hotelImg],
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
        images: [hotelImg, hotel1, hotel2],
        coordinates: { lat: 48.8681, lng: 2.3006 },
        rooms: [
          {
            type: "Deluxe Room",
            description: "Spacious room with marble bathroom",
            price: 1200,
            cancellation: true,
            image: [hotelImg],
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
    
    return hotels[id as keyof typeof hotels] ?? hotels["1"] as Hotel;
  };

  const hotel: Hotel = getHotelData(hotelId || "1");

  const reviewFilters = [
    { label: "All", count: hotel.reviews.length },
    { label: "Excellent", rating: 5 },
    { label: "Good", rating: 4 },
    { label: "Okay", rating: 3 },
    { label: "Poor", rating: 2 },
  ];

  const filteredReviews = hotel.reviews.filter(review => {
    const filter = reviewFilters.find(f => f.label === activeReviewFilter);
    const matchesFilter = !filter || !filter.rating || review.rating >= filter.rating;
    const matchesSearch = review.comment.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
                          review.name.toLowerCase().includes(reviewSearchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Similar hotels data with typed declaration
  const similarHotels: SimilarHotel[] = [
    { id: "2", name: "Hotel Plaza Athénée", rating: 4.7, price: 850, image: [hotelImg] },
    { id: "3", name: "Le Bristol Paris", rating: 4.6, price: 920, image: [hotel2] },
    { id: "4", name: "Four Seasons Hotel George V", rating: 4.8, price: 1050, image: [hotel1] }
  ];

  const getAmenityIcon = (amenity: string) => {
    const iconSize = 20;
    const iconColor = "#FF6B6B";
    
    switch (amenity) {
      case "Free WiFi":
        return <WifiHigh size={iconSize} color={iconColor} />;
      case "Spa":
        return <Bathtub size={iconSize} color={iconColor} />;
      case "Fitness Center":
        return <Barbell size={iconSize} color={iconColor} />;
      case "Restaurant":
        return <ForkKnife size={iconSize} color={iconColor} />;
      case "Concierge":
        return <Bell size={iconSize} color={iconColor} />;
      case "Room Service":
        return <Phone size={iconSize} color={iconColor} />;
      case "Valet Parking":
        return <Car size={iconSize} color={iconColor} />;
      case "Business Center":
        return <BuildingOffice size={iconSize} color={iconColor} />;
      case "Pet Friendly":
        return <Dog size={iconSize} color={iconColor} />;
      case "Pool":
      case "Swimming Pool":
        return <SwimmingPool size={iconSize} color={iconColor} />;
      case "Air Conditioning":
        return <Snowflake size={iconSize} color={iconColor} />;
      case "Bar":
        return <Martini size={iconSize} color={iconColor} />;
      case "Private Beach":
        return <Waves size={iconSize} color={iconColor} />;
      case "Laundry Service":
        return <TShirt size={iconSize} color={iconColor} />;
      case "Airport Shuttle":
        return <Van size={iconSize} color={iconColor} />;
      case "Currency Exchange":
        return <CurrencyDollar size={iconSize} color={iconColor} />;
      case "Non-smoking Rooms":
        return <Prohibit size={iconSize} color={iconColor} />;
      case "Flat-screen TV":
        return <Television size={iconSize} color={iconColor} />;
      case "In-room Safe":
        return <Lock size={iconSize} color={iconColor} />;
      case "Coffee/Tea Maker":
        return <Coffee size={iconSize} color={iconColor} />;
      case "Minibar":
        return <Martini size={iconSize} color={iconColor} />;
      case "24-hour Front Desk":
        return <Bell size={iconSize} color={iconColor} />;
      default:
        return <Star size={iconSize} color={iconColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
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
                    ? 'border-[#FF6B6B] text-[#FF6B6B]' 
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
        {/* Photo Gallery and Hotel Overview */}
        <section id="overview" className="mb-8">
          {/* Horizontally Scrollable Image Gallery */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6">
            {hotel.images.map((img: string, index: number) => (
              <div key={index} className="flex-shrink-0 w-full md:w-auto">
                <img
                  src={img || `https://placehold.co/800x500?text=Image+${index + 1}`}
                  alt={`${hotel.name} view ${index + 1}`}
                  className="w-full h-96 object-cover rounded-lg md:w-[600px]"
                />
              </div>
            ))}
          </div>

          {/* Hotel Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
                <p className="text-gray-700 mt-2">{hotel.address}</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <div className="text-right mr-4">
                  <span className="text-2xl font-bold text-[#FF6B6B]">${hotel.price}</span>
                  <span className="ml-2 text-gray-500 line-through">${hotel.originalPrice}</span>
                  <p className="text-sm text-gray-600">per night</p>
                </div>
                <button 
                  className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#E55A5A] transition font-semibold"
                  onClick={() => scrollToSection('rooms')}
                >
                  Book Now
                </button>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(hotel.rating)}</div>
              <span className="text-sm text-gray-600">{hotel.reviewCount} reviews</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {hotel.highlights.map((highlight: string, index: number) => {
                // Define color mapping for consistent theming across similar amenities
                const getHighlightColor = (highlight: string) => {
                  const lowerHighlight = highlight.toLowerCase();
                  if (lowerHighlight.includes('wifi') || lowerHighlight.includes('wi-fi')) {
                    return "bg-green-100 text-green-800"; // Consistent with WiFi in rooms
                  } else if (lowerHighlight.includes('spa') || lowerHighlight.includes('wellness')) {
                    return "bg-blue-100 text-blue-800";
                  } else if (lowerHighlight.includes('dining') || lowerHighlight.includes('restaurant')) {
                    return "bg-yellow-100 text-yellow-800";
                  } else if (lowerHighlight.includes('landmark') || lowerHighlight.includes('historic')) {
                    return "bg-cyan-100 text-cyan-800";
                  } else {
                    // Fallback to cycling colors for other highlights
                    const colors = [
                      "bg-green-100 text-green-800",
                      "bg-blue-100 text-blue-800", 
                      "bg-cyan-100 text-cyan-800",
                      "bg-yellow-100 text-yellow-800"
                    ];
                    return colors[index % colors.length];
                  }
                };
                
                return (
                  <span 
                    key={index} 
                    className={`${getHighlightColor(highlight)} text-xs px-3 py-1 rounded-full`}
                  >
                    {highlight}
                  </span>
                );
              })}
            </div>
            
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
          </div>
        </section>

        {/* Room Options - Modernized Section with Dynamic Rendering */}
        <section id="rooms" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Room Options</h2>
            
            <div className="space-y-6">
              {hotel.rooms.map((room: Room, index: number) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Room Image */}
                  <div className="w-full md:w-1/3 relative">
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-blue-800 rounded px-2 py-1 z-10">
                        <span className="text-white text-xs">Most Popular</span>
                      </div>
                    )}
                    <img 
                      className="w-full h-64 md:h-full object-cover" 
                      src={Array.isArray(room.image) ? room.image[0] : room.image || "https://placehold.co/416x416"} 
                      alt={room.type} 
                    />
                  </div>
                  
                  {/* Room Details */}
                  <div className="flex-1 p-6 flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      {/* Room Name */}
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.type}</h3>
                      
                      {/* Room Features */}
                      <div className="flex items-center text-gray-600 text-sm mb-4 flex-wrap">
                        <span className="mr-2">{room.amenities[0] || "King Bed"}</span>
                        <span className="mx-2">•</span>
                        <span className="mr-2">Up to 2 guests</span>
                        <span className="mx-2">•</span>
                        <span>{room.amenities[1] || "City View"}</span>
                      </div>
                      
                      {/* Amenity Tags */}
                      <div className="mb-4">
                        {room.amenities.map((amenity: string, i: number) => {
                          // Define color mapping for consistent theming across similar amenities
                          const getAmenityColor = (amenity: string) => {
                            const lowerAmenity = amenity.toLowerCase();
                            if (lowerAmenity.includes('wifi') || lowerAmenity.includes('wi-fi')) {
                              return "bg-green-100 text-green-800"; // Consistent with WiFi in highlights
                            } else if (lowerAmenity.includes('view')) {
                              return "bg-blue-100 text-blue-800";
                            } else if (lowerAmenity.includes('bed')) {
                              return "bg-cyan-100 text-cyan-800";
                            } else if (lowerAmenity.includes('conditioning') || lowerAmenity.includes('minibar')) {
                              return "bg-yellow-100 text-yellow-800";
                            } else {
                              // Fallback to cycling colors for other amenities
                              const colors = [
                                "bg-green-100 text-green-800",
                                "bg-blue-100 text-blue-800", 
                                "bg-cyan-100 text-cyan-800",
                                "bg-yellow-100 text-yellow-800"
                              ];
                              return colors[i % colors.length];
                            }
                          };
                          
                          return (
                            <span key={i} className={`inline-block ${getAmenityColor(amenity)} rounded px-3 py-1 mr-2 mb-2 text-xs`}>
                              {amenity}
                            </span>
                          );
                        })}
                        {room.cancellation && (
                          <span className="inline-block bg-green-100 rounded px-3 py-1 mr-2 mb-2 text-green-800 text-xs">
                            Free cancellation
                          </span>
                        )}
                      </div>
                      
                      {/* Room Description */}
                      <p className="text-sm text-gray-700 mb-4 md:mb-0">
                        {room.description}
                      </p>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start md:ml-6">
                      <div className="text-right">
                        <span className="text-xl text-[#FF6B6B] font-semibold">${room.price}</span>
                        <p className="text-sm text-gray-600">per night</p>
                      </div>
                      <button 
                        className="bg-[#FF6B6B] text-white px-6 py-2 rounded-md hover:bg-[#E55A5A] transition mt-2"
                        onClick={() => navigate(`/booking/${hotelId}/${index}`)}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
    
              {/* Property Amenities */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="mr-2">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Room Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Room Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Snowflake size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Air conditioning</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Television size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Flat-screen TV</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Lock size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">In-room safe</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Coffee size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Coffee/tea maker</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Martini size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Minibar</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Prohibit size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Non-smoking rooms</span>
                  </div>
                </div>
              </div>

              {/* Accessibility Features */}
              
              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Bell size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">24-hour front desk</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Bell size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Concierge service</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Van size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Airport shuttle</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <TShirt size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Laundry service</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <CurrencyDollar size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Currency exchange</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-2">
                      <Baby size={20} color="#FF6B6B" />
                    </div>
                    <span className="text-gray-700">Babysitting</span>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Location</h2>
            
            {/* Map */}
            <div className="bg-gray-100 rounded-lg h-96 mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin size={48} color="#6B7280" />
                </div>
                <p className="text-gray-500 text-lg font-medium">Google Maps Integration</p>
                <p className="text-gray-400 text-sm">Hotel location will be displayed here</p>
              </div>
            </div>

            {/* Hotel Address */}
            <div className="flex items-start mb-6">
              <div className="mr-3 mt-1">
                <MapPin size={20} color="#FF6B6B" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.address}</p>
              </div>
            </div>

            {/* What's Nearby */}
            <div>
              <h3 className="font-semibold text-lg mb-4">What's nearby</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="mr-3">
                    <Waves size={20} color="#FF6B6B" />
                  </div>
                  <div>
                    <p className="font-medium">Nusa Dua Beach</p>
                    <p className="text-sm text-gray-500">2 min walk (150 m)</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3">
                    <ShoppingBag size={20} color="#FF6B6B" />
                  </div>
                  <div>
                    <p className="font-medium">Bali Collection Shopping Center</p>
                    <p className="text-sm text-gray-500">10 min walk (800 m)</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3">
                    <Waves size={20} color="#FF6B6B" />
                  </div>
                  <div>
                    <p className="font-medium">Waterblow</p>
                    <p className="text-sm text-gray-500">15 min walk (1.2 km)</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3">
                    <Airplane size={20} color="#FF6B6B" />
                  </div>
                  <div>
                    <p className="font-medium">Ngurah Rai International Airport</p>
                    <p className="text-sm text-gray-500">20 min drive (13 km)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>

            {/* Review Summary & Filters */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Left Side: Overall Rating */}
              <div className="w-full md:w-1/3">
                <div className="bg-[#FF6B6B]/10 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Overall score</p>
                  <div className="text-5xl font-bold text-[#FF6B6B] my-2">
                    {hotel.reviewRatings.overall.toFixed(1)}
                    <span className="text-3xl text-gray-500">/5</span>
                  </div>
                  <div className="flex justify-center">
                    {renderStars(hotel.reviewRatings.overall, 28)}
                  </div>
                  <p className="font-semibold mt-2">Exceptional</p>
                  <p className="text-sm text-gray-500">({hotel.reviewCount} reviews)</p>
                </div>
                
                {/* Category Ratings */}
                <div className="mt-6 space-y-3">
                  {Object.entries(hotel.reviewRatings).filter(([key]) => key !== 'overall').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-[#FF6B6B] h-2 rounded-full" style={{ width: `${(value / 5) * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{value.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Filters and Review List */}
              <div className="w-full md:w-2/3">
                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold mr-4">Filter by:</h3>
                  {reviewFilters.map(filter => (
                    <button 
                      key={filter.label}
                      onClick={() => setActiveReviewFilter(filter.label)}
                      className={`px-4 py-2 text-sm rounded-full ${
                        activeReviewFilter === filter.label 
                          ? 'bg-[#FF6B6B] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label} {filter.count ? `(${filter.count})` : ''}
                    </button>
                  ))}
                  <button className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200">With photos (45)</button>
                </div>

                {/* Search Reviews */}
                <div className="mb-6">
                  <input 
                    type="text"
                    placeholder="Search reviews..."
                    value={reviewSearchTerm}
                    onChange={(e) => setReviewSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {filteredReviews.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex items-start">
                        <img className="w-12 h-12 rounded-full mr-4" src={`https://i.pravatar.cc/48?u=${review.name}`} alt={review.name} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{review.name}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex items-center">
                              <div className="flex text-[#FF6B6B]">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={20} 
                                    weight={i < review.rating ? "fill" : "regular"} 
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm font-bold">{review.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="mt-4 text-gray-700">{review.comment}</p>
                          <div className="flex items-center mt-4">
                            <button className="flex items-center text-sm text-gray-600 hover:text-[#FF6B6B]">
                              <div className="mr-1">
                                <ThumbsUp size={16} />
                              </div>
                              Helpful
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {filteredReviews.length > visibleReviews && (
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => setVisibleReviews(prev => prev + 3)}
                      className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition font-semibold"
                    >
                      Load more reviews
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Write a Review Form */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-4">Write a review</h3>
              <ReviewForm />
            </div>
          </div>
        </section>

        {/* Similar Hotels Section */}
        <section id="similar" className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Similar Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarHotels.map((similarHotel: SimilarHotel, index: number) => (
                <div 
                  key={index} 
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/hotel/${similarHotel.id}`)}
                >
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={Array.isArray(similarHotel.image) ? similarHotel.image[0] : similarHotel.image || "https://placehold.co/400x200"}  
                      alt={similarHotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{similarHotel.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(similarHotel.rating)}</div>
                      <span className="text-sm text-gray-600">{similarHotel.rating}</span>
                    </div>
                    <p className="text-[#FF6B6B] font-semibold">${similarHotel.price} <span className="text-sm text-gray-600 font-normal">per night</span></p>
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

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex" onMouseLeave={() => setHoverRating(0)}>
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                className="focus:outline-none"
              >
                <div className="cursor-pointer">
                  <Star
                    size={28}
                    weight={starValue <= (hoverRating || rating) ? "fill" : "regular"}
                    color={starValue <= (hoverRating || rating) ? '#facc15' : '#d1d5db'}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <textarea
        placeholder="Your review..."
        rows={5}
        className="w-full p-3 border rounded-lg mb-4"
      ></textarea>
      <button type="submit" className="bg-[#FF6B6B] text-white px-6 py-3 rounded-lg hover:bg-[#E55A5A] transition font-semibold">
        Submit Review
      </button>
    </form>
  );
};