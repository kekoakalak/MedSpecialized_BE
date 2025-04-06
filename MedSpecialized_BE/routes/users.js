const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require ('../models/User');
const { auth, adminOnly } = require('../middleware/auth');


//Get all users 
router.get('/', auth, async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.json(users);

    }catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

});


//Create a new user (admin only)
router.post('/', auth, adminOnly, async (req, res) => {

    //Set user credential
    const { email, password, name, role, status } = req.body;
    if (!validator.isEmail){
       return res.status(400).json({ message: 'Invalid Email Address' });
    } 
    //Check if user already exist
    try{
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); //use bcrypt to hash password
        // initialize user credential values to user obj
        user = new User({
            email,
            password: hashedPassword,
            name,
            role: role || 'Trainee',
            status: status || 'Active',

        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' }); //OK

    }catch(error) {
        res.status(500).json({ message: 'Server Error' });
    } 

});
// Update existing user
router.put('/users/:id', async (req, res) => {
    // Initialize user input 
    const { email, password, name, role, status } = req.body;

    try {
        // Check if user exists
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is valid and if it's different from the current email
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // If email is provided, check if it's unique (make sure no other user has the same email)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }

        // Update user credentials
        user.email = email || user.email;
        user.name = name || user.name;
        user.role = role || user.role;
        user.status = status || user.status;
        
        // Hash password if provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Save updated user data
        await user.save();
        
        res.json({ message: 'User updated successfully', user });

    } catch (error) {
        console.error(error); // Log the error for easier debugging
        res.status(500).json({ message: 'Server error' });
    }
});

//Delete user (admin only)
router.delete('/users/:id', auth, adminOnly, async (req, res) => {
    console.log('Delete request received for user ID:', req.params.id); // Log the ID


    //check if user exist
    try{
        const user = await User.findByIdAndDelete(req.params.id); //search by id

        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove(); //removes user
        res.json({ message: 'User deleted successfully' });

    }catch(error) {
        res.status(500).json({ message: 'Server error' });
    }

});

module.exports = router;