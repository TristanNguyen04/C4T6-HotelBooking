/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import Cookies from 'js-cookie';

type User = {
    id: string;
    email: string;
    name?: string
};

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const userCookie = Cookies.get('auth_user');
        const tokenCookie = Cookies.get('auth_token');
        
        if(userCookie && tokenCookie){
            try {
                const parsed = JSON.parse(userCookie);
                setUser(parsed);
                setToken(tokenCookie);
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                // Clear invalid cookies
                Cookies.remove('auth_user');
                Cookies.remove('auth_token');
            }
        }
    }, []);

    const login = (user: User, token: string) => {
        setUser(user);
        setToken(token);
        
        // Set cookies with security options
        const cookieOptions = {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict' as const, // CSRF protection
            path: '/'
        };
        
        Cookies.set('auth_user', JSON.stringify(user), cookieOptions);
        Cookies.set('auth_token', token, cookieOptions);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        
        Cookies.remove('auth_user', { path: '/' });
        Cookies.remove('auth_token', { path: '/' });
    }

    return (<AuthContext.Provider value = {{ user, token, login, logout }}>
        {children}
    </AuthContext.Provider>);
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error('useAuth must be used within AuthProvider');

    return ctx;
}


