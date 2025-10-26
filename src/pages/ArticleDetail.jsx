import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appWriteService from "../services/AppWriteService";
import { formatDate } from "../utils/dateFormat";
import CoverImage from "../assets/cover.webp";
import UserImage from "../assets/user.png";

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const [articleResponse, userResponse] = await Promise.all([
                    appWriteService.getArticle(id),
                    appWriteService.getCurrentUser()
                ]);
                
                if (articleResponse) {
                    setArticle(articleResponse);
                }
                if (userResponse) {
                    setCurrentUser(userResponse);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Article Header */}
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <span className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full uppercase font-semibold tracking-wide">
                        Article
                    </span>
                    <h1 className="text-4xl font-bold mt-4 text-gray-900">
                        {article.title}
                    </h1>
                    <div className="flex items-center mt-6">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={UserImage}
                            alt="Author"
                        />
                        <div className="ml-4">
                            <p className="text-gray-800 font-medium">{article.author_name || ""}</p>
                            <div className="flex items-center text-gray-600 text-sm">
                                <span>{formatDate(article.$createdAt)}</span>
                                <span className="mx-2">•</span>
                                <span>{Math.ceil(article.content.length / 1000)} min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8">
                    <img
                        className="w-full h-[28rem] object-cover rounded-xl"
                        src={CoverImage}
                        alt="Featured"
                    />
                </div>

                {/* Author Actions */}
                {currentUser && currentUser.$id === article.user_id && (
                    <div className="mb-8">
                        <button
                            onClick={() => navigate(`/article/${id}/edit`)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Edit Article
                        </button>
                    </div>
                )}

                {/* Article Content */}
                <article className="prose prose-lg max-w-none">
                    <p>
                        {article.content}
                    </p>
                </article>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#webdev</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#programming</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#technology</span>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 flex items-center space-x-4 border-t border-b border-gray-200 py-4">
                    <span className="text-gray-700">Share this article:</span>
                    <button className="text-blue-600 hover:text-blue-700">Twitter</button>
                    <button className="text-blue-600 hover:text-blue-700">Facebook</button>
                    <button className="text-blue-600 hover:text-blue-700">LinkedIn</button>
                </div>

                {/* Author Bio */}
                <div className="mt-8 bg-gray-50 rounded-xl p-8">
                    <div className="flex items-center">
                        <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={UserImage}
                            alt="Author"
                        />
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                            <p className="text-gray-600">Technical Writer & Web Developer</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600">
                        John is a passionate web developer and technical writer with over 5 years
                        of experience in the industry. He loves sharing his knowledge and helping
                        others learn about web development.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;