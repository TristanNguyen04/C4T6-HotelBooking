import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '../api/booking';
import Spinner from '../components/Spinner';
const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
            setError('No payment session found');
            setLoading(false);
            return;
        }
        const handlePaymentVerification = async () => {
            try {
                await verifyPayment(sessionId);
                setLoading(false);
            }
            catch (err) {
                setError(err.response?.data?.error || 'Failed to verify payment');
                setLoading(false);
            }
        };
        handlePaymentVerification();
    }, [searchParams]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Spinner, {}), _jsx("p", { className: "mt-4 text-gray-600", children: "Verifying your payment..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center max-w-md mx-auto px-4", children: [_jsxs("div", { className: "bg-red-100 text-red-600 p-4 rounded-lg mb-4", children: [_jsx("h2", { className: "text-xl font-bold mb-2", children: "Payment Error" }), _jsx("p", { children: error })] }), _jsx("button", { onClick: () => navigate('/'), className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors", children: "Return to Home" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center max-w-md mx-auto px-4", children: [_jsxs("div", { className: "bg-green-100 text-green-600 p-8 rounded-lg mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("svg", { className: "w-8 h-8", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h2", { className: "text-2xl font-bold mb-2", children: "Payment Successful!" }), _jsx("p", { children: "Your booking has been confirmed. You will receive a confirmation email shortly." })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: () => navigate('/bookings'), className: "w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors", children: "View My Bookings" }), _jsx("button", { onClick: () => navigate('/'), className: "w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors", children: "Return to Home" })] })] }) }));
};
export default PaymentSuccessPage;
