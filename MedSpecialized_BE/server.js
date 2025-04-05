const express = require(`express`);
const dotenv = require(`dotenv`);
const connectDB = require (`./config/db`);


// Load environment variables
dotenv.config();

const app = express();

//connect to mongodb
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));