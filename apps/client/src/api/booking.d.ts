import type { BookingDetails, PaymentItem } from '../types/hotel';
export declare const createBooking: (bookingData: BookingDetails) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getMyBookings: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const createCheckoutSession: (data: {
    items: PaymentItem[];
    userId: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const verifyPayment: (sessionId: string) => Promise<import("axios").AxiosResponse<any, any>>;
