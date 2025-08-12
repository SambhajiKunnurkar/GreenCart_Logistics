const mongoose = require('mongoose');

const SimulationSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now }, 
    total_profit: Number,
    efficiency_score: Number,
    on_time_deliveries: Number,
    late_deliveries: Number,
    fuel_cost_breakdown: Object
});

module.exports = mongoose.model('Simulation', SimulationSchema);