import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getProfile, updateProfile, changePassword, deleteAccount } from "../api/auth";
import Spinner from "../components/Spinner";
import {
    ProfileHeader,
    ProfileInfoForm,
    PasswordChangeForm,
    DeleteAccountSection,
    DeleteConfirmationModal
} from "../components/profile";

export default function ProfilePage() {
    const { user, login, token, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Load current profile data on mount
    useEffect(() => {
        const loadProfile = async () => {
            if (!token) return;
            
            setLoading(true);
            try {
                await getProfile();
            } catch (err) {
                console.error('Failed to load profile:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [token]);

    // Handler for profile update
    const handleProfileUpdate = async (name: string) => {
        const res = await updateProfile({ name });
        
        // Update auth context with new user data
        if (user && token) {
            login({ ...user, name: res.data.user.name }, token);
        }
    };

    // Handler for password change
    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        await changePassword({ currentPassword, newPassword });
    };

    // Handler for delete account confirmation
    const handleDeleteConfirm = async (password: string) => {
        await deleteAccount({ password });
        
        // Log out user and redirect to home page
        logout();
        navigate('/', { replace: true });
    };

    // Handler for opening delete modal
    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    // Handler for closing delete modal
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
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
                    <ProfileHeader user={user} />

                    <div className="p-6 space-y-8">
                        <ProfileInfoForm user={user} onUpdate={handleProfileUpdate} />
                        <PasswordChangeForm onChangePassword={handlePasswordChange} />
                        <DeleteAccountSection onDeleteClick={handleDeleteClick} />
                    </div>
                </div>

                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleDeleteConfirm}
                />
            </div>
        </div>
    );
}
