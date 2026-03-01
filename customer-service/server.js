const express = require('express');
const logger = require('./middleware/logger');
const customerRoutes = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(logger);

app.use('/customers', customerRoutes);

app.get('/health', (req, res) => {
  res.json({ status: "UP", service: "customer-service" });
});

app.listen(PORT, () => {
  console.log(`Customer Service running on port ${PORT}`);
});