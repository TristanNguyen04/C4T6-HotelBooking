import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';

interface User {
    id: string;
    email: string;
    name?: string;
}

interface ProfileInfoFormProps {
    user: User | null;
    onUpdate: (name: string) => Promise<void>;
}

export default function ProfileInfoForm({ user, onUpdate }: ProfileInfoFormProps) {
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setName(user?.name || '');
    }, [user?.name]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!name.trim()) {
            setError('Name is required');
            setLoading(false);
            return;
        }

        try {
            await onUpdate(name.trim());
            setSuccess('Profile updated successfully!');
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'response' in err && 
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Failed to update profile. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                        placeholder="Enter your full name"
                        disabled={loading}
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
                </div>

                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    {loading && <Spinner />}
                    <span>{loading ? 'Updating...' : 'Update Profile'}</span>
                </button>
            </form>
        </div>
    );
}