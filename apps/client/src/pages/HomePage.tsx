import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateDefaultSearchUrl } from "../utils/date";

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">(""); 

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter subscription
  const handleSubscribe = () => {
    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    // Success case
    setMessage("Thank you for subscribing! You'll receive our newsletter soon.");
    setMessageType("success");
    setEmail(""); // Clear the input
  };

  // Clear message when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const popularDestinations = [
    {
      name: "Ha Noi, Vietnam",
      term: "Ha Noi, Vietnam",
      destinationId: "uyW4",
      imageUrl: "https://localvietnam.com/wp-content/uploads/2021/08/tran-quoc-pagoda.jpg",
      description: "Ancient charm meets vibrant street life"
    },
    {
      name: "Kuala Lumpur, Malaysia", 
      term: "Kuala Lumpur, Malaysia",
      destinationId: "EzoR",
      imageUrl: "https://www.malaysia.travel/mt-flmngr/files/Petronas-Twin-Tower/petronas-twin-tower%20(1).jpeg",
      description: "Gleaming towers and cultural diversity"
    },
    {
      name: "Bali, Indonesia",
      term: "Bali, Indonesia", 
      destinationId: "WP3Z",
      imageUrl: "https://media.licdn.com/dms/image/v2/D4D12AQE1GR12BKNt5Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1688215561612?e=2147483647&v=beta&t=Rx6uVbS0Z2zm2-9N3Qr5wbvH5mcpEPBq2PrZnP4ZwE8",
      description: "Tropical paradise and spiritual serenity"
    }
  ];

  const handleDestinationClick = (term: string, destinationId: string) => {
    const searchUrl = generateDefaultSearchUrl(term, destinationId);
    navigate(searchUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4">
        <section className="pt-60 sm:pt-60 lg:pt-30 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Book With Us</h2>
          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg text-center transform transition-all duration-100 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-blue-50 group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-100">💰</div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors duration-100">Best Price Guarantee</h3>
              <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-100">We match prices and give you extra discounts.</p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg text-center transform transition-all duration-100 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-green-50 group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-100">🛎️</div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-green-600 transition-colors duration-100">24/7 Support</h3>
              <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-100">Always available to assist you anytime.</p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg text-center transform transition-all duration-100 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-purple-50 group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-100">🔒</div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-purple-600 transition-colors duration-100">Secure Booking</h3>
              <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-100">Your data and payments are protected.</p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg text-center transform transition-all duration-100 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-orange-50 group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-100">❌</div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-orange-600 transition-colors duration-100">Free Cancellation</h3>
              <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-100">Most bookings can be cancelled for free.</p>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="pt-20 pb-16 text-left">
          <h2 className="text-3xl font-bold mb-12">Popular Destinations</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => handleDestinationClick(destination.term, destination.destinationId)}
              >
                <div className="relative">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="pt-16 pb-20">
          <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Get Exclusive Deals</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to receive special offers, travel inspiration, and expert tips directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
              <button 
                onClick={handleSubscribe}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
              >
                Subscribe
              </button>
            </div>
            
            {/* Inline Message */}
            {message && (
              <div className={`mt-3 text-sm font-medium ${
                messageType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}