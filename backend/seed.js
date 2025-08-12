require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');

const Driver = require('./models/Driver');
const Order = require('./models/Order');
const Route = require('./models/Route');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for seeding...'))
    .catch(err => console.error('MongoDB connection error:', err));


const seedDatabase = async () => {
    try {
        console.log('--- Clearing existing data ---');
        await Driver.deleteMany({});
        await Order.deleteMany({});
        await Route.deleteMany({});

        
        console.log('Seeding drivers...');
        const driversPath = path.join(__dirname, 'csv_data', 'drivers.csv');
        const drivers = [];
        fs.createReadStream(driversPath)
            .pipe(csv())
            .on('data', (row) => {
                
                const pastHoursSum = row.past_week_hours.split('|').reduce((acc, h) => acc + parseInt(h, 10), 0);
                
                drivers.push({
                    name: row.name,
                    
                    current_shift_hours: parseFloat(row.shift_hours),
                    past_7_day_work_hours: pastHoursSum
                });
            })
            .on('end', async () => {
                await Driver.insertMany(drivers);
                console.log('Drivers seeded successfully.');
                
                
                console.log('Seeding routes...');
                const routesPath = path.join(__dirname, 'csv_data', 'routes.csv');
                const routes = [];
                fs.createReadStream(routesPath)
                    .pipe(csv())
                    .on('data', (row) => {
                        routes.push({
                            route_id: row.route_id,
                            distance_km: parseFloat(row.distance_km),
                            traffic_level: row.traffic_level,
                            
                            base_time_minutes: parseInt(row.base_time_min)
                        });
                    })
                    .on('end', async () => {
                        await Route.insertMany(routes);
                        console.log('Routes seeded successfully.');

                        
                        console.log('Seeding orders...');
                        const ordersPath = path.join(__dirname, 'csv_data', 'orders.csv');
                        const orders = [];
                        fs.createReadStream(ordersPath)
                            .pipe(csv())
                            .on('data', (row) => {
                                orders.push({
                                    order_id: row.order_id,
                                    value_rs: parseFloat(row.value_rs),
                                    
                                    assigned_route_id: row.route_id,
                                   
                                    delivery_time: row.delivery_time
                                });
                            })
                            .on('end', async () => {
                                await Order.insertMany(orders);
                                console.log('Orders seeded successfully.');
                                console.log('--- Seeding complete! ---');
                                mongoose.connection.close();
                            });
                    });
            });

    } catch (error) {
        console.error('Error during seeding:', error);
        mongoose.connection.close();
    }
};

seedDatabase();