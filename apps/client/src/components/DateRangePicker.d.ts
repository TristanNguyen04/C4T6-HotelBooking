export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}
interface DateRangePickerProps {
    dateRange: DateRange;
    onChange: (range: DateRange) => void;
    isOpen: boolean;
    onToggle: () => void;
    minDate?: Date;
}
export default function DateRangePicker({ dateRange, onChange, isOpen, onToggle, minDate }: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
