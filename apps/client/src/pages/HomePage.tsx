import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-screen bg-[#f8f9fa] text-gray-800 font-sans overflow-x-hidden">
      {/* Header (Full Width) */}
      <header className="bg-white w-full shadow-sm py-4 px-6 sm:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-800">Ascenda</div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <a href="#">Destinations</a>
          <a href="#">Deals</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </nav>
        <div className="flex gap-2">
          <button className="text-sm text-gray-600">Button</button>
          <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">Button</button>
        </div>
      </header>

      {/* Main Content Container (Centered) */}
      <main className="max-w-screen-xl mx-auto px-6 sm:px-12">
        {/* Hero Section */}
        <section className="relative h-[75vh] bg-cover bg-center flex flex-col justify-center items-center text-white mt-8" style={{ backgroundImage: `url('')` }}>
          <div className="bg-black bg-opacity-40 p-8 rounded-lg text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Heading</h1>
            <p className="mb-6 text-lg">Subheading text</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-white text-gray-800 px-4 py-1 rounded-full">Tag</span>
              <span className="bg-white text-gray-800 px-4 py-1 rounded-full">Tag</span>
              <span className="bg-white text-gray-800 px-4 py-1 rounded-full">Tag</span>
            </div>
          </div>
          <div className="absolute bottom-[-2.5rem] w-11/12 max-w-5xl bg-white p-6 rounded-xl shadow-lg flex flex-wrap md:flex-nowrap gap-4 justify-between items-center">
            <input className="border border-gray-300 p-3 rounded w-full md:w-1/3 text-sm" placeholder="Input" />
            <input className="border border-gray-300 p-3 rounded w-full md:w-1/4 text-sm" placeholder="Input" />
            <input className="border border-gray-300 p-3 rounded w-full md:w-1/4 text-sm" placeholder="Input" />
            <button className="bg-red-500 text-white px-6 py-3 rounded-md w-full md:w-auto text-sm font-medium">Search</button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-40 text-center">
          <h2 className="text-2xl font-bold mb-8">Section Title</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-semibold mb-1">Title</h3>
                <p className="text-sm text-gray-600">Description text goes here.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Image Cards Section */}
        <section className="mt-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Section Title</h2>
            <a href="#" className="text-sm text-red-500">View all ➔</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden shadow">
                <div className="w-full h-48 bg-gray-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                  <h3 className="font-bold text-lg">Title</h3>
                  <p className="text-sm">Subtitle</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deal Cards Section */}
        <section className="mt-24 mb-24">
          <h2 className="text-xl font-semibold mb-6">Section Title</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gray-300" />
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">Label</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-md mb-1">Title</h3>
                  <p className="text-sm text-gray-600 mb-1">📍 Location</p>
                  <p className="text-sm mb-2">⭐ Rating</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs line-through text-gray-400">$000</p>
                      <p className="text-lg text-red-500 font-bold">$000 <span className="text-sm text-gray-600">/night</span></p>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">Button</button>
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
