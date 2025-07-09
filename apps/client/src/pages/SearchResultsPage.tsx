import React from "react";

export default function SearchResultsPage() {
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
    <main className="px-6 sm:px-12 py-8 flex gap-8">
  {/* Sidebar Filters */}
    <aside className="w-64 hidden lg:block">
    <div className="bg-white rounded-md shadow-sm p-4 space-y-6">
    <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input type="range" min={0} max={500} className="w-full" />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>€0</span><span>€500+</span>
        </div>
    </div>

    <div>
        <h3 className="font-semibold mb-2">Property Type</h3>
        {["Hotels", "Apartments", "B&Bs", "Villas"].map((type, i) => (
            <div className="flex items-center gap-2 text-sm" key={i}>
            <input type="checkbox" id={type} />
            <label htmlFor={type}>{type}</label>
            </div>
        ))}
    </div>

    <div>
        <h3 className="font-semibold mb-2">Guest Rating</h3>
        {["Excellent", "Very Good", "Good", "Fair"].map((rating, i) => (
            <div className="flex items-center gap-2 text-sm" key={i}>
            <input type="checkbox" id={rating} />
            <label htmlFor={rating}>{rating}</label>
            </div>
        ))}
    </div>

    <div>
        <h3 className="font-semibold mb-2">Facilities</h3>
        {["Free WiFi", "Swimming Pool", "Parking", "Spa", "Air Conditioning"].map((f, i) => (
            <div className="flex items-center gap-2 text-sm" key={i}>
            <input type="checkbox" id={f} />
            <label htmlFor={f}>{f}</label>
            </div>
        ))}
    </div>

    <div>
        <h3 className="font-semibold mb-2">Neighborhood</h3>
        {["Eiffel Tower", "Champs-Élysées", "Louvre Museum", "Montmartre"].map((n, i) => (
            <div className="flex items-center gap-2 text-sm" key={i}>
            <input type="checkbox" id={n} />
            <label htmlFor={n}>{n}</label>
            </div>
        ))}
    </div>

    <div className="mt-6 text-sm text-center p-3">
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Apply Filter</button>
    </div>

    </div>
    <div className="mt-6 text-sm text-center bg-blue-50 border border-blue-200 rounded p-3">
        <p className="mb-2">Need Help?</p>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Contact Support</button>
    </div>
</aside>

  {/* Main Content */}
    <section className="flex-1 space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 className="text-xl font-semibold">Hotels in Paris</h2>
            <p className="text-sm text-gray-500">(432 properties)</p>
        </div>
        <div className="flex items-center gap-2 text-sm flex-wrap">
            <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">Breakfast Included</button>
            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Free Cancellation</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">5-star Hotels</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Near Eiffel Tower</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Pet Friendly</button>
            <select className="ml-auto border text-sm px-2 py-1 rounded">
                <option>Recommended</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
                <option>Top Rated</option>
            </select>
        </div>
    </div>

    {/* Hotel Cards */}
    <div className="space-y-6">
        {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="flex bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition">
        
        <div className="w-40 sm:w-56 bg-purple-100 flex-shrink-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-purple-300 rounded" />
    </div>
    
    <div className="p-4 flex-1 flex flex-col justify-between gap-2">
    <div className="flex justify-between items-start">

    <div>
        <span className="text-xs font-semibold text-red-500">Top Rated</span>
        <h3 className="text-lg font-bold">Hotel Le Meurice</h3>
        <p className="text-sm text-gray-500">228 Rue de Rivoli, 1st arr., 75001 Paris</p>
        <div className="flex gap-2 mt-1 flex-wrap text-xs">
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">Free WiFi</span><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Spa</span>
        <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">Fitness Center</span>
        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Restaurant</span>
    </div>
    </div>
    <div className="text-right">
        <span className="text-sm font-semibold text-green-600">Free cancellation</span>
    </div>
    </div>
    <div className="flex items-center justify-between">
        <span className="text-red-500 font-semibold text-sm bg-red-100 px-2 py-0.5 rounded">9.4 Exceptional · 846 reviews</span>
        <div className="text-right">
        <p className="text-lg font-bold text-gray-800">€576</p>
        <p className="text-xs text-gray-500 line-through">€720 · -20%</p>
        <button className="mt-1 bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition">
        View Deal
        </button>
    </div>
    </div>
    </div>
    </div>
    ))}
    </div>
    </section>
</main>

    </div>
);}