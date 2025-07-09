import React from "react";

export default function Header() {
  return (
    <header className="bg-white w-full shadow-sm py-4 px-6 sm:px-12 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-800">Ascenda</div>
      <nav className="hidden md:flex gap-6 text-sm text-gray-600">
        <a href="#">Destinations</a>
        <a href="#">Deals</a>
        <a href="#">About Us</a>
        <a href="#"></a>
      </nav>
      <div className="flex gap-2">
        <button className="text-sm text-gray-600">Sign In</button>
        <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">Register</button>
      </div>
    </header>
  );
}
