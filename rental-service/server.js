const express = require('express');
const logger = require('./middleware/logger');
const rentalRoutes = require('./routes/rentals');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(logger);

// Mount routes
app.use('/rentals', rentalRoutes);

// Root health
app.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "rental-service"
  });
});

app.listen(PORT, () => {
  console.log(`Rental Service running on port ${PORT}`);
});