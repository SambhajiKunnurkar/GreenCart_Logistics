import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Simulation = ({ setResults }) => {
    const [formData, setFormData] = useState({
        num_drivers: '',
        start_time: '09:00',
        max_hours_per_day: '8'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/simulation/run', formData);
            setResults(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Run a New Simulation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="num_drivers" className="block text-sm font-medium text-gray-700">Number of available drivers</label>
                    <input
                        type="number"
                        name="num_drivers"
                        id="num_drivers"
                        value={formData.num_drivers}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">Route start time (HH:MM)</label>
                    <input
                        type="time"
                        name="start_time"
                        id="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="max_hours_per_day" className="block text-sm font-medium text-gray-700">Max hours per driver per day</label>
                    <input
                        type="number"
                        name="max_hours_per_day"
                        id="max_hours_per_day"
                        value={formData.max_hours_per_day}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div>
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
                        {loading ? 'Running...' : 'Run Simulation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Simulation;