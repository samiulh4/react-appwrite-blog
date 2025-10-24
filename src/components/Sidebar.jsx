import { useState } from 'react';

const Sidebar = () => {
    const [recentPosts] = useState([
        { id: 1, title: 'Getting Started with React', date: '2025-10-20' },
        { id: 2, title: 'Understanding Modern Web Development', date: '2025-10-18' },
        { id: 3, title: 'The Future of AI in Technology', date: '2025-10-15' },
        { id: 4, title: 'Best Practices for Code Organization', date: '2025-10-12' },
    ]);

    return (
        <aside className="w-full md:w-64 p-4 bg-white shadow-md">
            {/* Search Box */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Search</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-2 top-2.5 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
                <ul className="space-y-4">
                    {recentPosts.map(post => (
                        <li key={post.id}>
                            <a href={`/post/${post.id}`} className="block">
                                <h4 className="text-gray-700 hover:text-blue-600 font-medium">
                                    {post.title}
                                </h4>
                                <span className="text-sm text-gray-500">
                                    {new Date(post.date).toLocaleDateString()}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;