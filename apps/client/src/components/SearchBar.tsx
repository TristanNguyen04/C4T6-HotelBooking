import { useState, useEffect, useReducer, useRef } from 'react';
import { searchLocations } from '../api/hotels';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDate, convertDateFormat } from '../utils/date';
import React from 'react';
import * as fecha from 'fecha';
// @ts-ignore
import HotelDatepicker from 'hotel-datepicker';
import 'hotel-datepicker/dist/css/hotel-datepicker.css';


interface Location {
    uid: string;
    term: string;
}

interface SearchBarProps {
    onSubmit: (payload: {
        destination: Location;
        checkin: string;
        checkout: string;
        guests: string
    }) => void;
    initialValues?: {
        destination?: Location;
        checkin?: string;
        checkout?: string;
        guests?: string;
    }
}

export default function SearchBar({ onSubmit, initialValues }: SearchBarProps){
    const [term, setTerm] = useState(initialValues?.destination?.term || '');
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [selected, setSelected] = useState<Location | null>(initialValues?.destination || null);
    const [checkin, setCheckin] = useState<Date | null>(parseDate(initialValues?.checkin));
    const [checkout, setCheckout] = useState<Date | null>(parseDate(initialValues?.checkout));
    const [guests, setGuests] = useState(initialValues?.guests || '2');
    const [showOccupancy, setShowOccupancy] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

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
        setGuests(String(adults + children))
    }, [adults, children])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selected || !checkin || !checkout) return;

        onSubmit({
            destination: selected,
            checkin: convertDateFormat(checkin!.toLocaleDateString()), // dd/MM/yyyy
            checkout: convertDateFormat(checkout!.toLocaleDateString()), // dd/MM/yyyy
            guests,
        });
    };

    return (
        <form
            onSubmit={handleSubmit} 
            className='bg-white text-gray-800 shadow-2xl rounded-xl px-4 py-6 md:px-6 md:py-4 
            flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-4 w-full max-w-none'>
            
            {/* Destination Field */}
            <div className="flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.8a7 7 0 1 1-11.6 0c0-1.9.7-3.7 1.9-5.2L12 2l4.9 6.6c1.2 1.5 1.9 3.3 1.9 5.2Z"/>
                    </svg>
                    <label htmlFor="destinationInput" className="text-sm font-medium text-gray-700">Destination</label>
                </div>
                <div className="relative">
                    <input 
                        list='destinations' 
                        id="destinationInput" 
                        type="text" 
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-500 
                        focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors" 
                        placeholder="Where are you going?" 
                        value={term}
                        onChange={e => {
                            setTerm(e.target.value);
                            setSelected(null);
                        }}
                        onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                        required />

                    {suggestions.length > 0 && !selected && (
                        <ul className="absolute z-30 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
                            {suggestions.map(dest => (
                                <li
                                    key={dest.uid}
                                    onClick={() => {
                                        setSelected(dest);
                                        setTerm(dest.term);
                                        setSuggestions([]);
                                    }}
                                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors text-sm"
                                >
                                    {dest.term}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Check-in Field */}
            <div className="flex-1 min-w-">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                    </svg>
                    <label htmlFor="checkIn" className="text-sm font-medium text-gray-700">Check in</label>
                </div>
                <DatePicker
                    selected={checkin}
                    onChange={(date: Date | null) => setCheckin(date)}
                    placeholderText='Select check-in date'
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-500 
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    wrapperClassName='w-full'
                    dateFormat="dd/MM/yyyy"
                    id="checkin"
                    minDate={new Date()}
                    maxDate={checkout || undefined}
                />
            </div>

            {/* Check-out Field */}
            <div className="flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                    </svg>
                    <label htmlFor="checkOut" className="text-sm font-medium text-gray-700">Check out</label>
                </div>
                <DatePicker
                    selected={checkout}
                    onChange={(date: Date | null) => setCheckout(date)}
                    placeholderText='Select check-out date'
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-500 
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    wrapperClassName='w-full'
                    dateFormat="dd/MM/yyyy"
                    id="checkOut"
                    minDate={checkin || new Date()}
                />
            </div>

            {/* Guests Field */}
            <div className="relative flex-1 min-w-0">
                <div className='flex items-center gap-2 mb-2'>
                    <svg className="w-4 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <label className="text-sm font-medium text-gray-700">Rooms & Guests</label>
                </div>
                <div
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm cursor-pointer bg-white 
                    hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    onClick={() => setShowOccupancy(prev => !prev)}
                    tabIndex={0}>
                    {rooms} room{rooms > 1 ? 's' : ''}, {adults} adult{adults > 1 ? 's' : ''}, {children} {children === 1 ? 'child' : 'children'}
                </div>

                {showOccupancy && (
                    <div 
                        className="absolute z-30 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 p-6 w-80 right-0 lg:right-auto lg:left-0"
                        onBlur={() => setShowOccupancy(false)}
                        tabIndex={0}
                    >
                        {[
                            { label: 'Rooms', value: rooms, setter: setRooms, min: 1 },
                            { label: 'Adults', value: adults, setter: setAdults, min: 1 },
                            { label: 'Children', value: children, setter: setChildren, min: 0 }
                        ].map(({ label, value, setter, min }) => (
                            <div key={label} className="flex justify-between items-center mb-4 last:mb-0">
                                <span className="text-sm font-medium text-gray-700">{label}</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 
                                        flex items-center justify-center transition-colors"
                                        onClick={() => setter(Math.max(min, value - 1))}
                                    >−</button>
                                    <span className="w-8 text-center font-medium">{value}</span>
                                    <button
                                        type="button"
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 
                                        flex items-center justify-center transition-colors"
                                        onClick={() => setter(value + 1)}
                                    >+</button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                            <button
                                type='button'
                                onClick={() => setShowOccupancy(false)}
                                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Search Button */}
            <button 
                type="submit"
                className='flex items-center justify-center gap-2 rounded-lg bg-[#FF6B6B] hover:bg-[#e56060] 
                py-3 px-6 text-white font-medium cursor-pointer transition-colors lg:flex-shrink-0 lg:self-end'>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
                <span>Search</span>
            </button>
        </form>
    )
}