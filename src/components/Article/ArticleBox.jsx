const ArticleBox = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img
                        className="h-48 w-full md:h-full md:w-48 object-cover"
                        src="https://img-c.udemycdn.com/course/480x270/881228_3a00.jpg"
                        alt="Featured post"
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">Technology</div>
                    <h2 className="block mt-1 text-2xl font-semibold text-gray-900 hover:text-blue-600">
                        Getting Started with React and Tailwind CSS
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Learn how to build modern web applications using React.js and Tailwind CSS.
                        We'll cover everything from setup to deployment.
                    </p>
                    <div className="mt-4 flex items-center">
                        <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                            alt="Author"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">John Doe</p>
                            <p className="text-sm text-gray-500">Oct 24, 2025 · 6 min read</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleBox;