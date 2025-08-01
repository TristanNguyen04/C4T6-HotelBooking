interface Location {
    uid: string;
    term: string;
    type?: string;
}
interface SearchBarProps {
    onSubmit: (payload: {
        destination: Location;
        checkin: string;
        checkout: string;
        guests: string;
        rooms: number;
        adults: number;
        children: number;
        childrenAges: number[];
    }) => void;
    initialValues?: {
        destination?: Location;
        checkin?: string;
        checkout?: string;
        guests?: string;
        rooms?: number;
        adults?: number;
        children?: number;
        childrenAges?: number[];
    };
}
export default function SearchBar({ onSubmit, initialValues }: SearchBarProps): import("react/jsx-runtime").JSX.Element;
export {};
