import React, { useState } from 'react';

const HotelQuickActions: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
    const [showCopyPopup, setShowCopyPopup] = useState(false);

    const handleShareHotel = async () => {
        try {
            // Copy current URL to clipboard
            await navigator.clipboard.writeText(window.location.href);
            
            // Show success popup
            setShowCopyPopup(true);
            
            // Hide popup after 3 seconds
            setTimeout(() => {
                setShowCopyPopup(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to copy URL:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            setShowCopyPopup(true);
            setTimeout(() => {
                setShowCopyPopup(false);
            }, 3000);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
                <button 
                    onClick={onBookNow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Book Now
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                    Save to Favorites
                </button>
                <button 
                    onClick={handleShareHotel}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Share Hotel
                </button>
            </div>
            
            {/* Success Popup */}
            {showCopyPopup && (
                <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-10 animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Copied URL successfully!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelQuickActions; 