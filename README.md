# Plant Nursery Management System

A RESTful API for managing a plant nursery, built with Node.js, Express, and MongoDB.

## Features

- Plants Management (CRUD operations)
- Orders Management
- Error Handling
- Input Validation

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/plant-nursery
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```
   For development with nodemon:
   ```bash
   npm run dev
   ```

## API Endpoints

### Plants
- GET /api/plants - Get all plants
- GET /api/plants/:id - Get single plant
- POST /api/plants - Create new plant (Admin only)
- PUT /api/plants/:id - Update plant (Admin only)
- DELETE /api/plants/:id - Delete plant (Admin only)

### Orders
- GET /api/orders - Get all orders (Admin only)
- POST /api/orders - Create new order
- DELETE /api/orders/:id - Delete order (Admin only)

### Users
- POST /api/users/register - Register new user
- POST /api/users/login - Login user

## Authentication

To access protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token_here>
```

## Environment Variables

- `PORT`: Server port number (default: 5000)
- `MONGO_URI`: MongoDB connection string
