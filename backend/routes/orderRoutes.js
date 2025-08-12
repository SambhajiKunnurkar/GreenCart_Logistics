const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getAllOrders, 
    updateOrder, 
    deleteOrder 
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, createOrder);


router.get('/', auth, getAllOrders);


router.put('/:id', auth, updateOrder);


router.delete('/:id', auth, deleteOrder);

module.exports = router;