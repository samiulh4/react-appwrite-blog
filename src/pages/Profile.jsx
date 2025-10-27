import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../services/AppWriteService';
import { showSuccessAlert, showErrorAlert } from '../utils/sweetAlert';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await appwriteService.getCurrentUser();
                console.log(userData.prefs);
                if (userData) {
                    setUser(userData);
                    setFormData({
                        name: userData.name || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                    });

                    // If avatar exists in prefs
                    if (userData.prefs?.avatarId) {
                        const view = appwriteService.getFileView(userData.prefs.avatarId);
                        setAvatarUrl(view.href);
                    } else {
                        const avatar = appwriteService.getAvatar(userData.email || userData.name);
                        setAvatarUrl(avatar);
                    }
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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) setAvatarFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update name if changed
            if (formData.name !== user.name) {
                await appwriteService.updateName(formData.name);
            }

            // Update avatar if new file selected
            if (avatarFile) {
                await appwriteService.updateAvatar(avatarFile);
            }

            showSuccessAlert('Profile updated successfully!');
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error(error);
            showErrorAlert('Error updating profile');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={avatarUrl}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md object-cover"
                    />
                    <label className="mt-3 text-sm text-blue-600 cursor-pointer hover:underline">
                        Change Avatar
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
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
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Account Status */}
                    <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Account Status</h3>
                        <p className="text-sm text-gray-600">
                            Email Verified: {user?.emailVerification ? '✅ Yes' : '❌ No'}
                        </p>
                        <p className="text-sm text-gray-600">
                            Phone Verified: {user?.phoneVerification ? '✅ Yes' : '❌ No'}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Back to Home
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
