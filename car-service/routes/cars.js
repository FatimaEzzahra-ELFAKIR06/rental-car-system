const express = require('express');
const router = express.Router();

let cars = [
  { id: 1, model: "Toyota Corolla", dailyRate: 50, available: true },
  { id: 2, model: "BMW X5", dailyRate: 120, available: true },
  { id: 3, model: "Audi A3", dailyRate: 90, available: false }
];

// GET all cars
router.get('/', (req, res) => {
  res.json({ service: "car-service", data: cars });
});

// GET single car
router.get('/:id', (req, res) => {
  const car = cars.find(c => c.id == req.params.id);
  if (!car) {
    return res.status(404).json({ error: `Car ${req.params.id} not found` });
  }
  res.json({ service: "car-service", data: car });
});

router.get('/health', (req, res) => {
  res.json({ status: "UP", service: "car-service" });
});

module.exports = router;