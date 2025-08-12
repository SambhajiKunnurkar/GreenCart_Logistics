const express = require('express');
const router = express.Router();
const { runSimulation } = require('../controllers/simulationController');
const auth = require('../middleware/authMiddleware');

router.post('/run', auth, runSimulation);
module.exports = router;