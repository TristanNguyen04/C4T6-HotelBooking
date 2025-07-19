import React from 'react';

interface HotelDetailsErrorProps {
    error: string;
    onBackToSearch: () => void;
}

const HotelDetailsError: React.FC<HotelDetailsErrorProps> = ({ error, onBackToSearch }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Hotel</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={onBackToSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsError; 