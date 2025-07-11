import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white w-full shadow-sm py-4 px-6 sm:px-12 flex justify-between items-center">
      <div
        className="text-2xl font-bold cursor-pointer"
        style={{ color: '#FF6B6B' }}
        onClick={() => navigate("/")}
      >
        Ascenda
      </div>
      
      <nav className="hidden md:flex gap-6 text-sm text-gray-600">
        <a href="#">Destinations</a>
        <a href="#">Deals</a>
        <a href="#">About Us</a>
        <a href="#"></a>
      </nav>

      <div className="flex gap-2">
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-normal"
          style={{ color: '#FF6B6B', background: 'none', border: 'none' }}
        >
          Sign In
        </button>

        <button
          onClick={() => navigate('/register')}
          className="text-white px-4 py-1 rounded text-sm"
          style={{ backgroundColor: '#FF6B6B' }}
        >
          Register
        </button>
      </div>
    </header>
  );
}
