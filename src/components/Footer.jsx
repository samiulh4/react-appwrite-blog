const Footer = () => {
    return (
        <footer className="bg-white text-gray-600 shadow-[0_-2px_6px_rgba(0,0,0,0.1)] border-t border-gray-200">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">About Blog</h3>
                        <p className="text-gray-600">
                            Share your thoughts, ideas, and experiences with our community.
                            Join us in creating meaningful content.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-600 hover:text-blue-600">Home</a></li>
                            <li><a href="/posts" className="text-gray-600 hover:text-blue-600">All Posts</a></li>
                            <li><a href="/about" className="text-gray-600 hover:text-blue-600">About Us</a></li>
                            <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li><a href="/category/technology" className="text-gray-600 hover:text-blue-600">Technology</a></li>
                            <li><a href="/category/lifestyle" className="text-gray-600 hover:text-blue-600">Lifestyle</a></li>
                            <li><a href="/category/travel" className="text-gray-600 hover:text-blue-600">Travel</a></li>
                            <li><a href="/category/food" className="text-gray-600 hover:text-blue-600">Food</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Newsletter</h3>
                        <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates.</p>
                        <form className="space-y-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full px-4 py-2 rounded border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button 
                                type="submit" 
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                    <p className="text-gray-500">© {new Date().getFullYear()} Blog App. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;