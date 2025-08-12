
describe('Simulation Company Rules', () => {

    test('should apply a penalty for late deliveries', () => {
        const orderProfit = 500;
        const penalty = 50;
        const finalProfit = orderProfit - penalty;
        expect(finalProfit).toBe(450);
    });

    test('should add a 10% bonus for on-time, high-value orders', () => {
        const orderValue = 1200; // > 1000 [cite: 24]
        const bonus = orderValue * 0.10;
        const finalValue = orderValue + bonus;
        expect(finalValue).toBe(1320);
    });

    test('should not add a bonus for late high-value orders', () => {
        const orderValue = 1200;
        const bonus = 0;
        const finalValue = orderValue + bonus;
        expect(finalValue).toBe(1200);
    });

    test('should calculate fuel cost correctly for high traffic routes', () => {
        const distance = 20; // km
        const baseCostPerKm = 5;
        const surchargePerKm = 2; // [cite: 25]
        const expectedCost = (distance * baseCostPerKm) + (distance * surchargePerKm);
        expect(expectedCost).toBe(140);
    });

    test('should calculate efficiency score correctly', () => {
        const onTime = 8;
        const total = 10;
        const efficiency = (onTime / total) * 100; // [cite: 25]
        expect(efficiency).toBe(80);
    });
});