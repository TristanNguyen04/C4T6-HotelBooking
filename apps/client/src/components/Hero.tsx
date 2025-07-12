import React from 'react'

const Hero = ({children}: {children?: React.ReactNode}) => {
  return (
    <div className="relative">
      <div className='flex flex-col items-start justify-center px-6 md:px-6 lg:px-24 xl:px-32
      text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-[70vh] md:h-[80vh]'>
          <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Hotel Experience</p>
          <h1 className="font-poppin text-xl md:text-5xl md:text-[56px] md:leading-[56px] 
          font-bold md:font-extrabold max-w-xxl mt-4">Discover Your Perfect Stay</h1>
          <p className="max-w-130 mt-2 text-sm md:text-base">
            Unforgettable experiences await. Find the ideal accommodation for your next adventure.
          </p>

          <div className="hidden md:flex mt-12 gap-4">
            <span className="flex items-center gap-2 pl-3 pr-20 py-3.5 bg-white/10 text-white rounded-full backdrop-blur-md font-extralight">
              <span className="text-yellow-400 text-lg">✓</span>
              <span className="text-l leading-tight max-w-[120px] whitespace-normal">
                24/7 Customer Support
              </span>
            </span>

            <span className="flex items-center gap-2 pl-3 pr-20 py-3.5 bg-white/10 text-white rounded-full backdrop-blur-md font-extralight">
              <span className="text-yellow-400 text-lg">✓</span>
              <span className="text-l leading-tight max-w-[100px] whitespace-normal">
                Best Price Guarantee
              </span>
            </span>

            <span className="flex items-center gap-2 pl-3 pr-20 py-3.5 bg-white/10 text-white rounded-full backdrop-blur-md font-extralight">
              <span className="text-yellow-400 text-lg">✓</span>
              <span className="text-l leading-tight max-w-[100px] whitespace-normal">
                No Booking Fees
              </span>
            </span>
          </div>
      </div>

      {/* Improved SearchBar wrapper with responsive positioning */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-4 z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
    
  )
}

export default Hero