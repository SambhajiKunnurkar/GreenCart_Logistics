const Route = require('../models/Route');


exports.createRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        const route = await newRoute.save();
        res.status(201).json(route);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!route) {
            return res.status(404).json({ msg: 'Route not found' });
        }
        res.json(route);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) {
            return res.status(404).json({ msg: 'Route not found' });
        }
        res.json({ msg: 'Route removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};