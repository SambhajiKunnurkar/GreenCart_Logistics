import React, { useState, useEffect } from 'react';
import api from '../api';

const Management = () => {
    // State for Drivers
    const [drivers, setDrivers] = useState([]);
    const [driverForm, setDriverForm] = useState({ name: '', current_shift_hours: '', past_7_day_work_hours: '' });
    const [isEditingDriver, setIsEditingDriver] = useState(false);
    const [currentDriverId, setCurrentDriverId] = useState(null);

    // State for Routes
    const [routes, setRoutes] = useState([]);
    const [routeForm, setRouteForm] = useState({ route_id: '', distance_km: '', traffic_level: 'Medium', base_time_minutes: '' });
    const [isEditingRoute, setIsEditingRoute] = useState(false);
    const [currentRouteId, setCurrentRouteId] = useState(null);

    // State for Orders
    const [orders, setOrders] = useState([]);
    const [orderForm, setOrderForm] = useState({ order_id: '', value_rs: '', assigned_route_id: '' });
    const [isEditingOrder, setIsEditingOrder] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    // --- Fetch all data on component mount ---
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [driversRes, routesRes, ordersRes] = await Promise.all([
                    api.get('/drivers'),
                    api.get('/routes'),
                    api.get('/orders')
                ]);
                setDrivers(driversRes.data);
                setRoutes(routesRes.data);
                setOrders(ordersRes.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };
        fetchAllData();
    }, []);

    // --- DRIVER HANDLERS ---
    const handleDriverChange = (e) => setDriverForm({ ...driverForm, [e.target.name]: e.target.value });
    const resetDriverForm = () => {
        setIsEditingDriver(false);
        setCurrentDriverId(null);
        setDriverForm({ name: '', current_shift_hours: '', past_7_day_work_hours: '' });
    };
    const handleDriverSubmit = async (e) => {
        e.preventDefault();
        const apiCall = isEditingDriver ? api.put(`/drivers/${currentDriverId}`, driverForm) : api.post('/drivers', driverForm);
        await apiCall;
        resetDriverForm();
        const res = await api.get('/drivers');
        setDrivers(res.data);
    };
    const handleEditDriver = (driver) => {
        setIsEditingDriver(true);
        setCurrentDriverId(driver._id);
        setDriverForm(driver);
    };
    const handleDeleteDriver = async (id) => {
        if (window.confirm('Delete this driver?')) {
            await api.delete(`/drivers/${id}`);
            const res = await api.get('/drivers');
            setDrivers(res.data);
        }
    };

    // --- ROUTE HANDLERS ---
    const handleRouteChange = (e) => setRouteForm({ ...routeForm, [e.target.name]: e.target.value });
    const resetRouteForm = () => {
        setIsEditingRoute(false);
        setCurrentRouteId(null);
        setRouteForm({ route_id: '', distance_km: '', traffic_level: 'Medium', base_time_minutes: '' });
    };
    const handleRouteSubmit = async (e) => {
        e.preventDefault();
        const apiCall = isEditingRoute ? api.put(`/routes/${currentRouteId}`, routeForm) : api.post('/routes', routeForm);
        await apiCall;
        resetRouteForm();
        const res = await api.get('/routes');
        setRoutes(res.data);
    };
    const handleEditRoute = (route) => {
        setIsEditingRoute(true);
        setCurrentRouteId(route._id);
        setRouteForm(route);
    };
    const handleDeleteRoute = async (id) => {
        if (window.confirm('Delete this route?')) {
            await api.delete(`/routes/${id}`);
            const res = await api.get('/routes');
            setRoutes(res.data);
        }
    };

    // --- ORDER HANDLERS ---
    const handleOrderChange = (e) => setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
    const resetOrderForm = () => {
        setIsEditingOrder(false);
        setCurrentOrderId(null);
        setOrderForm({ order_id: '', value_rs: '', assigned_route_id: '' });
    };
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const apiCall = isEditingOrder ? api.put(`/orders/${currentOrderId}`, orderForm) : api.post('/orders', orderForm);
        await apiCall;
        resetOrderForm();
        const res = await api.get('/orders');
        setOrders(res.data);
    };
    const handleEditOrder = (order) => {
        setIsEditingOrder(true);
        setCurrentOrderId(order._id);
        setOrderForm(order);
    };
    const handleDeleteOrder = async (id) => {
        if (window.confirm('Delete this order?')) {
            await api.delete(`/orders/${id}`);
            const res = await api.get('/orders');
            setOrders(res.data);
        }
    };

    // --- Main JSX Render ---
    return (
        <div className="space-y-12">
            <h1 className="text-3xl font-bold text-gray-800">Data Management</h1>

            {/* DRIVERS SECTION */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{isEditingDriver ? 'Edit Driver' : 'Add New Driver'}</h2>
                <form onSubmit={handleDriverSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
                    {/* Driver Form Inputs */}
                    <input type="text" name="name" placeholder="Driver Name" value={driverForm.name} onChange={handleDriverChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <input type="number" name="current_shift_hours" placeholder="Current Shift Hours" value={driverForm.current_shift_hours} onChange={handleDriverChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <input type="number" name="past_7_day_work_hours" placeholder="Past 7-Day Hours" value={driverForm.past_7_day_work_hours} onChange={handleDriverChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <div className="flex space-x-2">
                        <button type="submit" className="flex-1 py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700">{isEditingDriver ? 'Update' : 'Add'}</button>
                        {isEditingDriver && <button type="button" onClick={resetDriverForm} className="flex-1 py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>}
                    </div>
                </form>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Driver Table Head */}
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift Hours</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Past Week Hours</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        {/* Driver Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200">{drivers.map(driver => (<tr key={driver._id} className="hover:bg-gray-50"><td className="px-6 py-4">{driver.name}</td><td className="px-6 py-4">{driver.current_shift_hours}</td><td className="px-6 py-4">{driver.past_7_day_work_hours}</td><td className="px-6 py-4 text-right space-x-2"><button onClick={() => handleEditDriver(driver)} className="text-indigo-600 hover:text-indigo-900">Edit</button><button onClick={() => handleDeleteDriver(driver._id)} className="text-red-600 hover:text-red-900">Delete</button></td></tr>))}</tbody>
                    </table>
                </div>
            </section>

            {/* ROUTES SECTION */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{isEditingRoute ? 'Edit Route' : 'Add New Route'}</h2>
                <form onSubmit={handleRouteSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6">
                    {/* Route Form Inputs */}
                    <input type="text" name="route_id" placeholder="Route ID" value={routeForm.route_id} onChange={handleRouteChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <input type="number" name="distance_km" placeholder="Distance (km)" value={routeForm.distance_km} onChange={handleRouteChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <select name="traffic_level" value={routeForm.traffic_level} onChange={handleRouteChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"><option>Low</option><option>Medium</option><option>High</option></select>
                    <input type="number" name="base_time_minutes" placeholder="Base Time (min)" value={routeForm.base_time_minutes} onChange={handleRouteChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <div className="flex space-x-2">
                        <button type="submit" className="flex-1 py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700">{isEditingRoute ? 'Update' : 'Add'}</button>
                        {isEditingRoute && <button type="button" onClick={resetRouteForm} className="flex-1 py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>}
                    </div>
                </form>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Route Table Head */}
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Traffic</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Time</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        {/* Route Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200">{routes.map(route => (<tr key={route._id} className="hover:bg-gray-50"><td className="px-6 py-4">{route.route_id}</td><td className="px-6 py-4">{route.distance_km} km</td><td className="px-6 py-4">{route.traffic_level}</td><td className="px-6 py-4">{route.base_time_minutes} min</td><td className="px-6 py-4 text-right space-x-2"><button onClick={() => handleEditRoute(route)} className="text-indigo-600 hover:text-indigo-900">Edit</button><button onClick={() => handleDeleteRoute(route._id)} className="text-red-600 hover:text-red-900">Delete</button></td></tr>))}</tbody>
                    </table>
                </div>
            </section>
            
            {/* ORDERS SECTION */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{isEditingOrder ? 'Edit Order' : 'Add New Order'}</h2>
                <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
                    {/* Order Form Inputs */}
                    <input type="text" name="order_id" placeholder="Order ID" value={orderForm.order_id} onChange={handleOrderChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <input type="number" name="value_rs" placeholder="Value (₹)" value={orderForm.value_rs} onChange={handleOrderChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <input type="text" name="assigned_route_id" placeholder="Assigned Route ID" value={orderForm.assigned_route_id} onChange={handleOrderChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    <div className="flex space-x-2">
                        <button type="submit" className="flex-1 py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700">{isEditingOrder ? 'Update' : 'Add'}</button>
                        {isEditingOrder && <button type="button" onClick={resetOrderForm} className="flex-1 py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>}
                    </div>
                </form>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         {/* Order Table Head */}
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Route</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        {/* Order Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200">{orders.map(order => (<tr key={order._id} className="hover:bg-gray-50"><td className="px-6 py-4">{order.order_id}</td><td className="px-6 py-4">₹{order.value_rs}</td><td className="px-6 py-4">{order.assigned_route_id}</td><td className="px-6 py-4 text-right space-x-2"><button onClick={() => handleEditOrder(order)} className="text-indigo-600 hover:text-indigo-900">Edit</button><button onClick={() => handleDeleteOrder(order._id)} className="text-red-600 hover:text-red-900">Delete</button></td></tr>))}</tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Management;