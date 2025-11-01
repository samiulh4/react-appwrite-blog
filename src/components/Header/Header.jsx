import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appWriteService from '../../services/AppWriteService';
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from '../../utils/sweetAlert';
import userImage from '../../assets/user.png';
import { clearAuthData } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Header = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [authUserName, setAuthUserName] = useState('');
    const [authAvatarUrl, setAuthAvatarUrl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const authData = useSelector((state) => state.auth.authData);
   

    /*useEffect(() => {
        const checkUserLoggedIn = async () => {
            console.log('Auth Data from Redux:', authData);
            const currentUser = await appWriteService.getCurrentUser();
            if (currentUser) {
                setIsLoggedIn(true);
                setAuthUserName(currentUser.name || 'Not Found !');
                if (currentUser.prefs?.avatarId) {
                    const view = appWriteService.getFileView(currentUser.prefs.avatarId);
                    setAuthAvatarUrl(view.href);
                } else {
                    const avatar = appWriteService.getAvatar(currentUser.email || currentUser.name);
                    setAuthAvatarUrl(avatar);
                }
            }

        };
        checkUserLoggedIn();
    }, [navigate])*/

    
    return (
        <header className="bg-white shadow-lg">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-gray-800">
                            Blog App
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                        {isAuthenticated && (
                            <Link to="/article/add" className="text-blue-600 hover:text-blue-900">New Article</Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <Link className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-900" to="/signin">Sign In</Link>
                                <Link className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-900" to="/signup">Sign Up</Link>
                            </>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <img
                                            src={appWriteService.getFileView(authData.prefs.avatarId) || appWriteService.getAvatar(authData.email || authData.name) || userImage}
                                            alt="User Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    </div>
                                    <span className="text-gray-700">{authData?.name}</span>

                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Your Profile
                                        </Link>
                                        {/* Settings page can be implemented later */}
                                        <div className="border-t border-gray-100"></div>
                                        <button
                                            onClick={async () => {
                                                const result = await showConfirmDialog(
                                                    'Sign Out',
                                                    'Are you sure you want to sign out?'
                                                );
                                                if (result.isConfirmed) {
                                                    try {
                                                        await appWriteService.logout();
                                                        await showSuccessAlert('Success', 'Signed out successfully');
                                                        dispatch(clearAuthData());
                                                        navigate('/signin');
                                                    } catch (error) {
                                                        showErrorAlert('Error', 'Failed to sign out');
                                                    }
                                                }
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header