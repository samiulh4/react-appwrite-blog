import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../services/AppWriteService';
import { showSuccessAlert, showErrorAlert } from '../utils/sweetAlert';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await appwriteService.getCurrentUser();
                if (userData) {
                    setUser(userData);
                    setFormData({
                        name: userData.name,
                        email: userData.email
                    });
                } else {
                    navigate('/signin');
                }
            } catch (error) {
                showErrorAlert('Error fetching user data');
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        }
        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user profile logic here when Appwrite provides the method
            // For now, we can only view the profile
            showSuccessAlert('Profile updated successfully');
        } catch (error) {
            showErrorAlert('Error updating profile');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">Account Status</h3>
                            <p className="text-sm text-gray-600">
                                Email Verified: {user?.emailVerification ? '✅ Yes' : '❌ No'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Phone Verified: {user?.phoneVerification ? '✅ Yes' : '❌ No'}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Back to Home
                        </button>
                        {/* Uncomment when Appwrite provides profile update functionality
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Update Profile
                        </button>
                        */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;