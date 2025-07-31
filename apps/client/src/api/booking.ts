import API from './axios';
import type { BookingDetails, PaymentItem } from '../types/hotel';

export const createBooking = (bookingData: BookingDetails) => 
  API.post('/bookings', bookingData);

export const getMyBookings = () => 
  API.get('/bookings/me');

export const createCheckoutSession = (data: { items: PaymentItem[], userId: string }) =>
  API.post('/payments/checkout', data);

export const verifyPayment = (sessionId: string) =>
  API.post('/payments/success', { sessionId }); 