const express = require('express');
const router = express.Router();

let cars = [
  { id: 1, model: "Toyota Corolla", dailyRate: 50, available: true },
  { id: 2, model: "BMW X5", dailyRate: 120, available: true },
  { id: 3, model: "Audi A3", dailyRate: 90, available: true },
  { id: 4, model: "Mercedes C200", dailyRate: 110, available: true },
  { id: 5, model: "Ford Focus", dailyRate: 45, available: true },
  { id: 6, model: "Hyundai Tucson", dailyRate: 70, available: true },
  { id: 7, model: "Kia Sportage", dailyRate: 75, available: true },
  { id: 8, model: "Peugeot 208", dailyRate: 40, available: true },
  { id: 9, model: "Renault Clio", dailyRate: 38, available: true },
  { id: 10, model: "Volkswagen Golf", dailyRate: 65, available: false },
  { id: 11, model: "Skoda Octavia", dailyRate: 60, available: true },
  { id: 12, model: "Tesla Model 3", dailyRate: 150, available: true },
  { id: 13, model: "Nissan Qashqai", dailyRate: 72, available: true },
  { id: 14, model: "Honda Civic", dailyRate: 55, available: true },
  { id: 15, model: "Mazda CX-5", dailyRate: 85, available: true }
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