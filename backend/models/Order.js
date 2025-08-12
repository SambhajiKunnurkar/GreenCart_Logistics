const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    value_rs: { type: Number, required: true },
    assigned_route_id: { type: String, required: true },
    delivery_timestamp: { type: Date }
});

module.exports = mongoose.model('Order', OrderSchema);