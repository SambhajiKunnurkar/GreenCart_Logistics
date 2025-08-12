import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = ({ results }) => {
    if (!results) {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
                <p className="mt-2 text-gray-500">Run a simulation to see KPI results here.</p>
            </div>
        );
    }

    const deliveryData = {
        labels: ['On-Time Deliveries', 'Late Deliveries'],
        datasets: [{
            data: [results.on_time_deliveries, results.late_deliveries],
            backgroundColor: ['#4ade80', '#f87171'], // green-400, red-400
            hoverBackgroundColor: ['#34d399', '#ef4444'], // green-500, red-500
        }]
    };

    const fuelData = {
        labels: ['Fuel Cost'],
        datasets: [{
            label: 'Total Fuel Cost (₹)',
            data: [results.fuel_cost_breakdown.total],
            backgroundColor: '#60a5fa', // blue-400
        }]
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-600">Total Profit</h3>
                    <p className="mt-2 text-4xl font-bold text-green-600">₹{results.total_profit.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-600">Efficiency Score</h3>
                    <p className="mt-2 text-4xl font-bold text-blue-600">{results.efficiency_score}%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">On-time vs Late Deliveries</h3>
                    <div className="h-64 flex justify-center">
                        <Doughnut data={deliveryData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Fuel Cost Breakdown</h3>
                    <div className="h-64">
                        <Bar data={fuelData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;