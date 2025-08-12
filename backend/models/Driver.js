const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    current_shift_hours: { type: Number, default: 0 },
    past_7_day_work_hours: { type: Number, default: 0 }
});

module.exports = mongoose.model('Driver', DriverSchema);