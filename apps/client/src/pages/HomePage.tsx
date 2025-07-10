import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  //guest dropdown state
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  return (
    <div className="min-h-screen w-screen bg-[#f8f9fa] text-gray-800 font-sans overflow-x-hidden">
      {/* HomePage Container*/}
      <main className="px-6 sm:px-0">
        <section
          className="relative h-[62vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
          style={{ backgroundImage: `url('/src/assets/homepagebg.png')` }}
        >
          <div className="bg-black bg-opacity-40 p-8 rounded-lg text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Discover Your Perfect Stay</h1>
            <p className="mb-6 text-lg">
              Unforgettable experiences await. Find the ideal accommodation for your next adventure.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-white text-gray-800 px-4 py-1 rounded-full">24/7 Customer Support</span>
              <span className="bg-white text-gray-800 px-4 py-1 rounded-full">Best Price Guarantee</span>
              <span className="bg-white text-gray-800 px-4 py-1 rounded-full">No Booking Fees</span>
            </div>
          </div>
          
          {/* Search Box */}
          <div className="absolute bottom-[-2.5rem] w-11/12 max-w-5xl bg-white p-6 rounded-xl shadow-lg flex flex-wrap md:flex-nowrap gap-4 justify-between items-end">

            {/* Destination */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold text-gray-700 mb-1">Destination</label>
              <input
                className="border border-gray-300 p-3 rounded text-sm text-black"
                placeholder="Where are you going?"
              />
            </div>

            {/* Dates */}
            <div className="flex flex-col w-full md:w-1/4">
              <label className="text-sm font-semibold text-gray-700 mb-1">Dates</label>
              <input
                className="border border-gray-300 p-3 rounded text-sm text-black"
                placeholder="Add dates"
              />
            </div>

            {/* Guests */}
            <div className="relative flex flex-col w-full md:w-1/4">
              <label className="text-sm font-semibold text-gray-700 mb-1">Guests</label>
              <button
                onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                className="border border-gray-300 p-3 rounded text-sm text-left w-full bg-white text-gray-800 font-medium"

              >
                {`${adults} adults, ${children} children, ${rooms} room${rooms > 1 ? 's' : ''}`}
              </button>

              {guestDropdownOpen && (
                <div className="absolute z-10 mt-2 bg-white border border-gray-200 shadow-lg rounded p-4 w-full space-y-4">
                  {/* Row: Adults */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                        disabled={adults <= 1}
                      >
                        −
                      </button>
                      <span className="text-gray-800">{adults}</span>

                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Row: Children */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Children</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                        disabled={children <= 0}
                      >
                        −
                      </button>
                      <span className="text-gray-800">{children}</span>

                      <button
                        onClick={() => setChildren(children + 1)}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                                    {/* Row: Rooms */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Rooms</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                        disabled={rooms <= 1}
                      >
                        −
                      </button>
                      <span className="text-gray-800">{rooms}</span>

                      <button
                        onClick={() => setRooms(rooms + 1)}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="text-right">
                    <button
                      onClick={() => setGuestDropdownOpen(false)}
                      className="text-blue-500 text-sm font-medium hover:underline"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/search")}
              className="bg-red-500 text-white px-6 py-3 rounded-md w-full md:w-auto text-sm font-medium">
              Search
            </button>
          </div>
        </section>
      </main>

      {/* HomePage Contents*/}
      <main className="px-6 sm:px-12">

        {/* Why Book With Us */}
        <section className="mt-40 text-center">
          <h2 className="text-2xl font-bold mb-8">Why Book With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">Best Price Guarantee</h3>
              <p className="text-sm text-gray-600">We match prices and give you extra discounts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">🛎️</div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always available to assist you anytime.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Secure Booking</h3>
              <p className="text-sm text-gray-600">Your data and payments are protected.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">❌</div>
              <h3 className="font-semibold mb-1">Free Cancellation</h3>
              <p className="text-sm text-gray-600">Most bookings can be cancelled for free.</p>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mt-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Popular Destinations</h2>
            <a href="#" className="text-sm text-red-500">View all ➔</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Paris, France", subtitle: "2,845 properties" },
              { title: "New York, USA", subtitle: "3,721 properties" },
              { title: "Bali, Indonesia", subtitle: "1,932 properties" },
            ].map((item, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden shadow">
                <div className="w-full h-48 bg-gray-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Top Deals */}
        <section className="mt-24 mb-24">
          <h2 className="text-xl font-semibold mb-6">Today's Top Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gray-300" />
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                    {30 - i * 5}% OFF
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-md mb-1">Hotel Name</h3>
                  <p className="text-sm text-gray-600 mb-1">📍 Location</p>
                  <p className="text-sm mb-2">⭐ {4.5 - i * 0.1}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs line-through text-gray-400">${299 + i * 50}</p>
                      <p className="text-lg text-red-500 font-bold">
                        ${Math.round((299 + i * 50) * 0.7)} <span className="text-sm text-gray-600">/night</span>
                      </p>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
