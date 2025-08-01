import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { assets } from "../../assets/assets";
const StarRating = ({ rating, hotelCount }) => {
    return (_jsxs("div", { className: "flex items-center justify-between flex-1", children: [_jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4, 5].map((star) => (_jsx("img", { src: star <= rating ? assets.starIconFilled : assets.starIconOutlined, alt: star <= rating ? "filled star" : "outlined star", className: "w-4 h-4" }, star))) }), _jsxs("span", { "data-cy": `hotel-count-${rating}`, className: "text-xs text-gray-500 ml-2", children: ["(", hotelCount, ")"] })] }));
};
export default StarRating;
