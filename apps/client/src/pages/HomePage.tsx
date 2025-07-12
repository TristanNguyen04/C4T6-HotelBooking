import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import Hero from '../components/Hero';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = ({ destination, checkin, checkout, guests }: {
    destination: { uid: string; term: string };
    checkin: string;
    checkout: string;
    guests: string;
  }) => {
    navigate(
      `/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero>
        <SearchBar onSubmit={handleSearchSubmit} />
      </Hero>
      
      <main className="max-w-6xl mx-auto px-4">
        <section className="mt-40 text-center">
          <h2 className="text-2xl font-bold mb-8">Why Book With Us</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white p-5 md:p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">Best Price Guarantee</h3>
              <p className="text-sm text-gray-600">We match prices and give you extra discounts.</p>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-2">🛎️</div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always available to assist you anytime.</p>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Secure Booking</h3>
              <p className="text-sm text-gray-600">Your data and payments are protected.</p>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-lg shadow text-center">
              <div className="text-4xl mb-2">❌</div>
              <h3 className="font-semibold mb-1">Free Cancellation</h3>
              <p className="text-sm text-gray-600">Most bookings can be cancelled for free.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}