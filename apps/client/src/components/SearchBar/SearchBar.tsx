import { useState, useEffect } from 'react';
import { searchLocations } from '../../api/hotels'; 

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
    const [checkin, setCheckin] = useState(initialValues?.checkin || '');
    const [checkout, setCheckout] = useState(initialValues?.checkout || '');
    const [guests, setGuests] = useState(initialValues?.guests || '2');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selected || !checkin || !checkout) return;

        onSubmit({
            destination: selected,
            checkin,
            checkout,
            guests,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={term}
                onChange={e => {
                    setTerm(e.target.value);
                    setSelected(null);
                }}
                placeholder="Search destination..."
            />

            {suggestions.length > 0 && !selected && (
                <ul style={{ border: '1px solid #ccc', padding: '0.5rem'}}>
                    {suggestions.map(dest => (
                        <li
                            key={dest.uid}
                            onClick={() => {
                                setSelected(dest);
                                setTerm(dest.term);
                                setSuggestions([]);
                            }}
                            style={{ cursor: 'pointer', padding: '4px 0' }}
                        >
                            {dest.term}
                        </li>
                    ))}
                </ul>
            )}

            <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)}/>
            <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)}/>
            <input type="number" min={1} value={guests} onChange={e => setGuests(e.target.value)}/>

            <button type="submit">Search</button> 
        </form>
    )
}