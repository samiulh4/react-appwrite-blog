import UserImage from '../../assets/user.png';
import CoverImage from '../../assets/cover.webp';
import { Link } from 'react-router-dom';
import appWriteService from '../../services/AppWriteService';
import { formatDate } from '../../utils/dateFormat';


const ArticleCard = ({$id, title, content, author_name, featured_image, $createdAt, author_avatar_id}) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
                className="h-48 w-full object-cover"
                src={appWriteService.getFileView(featured_image) || CoverImage}
                alt="Featured Image"
            />
            <div className="p-6">
                <div className="flex items-center">
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
                        Article
                    </span>
                    <span className="ml-3 text-sm text-gray-500">{Math.ceil(content.length / 1000)} min read</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900 hover:text-blue-600">
                    <Link to={`/article/${$id}`}>{ title }</Link>
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-2">
                    { content }
                </p>
                <div className="mt-4 flex items-center">
                    <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={appWriteService.getFileView(author_avatar_id) || UserImage}
                        alt="Author"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{author_name || ''}</p>
                        <p className="text-xs text-gray-500">{formatDate($createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard