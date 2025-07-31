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

const BookingFilterTabs: React.FC<BookingFilterTabsProps> = ({
  activeFilter,
  setActiveFilter,
  filterCounts
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeFilter === 'all'
              ? 'border-[#FF6B6B] text-[#FF6B6B]'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          All ({filterCounts.all})
        </button>
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeFilter === 'upcoming'
              ? 'border-[#FF6B6B] text-[#FF6B6B]'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          Upcoming ({filterCounts.upcoming})
        </button>
        <button
          onClick={() => setActiveFilter('past')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeFilter === 'past'
              ? 'border-[#FF6B6B] text-[#FF6B6B]'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          Past ({filterCounts.past})
        </button>
      </div>
    </div>
  );
};

export default BookingFilterTabs;