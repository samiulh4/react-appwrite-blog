import Header from "./components/Header"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"
import ArticleCard from "./components/ArticleCard"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

            {/* Featured Post */}
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

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArticleCard
                title="Modern JavaScript Best Practices"
                content="Explore the latest JavaScript features and best practices for writing clean, maintainable code."
                author="Mike Wilson"
              />
              <ArticleCard
                title="UI/UX Design Principles"
                content="Learn the fundamental principles of creating user-friendly and visually appealing interfaces."
                author="Sarah Chen"
              />
              <ArticleCard
                title=" Tips and strategies for advancing your career in the technology industry."
                content="Career Growth in Tech"
                author="David Kim"
              />
              <ArticleCard
                title="Building REST APIs"
                content="A comprehensive guide to building scalable REST APIs using modern technologies."
                author="Sarah Chen"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App

