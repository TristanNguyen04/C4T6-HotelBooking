// fancy aos
import { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useAnimation } from "framer-motion";

import globalPresenceImg from "../assets/global-presence.jpg";
import hero from "../assets/aboutHero1.jpg";
import alex from "../assets/alex.jpg";
import jamie from "../assets/jamie.jpg";
import priya from "../assets/priya.jpg";

export default function AboutUs() {
  const controls = useAnimation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  // }, []);

  const interval = setInterval(() => {
      controls.start({
        y: [0, -50, 0], // makes the animation of hopping up and down for the button
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [controls]);



  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center text-white px-6 bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero})`,
        }}  
        >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-4"
        >
          Welcome to StayEase
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl max-w-xl"
        >
          Book the best hotels at unbeatable prices – seamless, secure, and smart.
        </motion.p>
      </section>


      {/* Meet the Team (Preview) */}
      {/* <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
          Meet the Team
        </h2>
        <div className="flex justify-center gap-8 flex-wrap max-w-5xl mx-auto">
          {[
            { name: "Alex Smith", role: "CEO", img: alex },
            { name: "Jamie Lee", role: "CTO", img: jamie }, 
            { name: "Priya Singh", role: "Product Lead", img: priya },
          ].map((member, i) => (
            <div
              key={i}
              className="w-64 p-4 text-center"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-64 h-64 rounded-full mx-auto object-cover mb-4 shadow-lg"
              />
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Mission Section */}
      <section className="py-24 px-6 bg-[#FF6B6B] text-center">
        <h2 className="text-4xl text-white font-bold mb-6">
          Our Mission
        </h2>
        <p
          className="max-w-3xl mx-auto text-white text-lg"
        >
          Our mission is to make travel more accessible, affordable, and memorable by connecting users with high-quality accommodations through smart technology and honest service.
        </p>
      </section>

      {/* What We Offer */}
      <section className="py-24 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Wide Selection",
              desc: "Thousands of hotels worldwide at your fingertips.",
            },
            {
              title: "24/7 Support",
              desc: "Human-centered help when you need it the most.",
            },
            {
              title: "Best Price Guarantee",
              desc: "We negotiate the best deals so you don't have to.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md text-center"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Carousel */}
      <section className="bg-gray-100 py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
          Our Achievements
        </h3>
        <div className="max-w-screen-lg mx-auto flex overflow-x-auto space-x-6 px-4 hide-scrollbar">
          {[
            "10,000+ Bookings",
            "25+ Countries",
            "4.9★ Average Rating",
            "100+ Partner Hotels",
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="mb-5 min-w-[250px] bg-white rounded-2xl shadow-lg p-6 text-center text-[#FF6B6B] font-semibold text-xl"
              whileHover={{ scale: 1.05 }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {stat}
            </motion.div>
          ))}
        </div>
      </section>


      {/* Global Reach */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
          Our Global Presence
        </h2>
        <p
          className="max-w-3xl mx-auto text-gray-600 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          From bustling cities to quiet escapes, HotelEase has partnerships with hotels across continents — ensuring comfort, wherever you are.
        </p>
        {/* Placeholder image */}
        <div className="mt-12" data-aos="zoom-in">
          <img
            src={globalPresenceImg}
            alt="Global presence"
            className="mx-auto max-w-3xl w-full"
          />
        </div>
      </section>


      

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-[#FF6B6B] text-white text-center">
        <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
          Why Choose Us
        </h2>
        <ul
          className="max-w-2xl mx-auto space-y-4 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <li> Trusted by over 10,000 travelers</li>
          <li> Transparent pricing and no hidden fees</li>
          <li> Personalized recommendations and filters</li>
          <li> Easy cancellation and change policies</li>
        </ul>
      </section>

      

      {/* Contact CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join millions of travelers who trust StayEase for their accommodation needs. 
            Find your perfect stay with our curated selection of hotels worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button animate={controls}
              onClick={() => window.location.href = '/'}
              className="bg-[#FF6B6B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              Start Booking

            </motion.button>

            <button 
              onClick={() => window.location.href = '/contact'}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
  );
}
