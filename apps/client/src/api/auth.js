import API from './axios';
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const resendVerificationEmail = (data) => API.post('/auth/resend-verification', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.patch('/auth/profile', data);
export const changePassword = (data) => API.patch('/auth/change-password', data);
export const deleteAccount = (data) => API.delete('/auth/delete-account', { data });
