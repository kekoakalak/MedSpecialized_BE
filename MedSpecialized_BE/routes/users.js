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
        res.status(500).json({message: 'Server error'});
    }

});


//Create a new user (admin only)
router.post('/', auth, adminOnly, async (req, res) => {

    //Set user credential
    const { email, password, name, role, status } = req.body;
    if (!validator.isEmail){
       return res.status(400).json({message: 'Invalid Email Address'});
    } 
    //Check if user already exist
    try{
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({message: 'User already exist'});
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
        res.status(201).json({message: 'User created successfully'}); //OK

    }catch(error) {
        res.status(500).json({message: 'Server Error'});
    } 

});