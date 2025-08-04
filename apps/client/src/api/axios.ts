import axios from 'axios';
import Cookies from 'js-cookie';

const isTest = window.location.pathname.startsWith('/test/');

const API = axios.create({
  baseURL: isTest
    ? (import.meta.env.VITE_TEST_API_URL || 'http://localhost:3000/test/api')
    : (import.meta.env.VITE_API_URL || 'http://localhost:3000/api')
});

API.interceptors.request.use((config) => {
    const token = Cookies.get('auth_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default API;