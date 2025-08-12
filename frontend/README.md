GreenCart Logistics - Delivery Simulation & KPI Dashboard
This project is a full-stack web application . It serves as an internal tool for "GreenCart Logistics" managers to simulate delivery operations and analyze the impact of various factors on company KPIs like profit and efficiency.

# 🚀 Live Links
Live Frontend URL: (https://green-cart-logistics-hazel.vercel.app/login)

Live Backend URL: (https://greencart-logistics-2-1ell.onrender.com)

Walkthrough Video: (Https://drive.google.com/file/d/1m9eG83dI6WHRruOk8aOrTzcZxu5UifBL/view?usp=drivesdk)

# 🛠️ Tech Stack
This project was built using the MERN stack and other modern web technologies.

Backend: Node.js, Express.js

Frontend: React (with Vite), Tailwind CSS

Database: MongoDB (cloud-hosted on MongoDB Atlas)

Authentication: JSON Web Tokens (JWT)

Charting Library: Chart.js with react-chartjs-2

API Testing: Postman

Deployment:

Backend deployed on Render.

Frontend deployed on Vercel.

# ⚙️ Local Setup and Running the Project
Follow these instructions to get the project running on your local machine.

Prerequisites
Node.js (v18 or later recommended)

npm

A free MongoDB Atlas account

1. Backend Setup
First, set up the server which powers the application.

 1. Clone the repository
git clone [Your GitHub Repository URL]
cd GreenCart_Logistics

 2. Navigate to the backend directory
cd backend

 3. Install dependencies
npm install

 4. Create the .env file (see Environment Variables section below)

 5. Seed the database with initial data from the CSV files
npm run seed

 6. Start the development server
npm run dev

The backend will be running on http://localhost:5000.

2. Frontend Setup
Next, set up the client-side React application.

 1. Navigate to the frontend directory from the root
cd frontend

 2. Install dependencies
npm install

 3. Start the Vite development server
npm run dev

The frontend will open and run on http://localhost:5173 (or another available port).

🔑 Environment Variables
The backend requires a .env file to store sensitive credentials. Create this file in the /backend directory.

 MongoDB Connection String from your Atlas Cluster
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/greencart?retryWrites=true&w=majority

 A long, random string for signing JWTs
JWT_SECRET=your_super_secret_jwt_key_that_is_long_and_secure

 The port the server will run on
PORT=5000

☁️ Deployment
This project is deployed as two separate services:

Backend (Render): The Node.js/Express server is deployed as a "Web Service" on Render. The Root Directory is set to ./backend, and the Start Command is npm start. Environment variables are configured in the Render dashboard.

Frontend (Vercel): The React/Vite application is deployed on Vercel. The Root Directory is set to ./frontend. A VITE_API_BASE_URL environment variable is set in the Vercel dashboard to point to the live Render backend URL.

📄 API Documentation
Here are the key API endpoints. All protected routes require a Bearer Token in the Authorization header.

Auth
POST /api/auth/register - Register a new manager account.

POST /api/auth/login - Log in to receive a JWT.

Example: Login Request

POST /api/auth/login
Content-Type: application/json

{
    "email": "manager@greencart.com",
    "password": "a_very_strong_password"
}

Simulation
POST /api/simulation/run - (Protected) Executes the core simulation logic based on the initial data.

Example: Simulation Request

POST /api/simulation/run
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "num_drivers": 10,
    "start_time": "09:00",
    "max_hours_per_day": 8
}

Example: Simulation Response

{
    "total_profit": 54321.00,
    "efficiency_score": "92.00",
    "on_time_deliveries": 46,
    "late_deliveries": 4,
    "fuel_cost_breakdown": {
        "total": 7890
    }
}

CRUD Operations
Standard CRUD endpoints are available for /api/drivers, /api/routes, and /api/orders. They support GET, POST, PUT, and DELETE methods and are protected routes.