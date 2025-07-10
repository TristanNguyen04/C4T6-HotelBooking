import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register( { email, password, name });
            setSuccess("Check your email to verify your account");
            setSubmitted(true);
        } catch(err: any){
            setError(err?.response?.data?.error || 'Registration failed!');
        }
    };

    if(submitted){
        return (
            <div>
                <h2>Registration Complete</h2>
                <p>{success}</p>
                <p>You can log in after verifying your email.</p>
                <Link to="/login">
                    <button>Go to Login</button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={ {color: 'red' }}>{error}</p>}
            
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required/> 
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/> 
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required/>
            <button type="submit">Register</button>
        </form>
    );
}