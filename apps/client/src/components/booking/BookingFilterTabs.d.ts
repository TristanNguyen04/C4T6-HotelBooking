import React from 'react';
export type FilterType = 'all' | 'upcoming' | 'past';
export interface FilterCounts {
    all: number;
    upcoming: number;
    past: number;
}
interface BookingFilterTabsProps {
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
    filterCounts: FilterCounts;
}
declare const BookingFilterTabs: React.FC<BookingFilterTabsProps>;
export default BookingFilterTabs;
