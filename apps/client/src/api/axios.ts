import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

API.interceptors.request.use((config) => {
    const authData = localStorage.getItem('auth');
    if(authData){
        const { token } = JSON.parse(authData);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default API;