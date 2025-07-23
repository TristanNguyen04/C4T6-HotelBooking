import React from 'react';

const StaticNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-[32px] leading-[36px] text-[#FF6B6B]">
          Ascenda
        </span>
        <span className="font-extralight text-[14px] leading-[20px] text-gray-700">
          Comfort wherever you go
        </span>
      </div>
    </nav>
  );
};

export default StaticNavBar;
