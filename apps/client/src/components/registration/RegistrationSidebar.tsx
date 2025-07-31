import React from 'react';
import luggageImg from '../../assets/luggage.png';

interface RegistrationSidebarProps {
  step: number;
}

export default function RegistrationSidebar({ step }: RegistrationSidebarProps) {
  const getContent = () => {
    if (step === 4) {
      return {
        title: 'Almost there!',
        description: 'Just one more step - verify your email and start exploring amazing destinations with exclusive member benefits.'
      };
    }
    
    return {
      title: 'Your journey begins here',
      description: 'Join thousands of travelers who book their perfect stays with StayEase. Unlock exclusive member rates and collect rewards with every booking.'
    };
  };

  const { title, description } = getContent();

  return (
    <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-300 to-pink-400 px-10 py-12 flex flex-col justify-center items-center text-center gap-4">
      <img src={luggageImg} alt="Luggage" className="w-50 h-auto" />
      <h2 className="text-white text-xl font-semibold">
        {title}
      </h2>
      <p className="text-white text-sm max-w-sm">
        {description}
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button className="bg-white text-orange-500 py-2 rounded font-semibold">Member-only deals</button>
        <button className="bg-white text-orange-500 py-2 rounded font-semibold">Reward points</button>
        <button className="bg-white text-orange-500 py-2 rounded font-semibold">Save favorites</button>
      </div>
    </div>
  );
}