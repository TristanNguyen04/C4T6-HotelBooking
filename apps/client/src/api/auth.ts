import API from './axios';

export const login = (data: {
    email: string; password: string
}) => API.post('/auth/login', data);

export const register = (data: {
    email: string; password: string; name?: string
}) => API.post('/auth/register', data);

export const resendVerificationEmail = (data: {
    email: string
}) => API.post('/auth/resend-verification', data);