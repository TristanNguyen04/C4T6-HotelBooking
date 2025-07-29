import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"> 
        <div>
            <div className='flex items-center space-x-2 mb-5'>
                <span className="font-bold text-[24px] leading-[36px] text-[#FF6B6B]">
                    Ascenda
                </span>
                <span className="font-extralight text-[14px] leading-[20px] text-white">
                    Comfort wherever you go
                </span>
            </div>
          <p className="text-sm mb-4">
            Find your perfect stay with our curated selection of hotels
            worldwide.
          </p>
          <div className="flex space-x-4 text-xl text-white">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Safety Information</li>
            <li>Cancellation Options</li>
            <li>COVID-19 Resources</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers, giveaways, and travel
            inspiration.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 w-full rounded-l-md text-white text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              style={{ backgroundColor: '#FF6B6B' }}
              className="text-white px-4 py-2 rounded-r-md hover:opacity-90"  
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2025 StayEase. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Cookie Settings
          </a>
          <a href="#" className="hover:text-white">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}