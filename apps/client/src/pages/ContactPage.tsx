import React, {useState, useEffect, useRef} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {motion, useInView} from "framer-motion";
//import PaperPlane from "../components/PaperPlane";
import hero from "../assets/contactHero.jpg";
import formBG from "../assets/contactFormBG.jpeg";
import RainOverlay from "../components/Raindrop";

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
  const [welcomeQuote, setWelcomeQuote] = useState('');

  //const { scrollYProgress } = useScroll();
  //const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  const formRef = useRef(null);
  const isInView = useInView(formRef, {
    amount: 0.45, //appear when 45% of the element is in view
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //show a success message
    setIsSubmitted(true);
    //reset form after 3 seconds
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
    },
  ];

  const welcomeQuotes = [
    "Adventure awaits! Let us help you find the perfect stay.",
    "Your next getaway is just a booking away, we are here to make it easy.",
    "Discover new places and experiences with StayEase. Hit us up for any questions!",
    "Travel is the only thing you buy that makes you richer. Let us help you invest in experiences.",
    "From city escapes to beach retreats, we have the perfect accommodations for you."
  ];

  const toggleFAQ = () => {
    setShowFAQ(prev => !prev);
    setOpenFAQIndex(null); // reset selected question
  };

  const handleQuestionClick = (index: number) => {
    setOpenFAQIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    const randomIndex = Math.floor(Math.random() * welcomeQuotes.length);
    setWelcomeQuote(welcomeQuotes[randomIndex]);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* hero section (header) */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* background header image with blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[1px] scale-110"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 85%, rgba(0,0,0,0.7) 90%, rgba(0,0,0,1) 100%), url(${hero})`,
          }}
        />

        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />

        <RainOverlay />

        {/* foreground content */}
        <div className="relative z-10 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold mb-4"
          >
            Contact Us!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl whitespace-nowrap overflow-hidden text-ellipsis text-center mx-auto"
          >
            {welcomeQuote}
          </motion.p>
        </div>
      </section>

      {/* avenues for contact */}
      <section className="py-14 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md text-center transform transition duration-500 ease-out hover:shadow-xl hover:-translate-y-2 hover:translate-x-1.2"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="text-5xl mb-4">{method.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{method.title}</h3>
              <p className="text-blue-600 font-medium mb-2">{method.detail}</p>
              <p className="text-gray-600 text-sm">{method.description}</p>
            </div>
          ))}
        </div>
      </section>

    {/* contact form */}
    <section ref={formRef} className="min-h-[900px] bg-gray-20 flex items-center justify-center px-6 py-12 bg-[#FF6B6B]">
        <div
          className="relative w-full max-w-6xl flex rounded-lg overflow-hidden shadow-lg bg-cover bg-center animate-pan"
          style={{
            backgroundImage: `url(${formBG})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl"
        >
        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
        <div className="relative min-h-[560px] transition-all duration-300">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
              <p className="text-gray-600">We'll get back to you within 24 hours.</p>
            </motion.div>
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
      </motion.div>
    </div>
  </section>

  {/* Quick Help section */}
  <section className="py-12">
    <div className="max-w-xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Need Quick Help?</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none">
          <div className="text-2xl">🚨</div>
          <div>
            <h3 className="font-bold text-gray-800">Emergency Support</h3>
            <p className="text-sm text-gray-600">For urgent booking issues, call us now</p>
          </div>
        </div>

        <button
          onClick={toggleFAQ}
          className="w-full text-left relative group flex items-center space-x-3 p-4 bg-green-50 rounded-lg 
                    transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none cursor-pointer"
        >
          <div className="text-2xl">❓</div>
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-gray-800 text-xl">FAQ Section</h3>
            <p className="text-sm text-gray-600">Click here find answers to common questions below</p>
          </div>
        </button>
      </div>
    </div>
  </section>

      {/* pops up Q&A when the FAQ btn pressed */}
      {showFAQ && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto px-4 pb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`py-4 cursor-pointer select-none border-gray-200 ${
                  index !== faqItems.length - 1 ? 'border-b' : ''}`}
                onClick={() => handleQuestionClick(index)}
                >
                <div className="flex justify-between items-center">
                  <h4 className="text-blue-700 font-medium text-lg">{faq.question}</h4>
                  <motion.div
                    animate={{ rotate: openFAQIndex === index ? 180 : 0 }}
                    className="text-blue-500"
                  >
                    ▼
                  </motion.div>
                </div>
                {openFAQIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-gray-600 mt-3 text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
