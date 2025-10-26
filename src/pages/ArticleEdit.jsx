import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appWriteService from '../services/AppWriteService';
import { showLoadingAlert, closeLoadingAlert, showSuccessAlert, showErrorAlert } from '../utils/sweetAlert';

const ArticleEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        const checkUserAndLoadArticle = async () => {
            try {
                // Check if user is logged in
                const currentUser = await appWriteService.getCurrentUser();
                if (!currentUser) {
                    navigate('/signin');
                    return;
                }
                
                setCurrentUserId(currentUser.$id);
                setCurrentUserName(currentUser.name || '');

                // Load article data
                const article = await appWriteService.getArticle(id);
                if (!article) {
                    showErrorAlert('Error', 'Article not found');
                    navigate('/');
                    return;
                }

                // Check if current user is the author
                if (article.user_id !== currentUser.$id) {
                    showErrorAlert('Error', 'You do not have permission to edit this article');
                    navigate('/');
                    return;
                }

                setFormData({
                    title: article.title,
                    content: article.content,
                    user_id: article.user_id,
                    featured_image: article.featured_image,
                    author_name: article.author_name
                });
            } catch (error) {
                showErrorAlert('Error', error.message || 'Error loading article');
                navigate('/');
            }
        };

        checkUserAndLoadArticle();
    }, [id, navigate]);

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

            await appWriteService.updateArticle(id, {
                ...formData,
                user_id: currentUserId,
                author_name: currentUserName
            });

            closeLoadingAlert();
            await showSuccessAlert('Success', 'Article updated successfully!');
            navigate(`/article/${id}`);
        } catch (error) {
            closeLoadingAlert();
            showErrorAlert('Error', error.message || 'Error updating article');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

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
                        placeholder="Write your article content here..."
                    />
                </div>

                {/* Featured Image */}
                <div>
                    <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">
                        Featured Image
                    </label>
                    <input
                        type="file"
                        id="featured_image"
                        name="featured_image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="mt-1 block w-full"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/article/${id}`)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update Article
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleEdit;