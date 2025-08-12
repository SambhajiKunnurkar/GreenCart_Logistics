import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// 1. Import the background image directly
import backgroundImage from '../assets/background.jpg'; 

const Login = ({ onLogin }) => {
    // ... (rest of your state and functions are the same)
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            onLogin();
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            
            <div className="max-w-md p-8 space-y-8 bg-black bg-opacity-50 rounded-xl shadow-2xl backdrop-blur-md">
                
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Sign in to manage your deliveries
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            placeholder="manager@greencart.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                    <div>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 disabled:opacity-50 transition-all duration-300"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;