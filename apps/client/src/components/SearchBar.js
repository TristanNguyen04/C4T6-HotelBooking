import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { searchLocations } from '../api/hotels';
import { parseDate, convertDateFormat } from '../utils/date';
import DateRangePicker, {} from './DateRangePicker';
import React from 'react';
export default function SearchBar({ onSubmit, initialValues }) {
    const [term, setTerm] = useState(initialValues?.destination?.term || '');
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(initialValues?.destination || null);
    const [dateRange, setDateRange] = useState({
        startDate: parseDate(initialValues?.checkin),
        endDate: parseDate(initialValues?.checkout)
    });
    const [guests, setGuests] = useState(initialValues?.guests || '2');
    const [showOccupancy, setShowOccupancy] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [rooms, setRooms] = useState(initialValues?.rooms || 1);
    const [adults, setAdults] = useState(initialValues?.adults || 2);
    const [children, setChildren] = useState(initialValues?.children || 0);
    const [childrenAges, setChildrenAges] = useState(initialValues?.childrenAges || []);
    const occupancyRef = useRef(null);
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';
    const isHotelPage = location.pathname.includes('/hotel/');
    useEffect(() => {
        if (term.length < 1) {
            setSuggestions([]);
            return;
        }
        const delay = setTimeout(() => {
            searchLocations(term)
                .then(res => {
                setSuggestions(res.data);
            })
                .catch(() => setSuggestions([]));
        }, 300);
        return () => clearTimeout(delay);
    }, [term]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (occupancyRef.current && !occupancyRef.current.contains(event.target)) {
                setShowOccupancy(false);
            }
        }
        if (showOccupancy) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOccupancy]);
    useEffect(() => {
        const guestsReq = adults;
        let req = "";
        for (let i = 0; i < rooms; i++) {
            req += guestsReq;
            if (i != rooms - 1) {
                req += '|';
            }
        }
        if (children > 0 && rooms < 2) {
            req += ':';
        }
        req += childrenAges.join(',');
        setGuests(req);
    }, [children, adults, childrenAges, rooms]);
    // Business logic: Reset children to 0 when rooms >= 2
    useEffect(() => {
        if (rooms >= 2 && children > 0) {
            setChildren(0);
            setChildrenAges([]);
        }
    }, [rooms, children]);
    // Update childrenAges array when children count changes
    useEffect(() => {
        if (children > childrenAges.length) {
            const newAges = [...childrenAges];
            for (let i = childrenAges.length; i < children; i++) {
                newAges.push(5);
            }
            setChildrenAges(newAges);
        }
        else if (children < childrenAges.length) {
            setChildrenAges(childrenAges.slice(0, children));
        }
    }, [children, childrenAges]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected || !dateRange.startDate || !dateRange.endDate)
            return;
        onSubmit({
            destination: selected,
            checkin: convertDateFormat(dateRange.startDate.toLocaleDateString('en-GB')), // dd/MM/yyyy
            checkout: convertDateFormat(dateRange.endDate.toLocaleDateString('en-GB')), // dd/MM/yyyy
            guests,
            rooms,
            adults,
            children,
            childrenAges
        });
    };
    const updateChildAge = (index, age) => {
        const newAges = [...childrenAges];
        newAges[index] = age;
        setChildrenAges(newAges);
    };
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    return (_jsxs("form", { onSubmit: handleSubmit, autoComplete: "off", className: 'bg-white text-gray-800 shadow-2xl rounded-xl px-3 py-3 md:px-4 md:py-3 \n            flex flex-col lg:flex-row lg:items-end gap-3 lg:gap-3 w-full max-w-none', children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: 'flex items-center gap-2 mb-1', children: [_jsxs("svg", { className: "w-4 h-4 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "2", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" })] }), _jsx("label", { htmlFor: "destinationInput", className: "text-sm font-medium text-gray-700", children: "Destination" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { list: 'destinations', id: "destinationInput", "data-cy": "DestinationSearch", type: "text", autoComplete: "off", className: `w-full rounded-lg border border-gray-300 text-sm placeholder-gray-500 
                        focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors
                        ${isSearchPage || isHotelPage ? 'px-3 py-2' : 'px-4 py-3'}`, placeholder: "Where are you going?", value: term, onChange: e => {
                                    setTerm(e.target.value);
                                    setSelected(null);
                                }, onFocus: () => {
                                    // Re-fetch suggestions if there's text in the input
                                    if (term.length >= 1) {
                                        searchLocations(term)
                                            .then(res => {
                                            setSuggestions(res.data);
                                        })
                                            .catch(() => setSuggestions([]));
                                    }
                                }, onBlur: () => setTimeout(() => setSuggestions([]), 100), required: true }), suggestions.length > 0 && !selected && (_jsx("ul", { className: "absolute z-30 left-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto min-w-full w-max max-w-2xl", children: suggestions.map(dest => (_jsx("li", { "data-cy": 'DestinationSuggestions', onClick: () => {
                                        setSelected(dest);
                                        setTerm(dest.term);
                                        setSuggestions([]);
                                    }, className: "px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 group whitespace-nowrap", children: _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1", children: [_jsxs("div", { className: "flex-shrink-0", children: [dest.type === 'city' && (_jsx("svg", { className: "w-4 h-4 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) })), dest.type === 'hotel' && (_jsxs("svg", { className: "w-4 h-4 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" })] })), dest.type === 'airport' && (_jsx("svg", { className: "w-4 h-4 text-purple-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })), (!dest.type || !['city', 'hotel', 'airport'].includes(dest.type)) && (_jsxs("svg", { className: "w-4 h-4 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })] }))] }), _jsx("div", { className: "text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors", children: dest.term })] }), _jsx("div", { className: "flex-shrink-0 ml-2", children: dest.type && (_jsx("span", { className: `
                                                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize
                                                    ${dest.type === 'city' ? 'bg-blue-100 text-blue-800' :
                                                        dest.type === 'hotel' ? 'bg-green-100 text-green-800' :
                                                            dest.type === 'airport' ? 'bg-purple-100 text-purple-800' :
                                                                'bg-gray-100 text-gray-800'}
                                                `, children: dest.type })) })] }) }, dest.uid))) }))] })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: 'flex items-center gap-2 mb-1', children: [_jsx("svg", { className: "w-4 h-4 text-gray-600", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", children: _jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" }) }), _jsx("label", { className: "text-sm font-medium text-gray-700", children: "Stay Period" })] }), _jsx(DateRangePicker, { dateRange: dateRange, onChange: setDateRange, isOpen: showDatePicker, onToggle: () => setShowDatePicker(prev => !prev), minDate: threeDaysFromNow })] }), _jsxs("div", { className: "relative flex-1 min-w-0", children: [_jsxs("div", { className: 'flex items-center gap-2 mb-2', children: [_jsx("svg", { className: "w-4 h-4 text-gray-600", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", children: _jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }) }), _jsx("label", { className: "text-sm font-medium text-gray-700", children: "Rooms & Guests" })] }), _jsxs("div", { className: `w-full rounded-lg border border-gray-300 text-sm cursor-pointer bg-white 
                    hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors
                    ${isSearchPage || isHotelPage ? 'px-3 py-2' : 'px-4 py-3'}`, "data-cy": `room-guest-selector`, onClick: () => setShowOccupancy(prev => !prev), tabIndex: 0, children: [rooms, " room", rooms > 1 ? 's' : '', ", ", adults, " adult", adults > 1 ? 's' : '', ", ", children, " ", children === 1 ? 'child' : 'children'] }), showOccupancy && (_jsxs("div", { ref: occupancyRef, className: "absolute z-30 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 p-6 w-80 right-0 lg:right-auto lg:left-0", tabIndex: 0, children: [[
                                { label: 'Rooms', value: rooms, setter: setRooms, min: 1, max: 4 },
                                { label: 'Adults', value: adults, setter: setAdults, min: 1, max: 4 },
                                { label: 'Children', value: children, setter: setChildren, min: 0, max: 4, disabled: rooms >= 2 }
                            ].map(({ label, value, setter, min, max, disabled }) => (_jsxs("div", { className: "flex justify-between items-center mb-4 last:mb-0", "data-cy": `occupancy-${label.toLowerCase()}`, children: [_jsxs("span", { className: `text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`, children: [label, disabled && label === 'Children' && (_jsx("span", { className: "text-xs text-gray-400 block", children: "(Not available for 2+ rooms)" }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", "data-cy": `decrement-${label.toLowerCase()}`, className: `w-8 h-8 rounded-full flex items-center justify-center transition-colors ${disabled
                                                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`, onClick: () => !disabled && setter(Math.max(min, value - 1)), disabled: disabled, children: "\u2212" }), _jsx("span", { className: `w-8 text-center font-medium ${disabled ? 'text-gray-400' : ''}`, children: value }), _jsx("button", { type: "button", "data-cy": `increment-${label.toLowerCase()}`, className: `w-8 h-8 rounded-full flex items-center justify-center transition-colors ${disabled
                                                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`, onClick: () => !disabled && setter(Math.min(max, value + 1)), disabled: disabled, children: "+" })] })] }, label))), children > 0 && (_jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-3", children: "Children Ages" }), _jsx("div", { className: "space-y-3", children: Array.from({ length: children }, (_, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Child ", index + 1] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "number", min: "0", max: "17", autoComplete: "off", "data-cy": `children-${index + 1}`, value: childrenAges[index] ?? '', onChange: (e) => {
                                                                const value = e.target.value;
                                                                const parsed = value === '' ? 5 : parseInt(value);
                                                                updateChildAge(index, parsed);
                                                            }, className: "w-16 px-2 py-1 text-sm border border-gray-300 rounded \n                                                    focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20" }), _jsxs("span", { className: "text-xs text-gray-500", children: ["year", childrenAges[index] == 1 ? '' : 's', " old"] })] })] }, index))) })] })), _jsx("div", { className: "flex justify-end mt-4 pt-4 border-t border-gray-200", children: _jsx("button", { type: 'button', onClick: () => setShowOccupancy(false), className: "px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors", children: "Done" }) })] }))] }), _jsxs("button", { type: "submit", className: "CartBtn lg:self-end", children: [_jsx("span", { className: "IconContainer", children: _jsx("svg", { className: "icon", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: _jsx("path", { d: "m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" }) }) }), _jsx("span", { className: "text", children: "Search" })] })] }));
}
