const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');


// Login route
router.post('/login', async (req, res) => {
    console.log('Login request received'); // Log to check if the request is being made
    const { email, password } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
        console.log('Auth route hit');
        console.log('Invalid email format:', email); // Log invalid email format
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        // Check if user exists
        console.log('Auth route hit');
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email); // Log if user is not found
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Log the hashed password and the entered password for debugging
        console.log('Entered password:', password);
        console.log('Stored hashed password:', user.password);

        // Compare the hashed password with the entered password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for user:', email); // Log password mismatch
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1hr' }
        );

        // Send the token and user details back to the client
        res.json({
            token,
            user: { id: user._id, email: user.email, role: user.role },
        });
    } catch (error) {
        // Log any unexpected errors during the process
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
