import API from './axios';

export const addVerifiedUser = (data: { name: string; email: string; password: string }) =>
  API.post('/dbutil/add-verified-user', null, { params: data });