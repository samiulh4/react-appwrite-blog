const ArticleDetails = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Article Header */}
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <span className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full uppercase font-semibold tracking-wide">
                        Technology
                    </span>
                    <h1 className="text-4xl font-bold mt-4 text-gray-900">
                        Understanding Modern Web Development Practices and Principles
                    </h1>
                    <div className="flex items-center mt-6">
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                            alt="Author"
                        />
                        <div className="ml-4">
                            <p className="text-gray-800 font-medium">John Doe</p>
                            <div className="flex items-center text-gray-600 text-sm">
                                <span>Oct 24, 2025</span>
                                <span className="mx-2">•</span>
                                <span>8 min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8">
                    <img
                        className="w-full h-[28rem] object-cover rounded-xl"
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                        alt="Featured"
                    />
                </div>

                {/* Article Content */}
                <article className="prose prose-lg max-w-none">
                    <p>
                        Modern web development has evolved significantly over the past few years. 
                        With the advent of new technologies and frameworks, developers now have more 
                        tools at their disposal than ever before.
                    </p>

                    <h2>The Evolution of Web Development</h2>
                    <p>
                        The landscape of web development is constantly changing. From static HTML 
                        pages to dynamic, interactive applications, the journey has been remarkable. 
                        Today's web applications are more powerful, more responsive, and more user-friendly 
                        than ever before.
                    </p>

                    <h2>Key Principles to Follow</h2>
                    <ul>
                        <li>Responsive Design</li>
                        <li>Performance Optimization</li>
                        <li>Security Best Practices</li>
                        <li>Accessibility</li>
                    </ul>

                    <blockquote>
                        "Good code is its own best documentation. As you're about to add a comment, 
                        ask yourself, 'How can I improve the code so that this comment isn't needed?'"
                        <footer>- Steve McConnell</footer>
                    </blockquote>

                    <p>
                        As we continue to push the boundaries of what's possible on the web, it's 
                        crucial to stay updated with the latest trends and best practices.
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
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

export default ArticleDetails;