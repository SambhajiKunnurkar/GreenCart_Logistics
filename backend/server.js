require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors()); 
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/drivers', require('./routes/driverRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/routes', require('./routes/routeRoutes'));



app.get('/', (req, res) => {
    res.send('GreenCart Logistics API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));