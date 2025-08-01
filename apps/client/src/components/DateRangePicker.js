import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
export default function DateRangePicker({ dateRange, onChange, isOpen, onToggle, minDate }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectingEnd, setSelectingEnd] = useState(false);
    const dropdownRef = useRef(null);
    // Get the effective minimum date (use minDate prop or default to today)
    const getMinDate = () => {
        const effectiveMinDate = minDate || new Date();
        effectiveMinDate.setHours(0, 0, 0, 0);
        return effectiveMinDate;
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onToggle();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);
    const calculateNights = () => {
        if (!dateRange.startDate || !dateRange.endDate)
            return 0;
        const timeDiff = dateRange.endDate.getTime() - dateRange.startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    const formatDateRange = () => {
        if (!dateRange.startDate && !dateRange.endDate) {
            return 'Select dates';
        }
        if (dateRange.startDate && !dateRange.endDate) {
            return `${dateRange.startDate.toLocaleDateString('en-GB')} - Select end date`;
        }
        if (dateRange.startDate && dateRange.endDate) {
            return `${dateRange.startDate.toLocaleDateString('en-GB')} - ${dateRange.endDate.toLocaleDateString('en-GB')}`;
        }
        return 'Select dates';
    };
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(new Date(year, month, day));
        }
        return days;
    };
    const handleDateClick = (date) => {
        const minSelectableDate = getMinDate();
        if (date < minSelectableDate)
            return;
        if (!dateRange.startDate || selectingEnd) {
            if (!dateRange.startDate) {
                onChange({ startDate: date, endDate: null });
                setSelectingEnd(true);
            }
            else {
                if (date >= dateRange.startDate) {
                    onChange({ ...dateRange, endDate: date });
                    setSelectingEnd(false);
                }
                else {
                    onChange({ startDate: date, endDate: null });
                    setSelectingEnd(true);
                }
            }
        }
        else {
            if (date >= dateRange.startDate) {
                onChange({ ...dateRange, endDate: date });
                setSelectingEnd(false);
            }
            else {
                onChange({ startDate: date, endDate: null });
                setSelectingEnd(true);
            }
        }
    };
    const isDateInRange = (date) => {
        if (!dateRange.startDate || !dateRange.endDate)
            return false;
        return date >= dateRange.startDate && date <= dateRange.endDate;
    };
    const isDateSelected = (date) => {
        return (dateRange.startDate && date.getTime() === dateRange.startDate.getTime()) ||
            (dateRange.endDate && date.getTime() === dateRange.endDate.getTime());
    };
    const isPastDate = (date) => {
        const minSelectableDate = getMinDate();
        return date < minSelectableDate;
    };
    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            if (direction === 'prev') {
                newMonth.setMonth(prev.getMonth() - 1);
            }
            else {
                newMonth.setMonth(prev.getMonth() + 1);
            }
            return newMonth;
        });
    };
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("div", { onClick: onToggle, "data-cy": "stay-period-toggle", className: "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm cursor-pointer bg-white \n                hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors", children: formatDateRange() }), isOpen && (_jsxs("div", { ref: dropdownRef, className: "absolute z-30 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 p-4 w-80 right-0 lg:right-auto lg:left-0", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("button", { type: "button", "data-cy": `calendar-previous-month`, onClick: () => navigateMonth('prev'), className: "p-1 rounded hover:bg-gray-100", children: _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsx("h3", { className: "text-lg font-semibold", "data-cy": `stay-period-month`, children: currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) }), _jsx("button", { type: "button", "data-cy": `calendar-next-month`, onClick: () => navigateMonth('next'), className: "p-1 rounded hover:bg-gray-100", children: _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })] }), _jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (_jsx("div", { className: "text-center text-xs font-medium text-gray-500 py-2", children: day }, day))) }), _jsx("div", { className: "grid grid-cols-7 gap-1", children: getDaysInMonth(currentMonth).map((date, index) => (_jsx("div", { className: "aspect-square", children: date && (_jsx("button", { type: "button", onClick: () => handleDateClick(date), disabled: isPastDate(date), className: `
                                            w-full h-full rounded text-sm transition-colors
                                            ${isPastDate(date)
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'hover:bg-blue-100 cursor-pointer'}
                                            ${isDateSelected(date)
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : ''}
                                            ${isDateInRange(date) && !isDateSelected(date)
                                    ? 'bg-blue-100 text-blue-600'
                                    : ''}
                                        `, children: date.getDate() })) }, index))) }), dateRange.startDate && dateRange.endDate && (_jsx("div", { className: "mt-3 mb-2 p-2 bg-blue-50 rounded-lg border border-blue-200", children: _jsxs("div", { className: "text-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Total stay: " }), _jsxs("span", { className: "font-semibold text-blue-700", children: [calculateNights(), " ", calculateNights() === 1 ? 'night' : 'nights'] })] }) })), _jsxs("div", { className: "flex justify-between mt-4 pt-4 border-t border-gray-200", children: [_jsx("button", { type: "button", onClick: () => {
                                    onChange({ startDate: null, endDate: null });
                                    setSelectingEnd(false);
                                }, className: "px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors", children: "Clear" }), _jsx("button", { type: "button", onClick: onToggle, className: "px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors", children: "Done" })] })] }))] }));
}
