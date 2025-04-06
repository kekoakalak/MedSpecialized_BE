const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require ('../models/User');
const { auth, adminOnly } = require('../middleware/auth');


//Get all users (admin only)
router.get('/', auth, adminOnly, async (req, res) => {
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

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            email,
            hashedPassword,
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
router.put('/:id', auth, adminOnly, async (req, res) => {

    const { email, password, name, role, status } = req.body;

    try{
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && !validator.isEmail(email)){
            return res.status(400).json({ message: 'Invalid email' });
        }

        user.email = email || user.email;
        user.name = name || user.name;
        user.role = role || user.role;
        user.status = status || user.status;
        if(password){
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: 'User updated successfully' });

    }catch(error) {
        res.status(500).json({ message: 'Server error' });
    }

});