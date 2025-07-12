import { useState, useEffect } from 'react';
import { searchLocations } from '../../api/hotels';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDate } from '../../utils/date';


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
            checkin: checkin!.toISOString().split('T')[0], // YYYY-MM-DD
            checkout: checkout!.toISOString().split('T')[0], // YYYY-MM-DD
            guests,
        });
    };

    return (
        <form
            onSubmit={handleSubmit} 
            className='bg-white text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>
            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <div className="relative">
                    <input 
                    list='destinations' 
                    id="destinationInput" 
                    type="text" 
                    className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
                    placeholder="Where are you going?" 
                    value={term}
                    onChange={e => {
                        setTerm(e.target.value);
                        setSelected(null);
                    }}
                    onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                    required />

                    {suggestions.length > 0 && !selected && (
                        <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded shadow-md mt-1 max-h-60 overflow-auto text-sm">
                            {suggestions.map(dest => (
                                <li
                                    key={dest.uid}
                                    onClick={() => {
                                        setSelected(dest);
                                        setTerm(dest.term);
                                        setSuggestions([]);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {dest.term}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <DatePicker
                    selected={checkin}
                    onChange={(date: Date | null) => setCheckin(date)}
                    placeholderText='Select check-in date'
                    className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                    dateFormat="yyyy-MM-dd"
                    id="checkin"
                    minDate={new Date() ?? undefined}
                />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkOut">Check out</label>
                </div>

                <DatePicker
                    selected={checkout}
                    onChange={(date: Date | null) => setCheckout(date)}
                    placeholderText='Select check-out date'
                    className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                    dateFormat="yyyy-MM-dd"
                    id="checkOut"
                    minDate={checkin ?? undefined}
                />
            </div>

            <div className="relative">
                <label className="block mb-1">
                    Room and Guests
                </label>
                <div
                    className="rounded border border-gray-200 px-3 py-1.5 text-sm cursor-pointer bg-white"
                    onClick={() => setShowOccupancy(prev => !prev)}>
                        {rooms} room{rooms > 1 ? 's' : ''}, {adults} adult{adults > 1 ? 's' : ''}, {children} {children === 1 ? 'child' : 'children'}
                </div>

                {showOccupancy && (
                    <div 
                        className="absolute z-20 bg-white border border-gray-300 rounded shadow-md mt-2 p-4 w-64"
                        onBlur={() => setShowOccupancy(false)}
                        tabIndex={0}
                    >
                        {
                            [
                                { label: 'Rooms', value: rooms, setter: setRooms, min: 1 },
                                { label: 'Adults', value: adults, setter: setAdults, min: 1 },
                                { label: 'Children', value: children, setter: setChildren, min: 0 }
                            ].map(({ label, value, setter, min }) => (
                                <div key={label} className="flex justify-between items-center mb-3">
                                    <span>
                                        {label}
                                    </span>
                                    <div className="flex items-center gap-2">
                                    <button
                                            type="button"
                                            className="w-6 h-6 rounded bg-gray-200 text-sm"
                                            onClick={() => setter(Math.max(min, value - 1))}
                                        >−</button>
                                        <span className="w-6 text-center">{value}</span>
                                        <button
                                            type="button"
                                            className="w-6 h-6 rounded bg-gray-200 text-sm"
                                            onClick={() => setter(value + 1)}
                                        >+</button>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="flex justify-end mt-2">
                            <button
                                type='button'
                                onClick={() => {
                                    setShowOccupancy(false);
                                }}
                                className="px-3 py-1 text-sm bg-black text-white rounded">
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <button 
                type="submit"
                className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <span>Search</span>
            </button>
        </form>
    )
}