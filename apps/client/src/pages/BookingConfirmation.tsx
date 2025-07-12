import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function BookingConfirmation() {
    const location = useLocation();
    const { hotelId, hotelName, price } = location.state || {};
    const nights = 4;
    const basePrice = price || 0;
    const taxes = Math.round(basePrice * 0.1);
    const total = basePrice + taxes;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!hotelName || !price) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500 text-lg">Missing booking details. Please return to hotel selection.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-start px-4 py-5 sm:px-8 md:px-16 lg:px-40 md:py-5">
            <div className="w-full max-w-4xl flex flex-col space-y-4 sm:space-y-5 py-2 sm:py-5">
            {/* Page Title */}
            <div className="px-4 py-3 sm:py-5">
                <h1 className="text-2xl sm:text-[28px] font-bold text-stayease-text-primary leading-tight sm:leading-[35px]">
                Confirm and pay
                </h1>
            </div>

            {/* Your Trip Section */}
            <div className="space-y-2">
                <div className="px-4 py-2">
                <h2 className="text-lg font-bold text-stayease-text-primary">
                    Your trip
                </h2>
                </div>

                <div className="bg-white px-4 py-2 min-h-[72px] flex items-center">
                <div className="flex flex-col justify-center">
                    <div className="text-base text-stayease-text-primary font-normal leading-6">
                        {hotelName || "Hotel Name"}
                    </div>
                    <div className="text-sm text-stayease-text-secondary font-normal leading-[21px]">
                        June 10 - 14
                    </div>
                </div>
                </div>
            </div>

            {/* Your Price Section */}
            <div className="space-y-4">

                <div className="px-4 space-y-2">
                {/* 4 nights */}
                <div className="flex justify-between items-start py-2">
                    <div className="text-sm text-stayease-text-secondary font-normal leading-[21px]">
                        4 nights
                    </div>
                    <div className="text-sm text-stayease-text-primary font-normal leading-[21px] text-right">
                        ${basePrice}
                    </div>
                </div>

                {/* Taxes */}
                <div className="flex justify-between items-start py-2">
                    <div className="text-sm text-stayease-text-secondary font-normal leading-[21px]">
                        Taxes
                    </div>
                    <div className="text-sm text-stayease-text-primary font-normal leading-[21px] text-right">
                        ${taxes}
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-start py-2">
                    <div className="text-sm text-stayease-text-secondary font-normal leading-[21px]">
                        Total
                    </div>
                    <div className="text-sm text-stayease-text-primary font-normal leading-[21px] text-right">
                        ${total}
                    </div>
                </div>
                </div>

                {/* Confirm and Pay Button */}
                <div className="px-4 py-3">
                    <button className="w-full h-12 bg-[#1A8FE5] text-white text-base font-bold leading-6 rounded-xl hover:bg-blue-600 transition-colors"
                    onClick={() => {alert("Test: booking confirmed!");}}>
                        Confirm and pay
                    </button>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
}