Rental Car System – Cloud Native Backend

1.Project Overview

This project is a cloud-native backend system for a rental car platform.
It is built using a microservices architecture and Docker.

The system contains three independent services:

Car Service

Customer Service

Rental Service

An API Gateway (Nginx) is used as a single entry point.

The Rental Service integrates with Firebase Firestore for persistent data storage.


2.System Architecture

The system is composed of:

Car Service (Port 3001)
Manages car data and availability.

Customer Service (Port 3002)
Manages customer data.

Rental Service (Port 3003)
Creates rentals, validates customers and cars, and stores rental data in Firestore.

API Gateway (Port 8080)
Routes all external requests to the appropriate service.

Important:

When running with Docker, you do NOT access ports 3001, 3002, or 3003 directly.

All requests must go through:

http://localhost:8080

The API Gateway forwards requests internally to the correct service.


3.Cloud Integration

The Rental Service uses Firebase Firestore as a cloud database.

Rental data is stored in Firestore so that data remains available even if containers are restarted.

This demonstrates externalized state and stateless container design.


4.Correlation ID

The API Gateway generates a unique X-Correlation-ID for each incoming request.

This ID is forwarded to all services and logged in each service.

This allows request tracing across multiple services.


5.How to Run the Project

Step 1 – Clone the repository

git clone <https://github.com/FatimaEzzahra-ELFAKIR06/rental-car-system>
cd rental-car-system

Step 2 – Add Firebase credentials

Place your serviceAccountKey.json file inside:

rental-service/

This file is not included in the repository for security reasons.

Step 3 – Run with Docker

docker-compose up --build

Step 4 – Access the system

All API requests must go through:

http://localhost:8080


6.Example API Requests

Gateway health check:

GET http://localhost:8080/gateway/health

List cars:

GET http://localhost:8080/cars

List customers:

GET http://localhost:8080/customers

Create rental:

POST http://localhost:8080/rentals

Body:

{
"carId": 2,
"customerId": 2,
"rentalDays": 7
}


7.Technologies Used

- Node.js (Express)

- Nginx

- Docker and Docker Compose

- Firebase Firestore

- Postman