import type { Hotel, SearchContext } from '../types/hotel';
interface HotelCardProps {
    hotel: Hotel;
    searchContext: SearchContext;
    showTotalPrice?: boolean;
}
export default function HotelCard({ hotel, searchContext, showTotalPrice }: HotelCardProps): import("react/jsx-runtime").JSX.Element;
export {};
