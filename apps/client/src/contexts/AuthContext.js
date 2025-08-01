import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const userCookie = Cookies.get('auth_user');
        const tokenCookie = Cookies.get('auth_token');
        if (userCookie && tokenCookie) {
            try {
                const parsed = JSON.parse(userCookie);
                setUser(parsed);
                setToken(tokenCookie);
            }
            catch (error) {
                console.error('Error parsing user cookie:', error);
                // Clear invalid cookies
                Cookies.remove('auth_user');
                Cookies.remove('auth_token');
            }
        }
    }, []);
    const login = (user, token) => {
        setUser(user);
        setToken(token);
        // Set cookies with security options
        const cookieOptions = {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict', // CSRF protection
            path: '/'
        };
        Cookies.set('auth_user', JSON.stringify(user), cookieOptions);
        Cookies.set('auth_token', token, cookieOptions);
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('auth_user', { path: '/' });
        Cookies.remove('auth_token', { path: '/' });
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, login, logout }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
