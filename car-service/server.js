const express = require('express');
const logger = require('./middleware/logger');
const carRoutes = require('./routes/cars');

const app = express();

//  Environment variable (required by midterm)
const PORT = process.env.PORT || 3001;

//  Middleware
app.use(express.json());
app.use(logger);

//  Mount routes
app.use('/cars', carRoutes);

//  Root health check
app.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "car-service"
  });
});

//  Start server
app.listen(PORT, () => {
  console.log(`Car Service running on port ${PORT}`);
});
