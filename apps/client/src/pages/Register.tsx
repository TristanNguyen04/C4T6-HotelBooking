import React from "react";
import { useNavigate } from "react-router-dom";
import luggageImg from "../assets/luggage.png";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Main Content */}
      <main className="flex flex-1 justify-center items-center px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
          {/* Left side: Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
            <p className="text-sm text-gray-500 mb-6">
              Join Ascenda to unlock exclusive deals and manage your bookings with ease.
            </p>

            {/* Stepper */}
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-400 text-white">1</div>
              <div className="h-1 bg-gray-300 flex-1 mx-2"></div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">2</div>
              <div className="h-1 bg-gray-300 flex-1 mx-2"></div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">3</div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="yourname@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <p className="text-xs text-gray-400 mt-1">We’ll send a verification code to this email</p>
            </div>

            {/* Checkbox */}
            <div className="flex items-start mb-6">
              <input
                id="deals"
                type="checkbox"
                className="mt-1 mr-2 h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
              />
              <label htmlFor="deals" className="text-sm text-gray-700">
                I’d like to receive exclusive deals, travel inspiration and updates from Ascenda
              </label>
            </div>

            {/* Continue Button */}
            <button className="w-full bg-red-400 text-white py-3 rounded-md font-medium text-sm hover:bg-red-500 transition">
              Continue →
            </button>

            <p className="text-sm mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <span className="text-red-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                Sign in
              </span>
            </p>

            <p className="text-xs text-center text-gray-400 mt-6">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-pink-400 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-pink-400 underline">
                Terms of Service
              </a>
              .
            </p>
          </div>

          {/* Right side: Image and Benefits */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-300 to-pink-400 p-10 flex flex-col justify-center items-center text-center">
            <img src={luggageImg} alt="Luggage, passport and ticket" className="w-32 mb-6" />
            <h2 className="text-white text-xl font-semibold mb-2">Your journey begins here</h2>
            <p className="text-white text-sm mb-6 max-w-sm">
              Join thousands of travelers who book their perfect stays with StayEase. Unlock exclusive member rates and collect rewards with every booking.
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button className="bg-white text-orange-500 py-2 rounded font-semibold">🎯 Member-only deals</button>
              <button className="bg-white text-orange-500 py-2 rounded font-semibold">🎁 Reward points</button>
              <button className="bg-white text-orange-500 py-2 rounded font-semibold">📌 Save favorites</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
