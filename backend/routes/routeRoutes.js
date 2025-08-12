const express = require('express');
const router = express.Router();
const { 
    createRoute, 
    getAllRoutes, 
    updateRoute, 
    deleteRoute 
} = require('../controllers/routeController');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, createRoute);


router.get('/', auth, getAllRoutes);


router.put('/:id', auth, updateRoute);


router.delete('/:id', auth, deleteRoute);

module.exports = router;