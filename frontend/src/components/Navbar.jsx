import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SimpleNavbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 bg-gray-800">
                    
                    
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-xxl font-bold text-green-400">
                            GreenCart
                        </NavLink>
                    </div>

                    
                    <div className="flex items-center space-x-6 ">
                        {isAuthenticated ? (
                            
                            <>
                                <NavLink to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</NavLink>
                                <NavLink to="/simulation" className="text-gray-300 hover:text-white">Simulation</NavLink>
                                <NavLink to="/management" className="text-gray-300 hover:text-white">Management</NavLink>
                                <button 
                                    onClick={handleLogoutClick} 
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            
                            <NavLink 
                                to="/login" 
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SimpleNavbar;