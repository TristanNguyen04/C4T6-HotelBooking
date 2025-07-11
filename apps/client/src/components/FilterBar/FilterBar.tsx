// components/FilterBar/FilterBar.tsx
import React from 'react';
import type { SortOption } from "../../types/hotel";

interface Histogram {
    bins: number[];
    min: number;
    max: number;
}

interface FilterBarProps {
    histogram: Histogram | null;
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
    priceMin: number;
    setPriceMin: (val: number) => void;
    priceMax: number;
    setPriceMax: (val: number) => void;
    minStars: number | '';
    setMinStars: (val: number | '') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    histogram,
    sortOption,
    setSortOption,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    minStars,
    setMinStars
}) => {
    if (!histogram) return null;

    return (
        <>
            <div style={{ width: '100%', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '80px', gap: '4px', marginBottom: '8px' }}>
                    {histogram.bins.map((count, i) => {
                        const maxCount = Math.max(...histogram.bins);
                        const height = (count / maxCount) * 100;
                        return (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    height: `${height}%`,
                                    backgroundColor: '#4a90e2',
                                    borderRadius: '2px'
                                }}
                                title={`${count} hotels`}
                            />
                        );
                    })}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="range"
                        min={histogram.min}
                        max={histogram.max}
                        step={1}
                        value={priceMin}
                        onChange={e => {
                            const val = parseFloat(e.target.value);
                            if (val <= priceMax) setPriceMin(val);
                        }}
                        style={{ flex: 1 }}
                    />
                    <input
                        type="range"
                        min={histogram.min}
                        max={histogram.max}
                        step={1}
                        value={priceMax}
                        onChange={e => {
                            const val = parseFloat(e.target.value);
                            if (val >= priceMin) setPriceMax(val);
                        }}
                        style={{ flex: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>{Math.floor(histogram.min)}</span>
                    <span>{Math.ceil(histogram.max)}</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: "1rem" }}>
                <div>
                    <label>
                        Sort:&nbsp;
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                        >
                            <option value="Price (Low to High)">Price (Low to High)</option>
                            <option value="Price (High to Low)">Price (High to Low)</option>
                            <option value="Distance (Close to Far)">Distance (Close to Far)</option>
                            <option value="Distance (Far to Close)">Distance (Far to Close)</option>
                            <option value="Star Rating (Low to High)">Star Rating (Low to High)</option>
                            <option value="Star Rating (High to Low)">Star Rating (High to Low)</option>
                            <option value="Relevance (Default)">Relevance (Default)</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Price Min:&nbsp;
                        <input
                            type="number"
                            min={0}
                            value={priceMin}
                            onChange={e => setPriceMin(e.target.value ? parseFloat(e.target.value) : 0)}
                        />
                    </label>
                </div>
                <div>
                    <label>Price Max:&nbsp;
                        <input
                            type="number"
                            min={0}
                            value={priceMax}
                            onChange={e => setPriceMax(e.target.value ? parseFloat(e.target.value) : Infinity)}
                        />
                    </label>
                </div>
                <div>
                    <label>Minimum Stars:&nbsp;
                        <input
                            type="number"
                            min={0}
                            max={5}
                            step={0.5}
                            value={minStars}
                            onChange={e => setMinStars(e.target.value ? parseFloat(e.target.value) : '')}
                        />
                    </label>
                </div>
            </div>
        </>
    );
};

export default FilterBar;