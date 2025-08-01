import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const BookingFilterTabs = ({ activeFilter, setActiveFilter, filterCounts }) => {
    return (_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex flex-wrap gap-2 border-b border-gray-200", children: [_jsxs("button", { onClick: () => setActiveFilter('all'), className: `px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${activeFilter === 'all'
                        ? 'border-[#FF6B6B] text-[#FF6B6B]'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'}`, children: ["All (", filterCounts.all, ")"] }), _jsxs("button", { onClick: () => setActiveFilter('upcoming'), className: `px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${activeFilter === 'upcoming'
                        ? 'border-[#FF6B6B] text-[#FF6B6B]'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'}`, children: ["Upcoming (", filterCounts.upcoming, ")"] }), _jsxs("button", { onClick: () => setActiveFilter('past'), className: `px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${activeFilter === 'past'
                        ? 'border-[#FF6B6B] text-[#FF6B6B]'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'}`, children: ["Past (", filterCounts.past, ")"] })] }) }));
};
export default BookingFilterTabs;
