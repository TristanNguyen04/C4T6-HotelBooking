import React from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
}

interface ProfileHeaderProps {
    user: User | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
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
    );
}