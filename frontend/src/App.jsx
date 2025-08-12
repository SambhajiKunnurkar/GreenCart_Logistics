import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Using the simple one as requested
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Simulation from './pages/Simulation';
import Management from './pages/Management';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [simulationResults, setSimulationResults] = useState(null);
    const [loading, setLoading] = useState(true); // 1. Add loading state, true by default

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false); // 2. Set loading to false after checking for the token
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    // 3. While loading, show a simple loading message (or a spinner)
    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 font-sans">
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <main className="p-4 sm:p-6 md:p-8 pt-24"> {/* Added top-padding to avoid overlap with fixed navbar */}
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route 
                            path="/dashboard" 
                            element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard results={simulationResults} /></ProtectedRoute>} 
                        />
                        <Route 
                            path="/simulation" 
                            element={<ProtectedRoute isAuthenticated={isAuthenticated}><Simulation setResults={setSimulationResults} /></ProtectedRoute>} 
                        />
                        <Route 
                            path="/management" 
                            element={<ProtectedRoute isAuthenticated={isAuthenticated}><Management /></ProtectedRoute>} 
                        />
                        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;