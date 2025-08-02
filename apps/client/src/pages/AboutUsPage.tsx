import React from 'react';

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Passionate about creating memorable travel experiences with over 15 years in hospitality.",
      icon: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "Head of Technology",
      description: "Ensuring our platform provides the smoothest booking experience for travelers worldwide.",
      icon: "👨‍💻"
    },
    {
      name: "Emma Rodriguez",
      role: "Customer Success",
      description: "Dedicated to providing 24/7 support and ensuring every stay exceeds expectations.",
      icon: "👩‍💬"
    },
    {
      name: "David Kim",
      role: "Partner Relations",
      description: "Building relationships with hotels globally to bring you the best accommodation options.",
      icon: "🤝"
    }
  ];

  const values = [
    {
      icon: "💰",
      title: "Best Price Guarantee",
      description: "We believe great stays shouldn't break the bank. Our price matching ensures you get the best deal every time."
    },
    {
      icon: "🛎️",
      title: "24/7 Support",
      description: "Travel doesn't follow business hours, and neither do we. Our support team is always here when you need us."
    },
    {
      icon: "🔒",
      title: "Secure & Trustworthy",
      description: "Your privacy and security are our top priorities. Book with confidence knowing your data is protected."
    },
    {
      icon: "❌",
      title: "Flexible Cancellation",
      description: "Plans change, and we understand that. Most bookings come with free cancellation options."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FF7F50] to-[#FFA07A] px-8 py-16 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About StayEase</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comfort wherever you go - making hotel booking simple, secure, and affordable for travelers worldwide.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2020, StayEase began with a simple mission: to make hotel booking as easy and stress-free as possible. 
              We recognized that travelers needed a platform they could trust - one that offers genuine value, transparent pricing, 
              and exceptional customer service.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Today, we've partnered with thousands of hotels worldwide to bring you carefully curated accommodations 
              that meet our high standards for quality and value. From budget-friendly stays to luxury resorts, 
              we're committed to helping you find your perfect stay.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team of travel enthusiasts works around the clock to ensure your booking experience is seamless, 
              secure, and supported by real people who care about your journey.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StayEase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {member.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join millions of travelers who trust StayEase for their accommodation needs. 
            Find your perfect stay with our curated selection of hotels worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#FF6B6B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              Start Booking
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
