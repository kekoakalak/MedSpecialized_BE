const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the MONGO_URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            connectTimeoutMS: 10000,  // Set a 10-second timeout for the initial connection attempt
            socketTimeoutMS: 45000,   // Set a 45-second timeout for socket inactivity
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
