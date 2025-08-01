import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
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
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8 mt-20", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden mb-12", children: _jsxs("div", { className: "bg-gradient-to-r from-green-600 to-blue-600 px-8 py-16 text-center text-white", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Contact StayEase" }), _jsx("p", { className: "text-xl opacity-90 max-w-3xl mx-auto", children: "We're here to help make your travel experience seamless. Reach out to us anytime." })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Send us a Message" }), isSubmitted ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "text-6xl mb-4", children: "\u2705" }), _jsx("h3", { className: "text-xl font-bold text-green-600 mb-2", children: "Message Sent!" }), _jsx("p", { className: "text-gray-600", children: "We'll get back to you within 24 hours." })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-2", children: "Full Name *" }), _jsx("input", { type: "text", id: "name", name: "name", required: true, value: formData.name, onChange: handleInputChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your full name" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: "Email Address *" }), _jsx("input", { type: "email", id: "email", name: "email", required: true, value: formData.email, onChange: handleInputChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your email address" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "subject", className: "block text-sm font-medium text-gray-700 mb-2", children: "Subject *" }), _jsxs("select", { id: "subject", name: "subject", required: true, value: formData.subject, onChange: handleInputChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "", children: "Select a subject" }), _jsx("option", { value: "booking-help", children: "Booking Assistance" }), _jsx("option", { value: "cancellation", children: "Cancellation Request" }), _jsx("option", { value: "modification", children: "Modify Reservation" }), _jsx("option", { value: "payment", children: "Payment Issues" }), _jsx("option", { value: "complaint", children: "Complaint" }), _jsx("option", { value: "general", children: "General Inquiry" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 mb-2", children: "Message *" }), _jsx("textarea", { id: "message", name: "message", required: true, rows: 5, value: formData.message, onChange: handleInputChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", placeholder: "Tell us how we can help you..." })] }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200", children: "Send Message" })] }))] }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Get in Touch" }), _jsx("div", { className: "space-y-6", children: contactMethods.map((method, index) => (_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "text-3xl", children: method.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-800", children: method.title }), _jsx("p", { className: "text-blue-600 font-medium", children: method.detail }), _jsx("p", { className: "text-gray-600 text-sm", children: method.description })] })] }, index))) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Need Quick Help?" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-3 p-4 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "text-2xl", children: "\uD83D\uDEA8" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-800", children: "Emergency Support" }), _jsx("p", { className: "text-sm text-gray-600", children: "For urgent booking issues, call us now" })] })] }), _jsxs("div", { className: "flex items-center space-x-3 p-4 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-2xl", children: "\u2753" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-800", children: "FAQ Section" }), _jsx("p", { className: "text-sm text-gray-600", children: "Find answers to common questions below" })] })] })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8 mt-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-8 text-center", children: "Frequently Asked Questions" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: faqItems.map((faq, index) => (_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "font-bold text-gray-800", children: faq.question }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: faq.answer })] }, index))) })] })] }) }));
}
