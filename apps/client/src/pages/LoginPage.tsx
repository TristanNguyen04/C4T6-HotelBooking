import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login: doLogin } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await login( { email, password });

            if(res.data.user.isVerified){
                setError('Please verify your email before logging in.');
                return;
            }
            
            doLogin(res.data.user, res.data.token);
            navigate('/home');
        } catch(err: any){
            setError(err?.response?.data?.error || 'Login failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={ {color: 'red' }}>{error}</p>}
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/> 
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
            <button type="submit">Login</button>
        </form>
    );
}