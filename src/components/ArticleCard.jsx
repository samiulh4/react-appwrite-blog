import UserImage from '../assets/user.png';
import CoverImage from '../assets/cover.webp';


const ArticleCard = (props) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
                className="h-48 w-full object-cover"
                src={CoverImage}
                alt="Blog post"
            />
            <div className="p-6">
                <div className="flex items-center">
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
                        Article
                    </span>
                    <span className="ml-3 text-sm text-gray-500">5 min read</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900 hover:text-blue-600">
                    { props.title }
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-2">
                    { props.content }
                </p>
                <div className="mt-4 flex items-center">
                    <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={UserImage}
                        alt="Author"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{props.author}</p>
                        <p className="text-xs text-gray-500">Oct 20, 2025</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard