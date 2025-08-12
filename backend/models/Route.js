const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    route_id: { type: String, required: true, unique: true },
    distance_km: { type: Number, required: true },
    traffic_level: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    base_time_minutes: { type: Number, required: true }
});

module.exports = mongoose.model('Route', RouteSchema);