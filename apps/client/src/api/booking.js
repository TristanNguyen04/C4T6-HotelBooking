import API from './axios';
export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getMyBookings = () => API.get('/bookings/me');
export const createCheckoutSession = (data) => API.post('/payments/checkout', data);
export const verifyPayment = (sessionId) => API.post('/payments/success', { sessionId });
