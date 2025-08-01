import type { Room, BookingPriceBreakdown } from "../types/hotel";
export interface PriceCalculationOptions {
    nights: number;
    showExcludedFees?: boolean;
}
export declare const calculateRoomPrice: (room: Room, options: PriceCalculationOptions) => BookingPriceBreakdown;
export declare const formatPrice: (amount: number, currency?: string) => string;
