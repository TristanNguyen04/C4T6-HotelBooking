import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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
        const stored = localStorage.getItem('auth');
        if(stored){
            const parsed = JSON.parse(stored);
            setUser(parsed.user);
            setToken(parsed.token);
        }
    }, []);

    const login = (user: User, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('auth', JSON.stringify({ user, token }));
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth');
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


