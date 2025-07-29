import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getProfile, updateProfile, changePassword } from "../api/auth";
import Spinner from "../components/Spinner";

export default function ProfilePage() {
    const { user, login, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    
    // Profile form state
    const [name, setName] = useState(user?.name || '');
    const [profileError, setProfileError] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');
    
    // Password form state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    // Load current profile data
    useEffect(() => {
        const loadProfile = async () => {
            if (!token) return;
            
            setLoading(true);
            try {
                const res = await getProfile();
                setName(res.data.user.name || '');
            } catch (err) {
                console.error('Failed to load profile:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [token]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileError('');
        setProfileSuccess('');
        setProfileLoading(true);

        if (!name.trim()) {
            setProfileError('Name is required');
            setProfileLoading(false);
            return;
        }

        try {
            const res = await updateProfile({ name: name.trim() });
            
            // Update auth context with new user data
            if (user && token) {
                login({ ...user, name: res.data.user.name }, token);
            }
            
            setProfileSuccess('Profile updated successfully!');
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'response' in err && 
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Failed to update profile. Please try again.';
            setProfileError(errorMessage);
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        setPasswordLoading(true);

        if (!currentPassword || !newPassword) {
            setPasswordError('All fields are required');
            setPasswordLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters long');
            setPasswordLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            setPasswordLoading(false);
            return;
        }

        try {
            await changePassword({ currentPassword, newPassword });
            setPasswordSuccess('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'response' in err && 
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Failed to change password. Please try again.';
            setPasswordError(errorMessage);
        } finally {
            setPasswordLoading(false);
        }
    };

    if (loading) {
        return (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Spinner />
                </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8 mt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#FF6B6B] px-6 py-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white text-[#FF6B6B] rounded-full flex items-center justify-center font-bold text-2xl">
                                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="text-white">
                                <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
                                <p className="text-red-100">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Profile Information Section */}
                        <div className="border-b border-gray-200 pb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                            <form onSubmit={handleProfileSubmit} className="space-y-4">
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
                                        disabled={profileLoading}
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

                                {profileError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                        {profileError}
                                    </div>
                                )}

                                {profileSuccess && (
                                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                                        {profileSuccess}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {profileLoading && <Spinner />}
                                    <span>{profileLoading ? 'Updating...' : 'Update Profile'}</span>
                                </button>
                            </form>
                        </div>

                        {/* Change Password Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                                        placeholder="Enter your current password"
                                        disabled={passwordLoading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                                        placeholder="Enter your new password"
                                        disabled={passwordLoading}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                                        placeholder="Confirm your new password"
                                        disabled={passwordLoading}
                                    />
                                </div>

                                {passwordError && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                        {passwordError}
                                    </div>
                                )}

                                {passwordSuccess && (
                                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                                        {passwordSuccess}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {passwordLoading && <Spinner />}
                                    <span>{passwordLoading ? 'Changing...' : 'Change Password'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
