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

