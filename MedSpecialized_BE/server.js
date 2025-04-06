const express = require(`express`);
const dotenv = require(`dotenv`);
const connectDB = require (`./config/db`);
const User = require('./models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const cors = require('cors'); // Add CORS


// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

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
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
}).catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
})


