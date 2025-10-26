import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import appWriteService from '../services/AppWriteService';
import { showLoadingAlert, closeLoadingAlert, showSuccessAlert, showErrorAlert } from '../utils/sweetAlert';

const ArticleAdd = () => {
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUserName, setCurrentUserName] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        user_id: '',
        featured_image: null,
        author_name: ''
    });

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const currentUser = await appWriteService.getCurrentUser();
            if (currentUser) {
                setCurrentUserId(currentUser.$id);
                setCurrentUserName(currentUser.name || '');
            } else {
                navigate('/signin');
            }
        }
        checkUserLoggedIn();
    }, [currentUserId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            featured_image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            showLoadingAlert('Loading...');

            const post = await appWriteService.createPost({
                ...formData,
                user_id: currentUserId,
                author_name: currentUserName
            });

            closeLoadingAlert();
            await showSuccessAlert('Success', 'Post created successfully!');
            navigate('/');
        } catch (error) {
            closeLoadingAlert();
            showErrorAlert('Error', error.message || 'Error creating post');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Article</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter post title"
                    />
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={8}
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Write your post content here..."
                    />
                </div>

                {/* Feature Image */}
                <div>
                    <label htmlFor="feature_image" className="block text-sm font-medium text-gray-700">
                        Feature Image
                    </label>
                    <div className="mt-1 flex items-center">
                        <input
                            type="file"
                            id="featured_image"
                            name="featured_image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>

                {/* Preview Image */}
                {formData.featured_image && (
                    <div className="mt-4">
                        <img
                            src={URL.createObjectURL(formData.featured_image)}
                            alt="Preview"
                            className="h-48 w-full object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Create Article
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleAdd;