# MedSpecialized_BE

## Project Overview

MedSpecialized_BE is a full-stack web application designed for managing specialized medical data. The project is built with Node.js for the backend and Vue.js for the frontend. This README provides instructions for setting up and running the project, along with testing credentials for login functionality.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (locally or access to MongoDB Atlas for cloud storage)
- Git (for cloning the repository)

## Clone the Repository

To get started, first clone the repository using the following command:

git clone https://github.com/kekoakalak/MedSpecialized_BE.git
Setup Instructions
1. Frontend Setup
Navigate to the frontend directory and install the necessary dependencies:


- cd MedSpecialized_BE/medspecialized_fe
- npm install


To run the frontend server, use the following command:

- npm run serve

The frontend server will run on the following URL:

Local URL: http://localhost:8080/

Network URL: http://192.168.1.7:8080/

2. Backend Setup
Navigate to the backend directory and install the necessary dependencies:


- cd MedSpecialized_BE/MedSpecialized_BE
- npm install
To run the backend server, use the following command:


- npm start

The backend server will run on the following URL:

API Server URL: http://localhost:3000/

You should see the following output when the backend server is running successfully:

Setting up authentication routes
MongoDB connected successfully
Server is running on Port 3000

## API Endpoints
POST /login: Used for logging in.

GET /dashboard: Used for retrieving the dashboard data after authentication.

## Testing Login Credentials
You can test the login functionality with the following credentials:

Email: admin@meditab.com

Password: admin123

To test login functionality, use the /login API endpoint with these credentials.