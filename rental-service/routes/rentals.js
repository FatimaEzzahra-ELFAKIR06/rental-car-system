const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const path = require('path');

const router = express.Router();

// //  Environment variables (required by midterm)
// const CAR_SERVICE_URL = process.env.CAR_SERVICE_URL;
// const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL;

const CAR_SERVICE_URL = process.env.CAR_SERVICE_URL || "http://localhost:3001";
const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || "http://localhost:3002";

//  Initialize Firebase
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//  POST /rentals
router.post('/', async (req, res) => {
  const { carId, customerId, rentalDays } = req.body;

  // Input validation
  if (!carId || !customerId || !rentalDays || rentalDays <= 0) {
    return res.status(400).json({
      service: "rental-service",
      error: "Invalid rental input data"
    });
  }

  try {
    //  Validate customer exists
    const customerResponse = await axios.get(
      `${CUSTOMER_SERVICE_URL}/customers/${customerId}`
    );

    //  Validate car exists
    const carResponse = await axios.get(
      `${CAR_SERVICE_URL}/cars/${carId}`
    );

    const car = carResponse.data.data;

    //  Check availability
    if (!car.available) {
      return res.status(409).json({
        service: "rental-service",
        error: "Car is not available"
      });
    }

    const totalPrice = car.dailyRate * rentalDays;

    const rental = {
      carId,
      customerId,
      rentalDays,
      totalPrice,
      createdAt: new Date().toISOString()
    };

    //  Save in Firestore
    await db.collection("rentals").add(rental);

    return res.status(201).json({
      service: "rental-service",
      message: "Rental created successfully",
      data: rental
    });

  } catch (error) {

    if (error.response?.status === 404) {
      return res.status(404).json({
        service: "rental-service",
        error: "Car or Customer not found"
      });
    }

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        service: "rental-service",
        error: "Dependent service unavailable"
      });
    }

    return res.status(500).json({
      service: "rental-service",
      error: "Rental processing failed",
      detail: error.message
    });
  }
});

//  Health endpoint
router.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "rental-service"
  });
});

module.exports = router;