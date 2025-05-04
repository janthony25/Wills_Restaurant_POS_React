import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hasRole, isAuthenticated, logout } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const isAdmin = hasRole('Admin');

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side navigation */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">Will's</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-700 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            
                            {authenticated && (
                                <>
                                    <Link to="/profile" className="border-transparent text-gray-700 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                        Profile
                                    </Link>
                                    <Link to="/dashboard" className="border-transparent text-gray-700 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                        Dashboard
                                    </Link>
                                    {isAdmin && (
                                      <>
                                        <Link to="/admin" className="border-transparent text-gray-700 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                            Admin
                                        </Link>
                                        <Link to="/categories" className='border-transparent text-gray-700 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>Add Category</Link>
                                      </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Right side authentication */}
                    <div className="flex items-center">
                        {authenticated ? (
                            <button 
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex space-x-4">
                                <Link 
                                    to="/login"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Mobile menu, show/hide based on menu state */}
            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300">
                        Home
                    </Link>
                    
                    {authenticated && (
                        <>
                            <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300">
                                Profile
                            </Link>
                            <Link to="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300">
                                Dashboard
                            </Link>
                            {isAdmin && (
                                <Link to="/admin" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300">
                                    Admin
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar