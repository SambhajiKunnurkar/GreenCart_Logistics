const Driver = require('../models/Driver');

exports.createDriver = async (req, res) => {
    try {
        const newDriver = new Driver(req.body);
        const driver = await newDriver.save();
        res.json(driver);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!driver) return res.status(404).json({ msg: 'Driver not found' });
        res.json(driver);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        if (!driver) return res.status(404).json({ msg: 'Driver not found' });
        res.json({ msg: 'Driver removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};