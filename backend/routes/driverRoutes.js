const express = require('express');
const router = express.Router();
const { createDriver, getAllDrivers, updateDriver, deleteDriver } = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');
router.post('/', auth, createDriver);
router.get('/', auth, getAllDrivers);
router.put('/:id', auth, updateDriver);
router.delete('/:id', auth, deleteDriver);
module.exports = router;