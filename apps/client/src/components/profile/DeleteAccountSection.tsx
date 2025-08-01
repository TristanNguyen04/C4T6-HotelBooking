import React from 'react';

interface DeleteAccountSectionProps {
    onDeleteClick: () => void;
}

export default function DeleteAccountSection({ onDeleteClick }: DeleteAccountSectionProps) {
    return (
        <div className="pt-8 border-t border-red-200">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-red-800 mb-2">Delete Account</h3>
                <p className="text-red-700 text-sm mb-4">
                    Once you delete your account, there is no going back. This will permanently delete your account, 
                    all your bookings, and remove all associated data. This action cannot be undone.
                </p>
                <button
                    data-cy={'delete-my-acc'}
                    onClick={onDeleteClick}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                    Delete My Account
                </button>
            </div>
        </div>
    );
}