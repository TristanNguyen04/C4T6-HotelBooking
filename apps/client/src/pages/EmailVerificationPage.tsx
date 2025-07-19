import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function EmailVerificationPage(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if(!token){
            setStatus('error');
            setMessage('Missing verification token.');
            return;
        }

        axios.get(`/auth/verify-email?token=${token}`)
            .then(() => {
                setStatus('success');
                setMessage('Email verified! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            })
            .catch(err => {
                setStatus('error');
                setMessage(err.response?.data?.error || 'Verification failed!');
            })
    }, [searchParams, navigate]);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>
                {status === 'verifying' && 'Verifying your email...'}
                {status === 'success' && message}
                {status === 'error' && <span style= {{ color: 'red' }}>{message}</span>}
            </p>
        </div>
    );
}