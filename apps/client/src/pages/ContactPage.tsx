import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showFAQ, setShowFAQ] = useState(false);

  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a success message
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: "📞",
      title: "Phone Support",
      detail: "+1 (555) 123-4567",
      description: "Available 24/7 for booking assistance"
    },
    {
      icon: "📧",
      title: "Email Support",
      detail: "support@stayease.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "💬",
      title: "Live Chat",
      detail: "Available on website",
      description: "Instant help during business hours"
    },
    {
      icon: "📍",
      title: "Office Address",
      detail: "123 Travel Street",
      description: "San Francisco, CA 94102"
    }
  ];

  const faqItems = [
    {
      question: "How can I cancel my booking?",
      answer: "Most bookings can be cancelled for free. Check your booking confirmation email for cancellation terms or contact our support team."
    },
    {
      question: "Do you offer price matching?",
      answer: "Yes! We offer a best price guarantee. If you find a lower price for the same hotel and dates, we'll match it and give you an extra discount."
    },
    {
      question: "How do I modify my reservation?",
      answer: "You can modify your reservation through your account dashboard or by contacting our support team directly."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various local payment methods depending on your location."
    }
  ];

  const toggleFAQ = () => {
    setShowFAQ(prev => !prev);
    setOpenFAQIndex(null); // Reset selected question
  };

  const handleQuestionClick = (index: number) => {
    setOpenFAQIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-16 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Contact StayEase</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're here to help make your travel experience seamless. Reach out to us anytime.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking-help">Booking Assistance</option>
                    <option value="cancellation">Cancellation Request</option>
                    <option value="modification">Modify Reservation</option>
                    <option value="payment">Payment Issues</option>
                    <option value="complaint">Complaint</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-3xl">{method.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{method.title}</h3>
                      <p className="text-blue-600 font-medium">{method.detail}</p>
                      <p className="text-gray-600 text-sm">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Need Quick Help?</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl">🚨</div>
                  <div>
                    <h3 className="font-bold text-gray-800">Emergency Support</h3>
                    <p className="text-sm text-gray-600">For urgent booking issues, call us now</p>
                  </div>
                </div>
                <div
                  onClick={toggleFAQ}
                  className="relative group flex items-center space-x-3 p-4 bg-green-50 rounded-lg 
                            transform transition duration-200 ease-in-out hover:scale-105 cursor-pointer"
                >
                  <div className="text-2xl">❓</div>
                  <div className="w-full text-left flex flex-col items-start">
                    <h3 className="font-bold text-gray-800 text-xl">FAQ Section</h3>
                    <p className="text-sm text-gray-600">Click to find answers to common questions below</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* pops up Q&A when FAQ btn pressed */}
        {showFAQ && (
          <div className="mt-6 space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="border-b pb-3 cursor-pointer select-none"
                onClick={() => handleQuestionClick(index)}
              >
                <h4 className="text-blue-700 font-medium">{faq.question}</h4>
                {openFAQIndex === index && (
                  <p className="text-gray-600 mt-1 text-sm">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
