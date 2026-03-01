const express = require('express');
const router = express.Router();

let customers = [
  { id: 1, name: "Fatima", licenseNumber: "ABC12345" },
  { id: 2, name: "Said", licenseNumber: "XYZ67890" }
];

// GET all customers
router.get('/', (req, res) => {
  res.json({ service: "customer-service", data: customers });
});

// GET single customer
router.get('/:id', (req, res) => {
  const customer = customers.find(c => c.id == req.params.id);

  if (!customer) {
    return res.status(404).json({ error: `Customer ${req.params.id} not found` });
  }

  res.json({ service: "customer-service", data: customer });
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: "UP", service: "customer-service" });
});

module.exports = router;