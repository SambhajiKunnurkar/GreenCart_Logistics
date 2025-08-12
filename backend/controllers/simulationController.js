const Order = require('../models/Order');
const Route = require('../models/Route');
const Simulation = require('../models/Simulation');


const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
};

exports.runSimulation = async (req, res) => {
    
    const { num_drivers, start_time, max_hours_per_day } = req.body;

    if (!num_drivers || !start_time || !max_hours_per_day) {
        return res.status(400).json({ msg: 'Missing simulation parameters.' });
    }

    try {
        
        const orders = await Order.find();
        const routes = await Route.find().lean();
        const routeMap = new Map(routes.map(r => [r.route_id, r]));

        let totalProfit = 0;
        let onTimeDeliveries = 0;
        let lateDeliveries = 0;
        let totalFuelCost = 0;
        const totalDeliveries = orders.length;

        for (const order of orders) {
            const route = routeMap.get(order.assigned_route_id);
            if (!route || !order.delivery_time) continue;

            
            const actualDeliveryMinutes = timeToMinutes(order.delivery_time);

            
            const isLate = actualDeliveryMinutes > (route.base_time_minutes + 10);
            let penalty = isLate ? 50 : 0;
            if (isLate) lateDeliveries++; else onTimeDeliveries++;
            
            
            let bonus = 0;
            if (order.value_rs > 1000 && !isLate) {
                bonus = order.value_rs * 0.10;
            }

            
            let fuelCost = route.distance_km * 5;
            if (route.traffic_level === 'High') {
                fuelCost += route.distance_km * 2;
            }
            totalFuelCost += fuelCost;

            
            totalProfit += (order.value_rs + bonus - penalty - fuelCost);
        }

        
        const efficiencyScore = totalDeliveries > 0 ? (onTimeDeliveries / totalDeliveries) * 100 : 0;

        const results = {
            total_profit: totalProfit,
            efficiency_score: efficiencyScore.toFixed(2),
            on_time_deliveries: onTimeDeliveries,
            late_deliveries: lateDeliveries,
            fuel_cost_breakdown: { total: totalFuelCost }
        };

        const newSimulation = new Simulation(results);
        await newSimulation.save();

        res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};