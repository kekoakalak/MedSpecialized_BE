const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const cors = require('cors'); // Add CORS
const authRoutes = require('./routes/auth'); // Import your auth routes
const app = express();
const userRoutes = require('./routes/users'); // Adjust the path if necessary



// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());


// Enable CORS for all routes for the development phase
// app.use(cors());

// CORS configuration for development (allowing Authorization header)
const corsOptions = {
    origin: 'http://localhost:8080',  // Adjust if your frontend URL differs
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow Authorization header
    credentials: true,  // Allow credentials if you're using cookies or sessions
};

// Enable CORS with the options for specific origins and headers
app.use(cors(corsOptions));  // Apply CORS configuration

app.get('/test', (req, res) => {
    res.send("Test route is working");
  });
  
// Routes
console.log("Setting up authentication routes");
app.use('/api/auth', authRoutes); // Use the auth routes here
app.use('/api/users', require('./routes/users'));
app.use('/api', userRoutes); // Ensure this line is correctly routing API requests



// Function to set up the default admin user
const setupDefaultAdmin = async () => {
    try{
        const adminExists = await User.findOne({email: 'admin@meditab.com'});
        if (!adminExists){
            const hashedPassword = await bcrypt.hash('admin123', 10);
            // Set adminUser credentials if it doesnt exist
            const adminUser = new User({
                email: 'admin@meditab.com',
                password: hashedPassword,
                name: 'Admin User',
                role: 'Admin',
                status: 'Active',
            });
            await adminUser.save(); //Save credentials in db
            console.log('Default admin user created for Medspecialized');
        }
    }catch (error){
        console.error('Error creating default admin', error);
    }
};

// Connect to MongoDB and set up the default admin user
//connect to mongodb
connectDB().then(() => {

    setupDefaultAdmin(); // Call the function to create the default admin user
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
}).catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
})


