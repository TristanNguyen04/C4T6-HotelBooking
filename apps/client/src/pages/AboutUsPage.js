import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8 mt-20", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden mb-12", children: _jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-16 text-center text-white", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "About StayEase" }), _jsx("p", { className: "text-xl opacity-90 max-w-3xl mx-auto", children: "Comfort wherever you go - making hotel booking simple, secure, and affordable for travelers worldwide." })] }) }), _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-8", children: "Our Story" }), _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("p", { className: "text-lg text-gray-700 mb-6 leading-relaxed", children: "Founded in 2020, StayEase began with a simple mission: to make hotel booking as easy and stress-free as possible. We recognized that travelers needed a platform they could trust - one that offers genuine value, transparent pricing, and exceptional customer service." }), _jsx("p", { className: "text-lg text-gray-700 mb-6 leading-relaxed", children: "Today, we've partnered with thousands of hotels worldwide to bring you carefully curated accommodations that meet our high standards for quality and value. From budget-friendly stays to luxury resorts, we're committed to helping you find your perfect stay." }), _jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: "Our team of travel enthusiasts works around the clock to ensure your booking experience is seamless, secure, and supported by real people who care about your journey." })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Why Choose StayEase" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: values.map((value, index) => (_jsxs("div", { className: "text-center group", children: [_jsx("div", { className: "text-5xl mb-4 group-hover:scale-110 transition-transform duration-200", children: value.icon }), _jsx("h3", { className: "text-lg font-bold mb-3 text-gray-800", children: value.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: value.description })] }, index))) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Meet Our Team" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: teamMembers.map((member, index) => (_jsxs("div", { className: "text-center group hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200", children: [_jsx("div", { className: "text-6xl mb-4 group-hover:scale-110 transition-transform duration-200", children: member.icon }), _jsx("h3", { className: "text-lg font-bold mb-2 text-gray-800", children: member.name }), _jsx("p", { className: "text-blue-600 font-medium mb-3", children: member.role }), _jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: member.description })] }, index))) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8 text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Ready to Start Your Journey?" }), _jsx("p", { className: "text-gray-700 mb-6 max-w-2xl mx-auto", children: "Join millions of travelers who trust StayEase for their accommodation needs. Find your perfect stay with our curated selection of hotels worldwide." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("button", { onClick: () => window.location.href = '/', className: "bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200", children: "Start Booking" }), _jsx("button", { onClick: () => window.location.href = '/', className: "border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200", children: "Contact Us" })] })] })] }) }));
}
