import { useState, useEffect } from 'react';
import { searchHotels, searchLocations } from '../api/hotels';
import { useNavigate } from 'react-router-dom';

export default function HomePage(){
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [guests, setGuests] = useState('2');
    const navigate = useNavigate();

    useEffect(() => {
        if(term.length < 1){
            setSuggestions([]);
            return;
        }
        
        const delay = setTimeout( () => {
        searchLocations(term)
            .then(res => {
                console.log(res.data)
                setSuggestions(res.data)
            })
            .catch(() => setSuggestions([]));
        }, 300);

        return () => clearTimeout(delay);

    }, [term]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!selected || !checkin || !checkout) return;
        navigate(`/search?destination_id=${selected.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`)
    };

    return (
        <div>
            <h2>Search Hotels</h2>
            <form onSubmit={handleSubmit}>
                <input value={term} onChange={e => {setTerm(e.target.value); setSelected(null);}} placeholder='Search destination...'/>

                {suggestions.length > 0 && !selected && (
                    <ul style={{ border: '1px solid #ccc', padding: '0.5rem'}}>
                        {suggestions.map(dest => (
                            <li key={dest.uid}
                                onClick={() => {
                                    setSelected(dest);
                                    setTerm(dest.term);
                                    setSuggestions([]);
                                }}
                                style={{cursor: 'pointer', padding: '4px 0'}}>
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
        </div>
    );
}