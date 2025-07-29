import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StaticNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => navigate('/');

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isHomePage
          ? isScrolled
            ? 'bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4'
            : 'bg-white py-4 md:py-6'
          : 'bg-white shadow-md py-4 md:py-6'
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <button onClick={handleLogoClick} className="cursor-pointer bg-transparent border-none p-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[24px] leading-[36px] text-[#FF6B6B]">Ascenda</span>
            <span className="font-extralight text-[14px] leading-[20px] text-gray-700">
              Comfort wherever you go
            </span>
          </div>
        </button>
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="hidden md:flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => navigate('/login')}
          className="ml-6 transition-all duration-500 text-[#FF6B6B] hover:underline"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-4 py-2.5 rounded-xl ml-3 transition-all duration-500 bg-[#FF6B6B] text-white hover:bg-[#ff5a5a]"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default StaticNavBar;
