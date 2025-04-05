const express = require(`express`);
const router = express.Router();
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const validator = require(`validator`);
const User = require(`../models/User`);

router.post('/login,', async (req, res) => {
    const {email, password} = req.body;

    //validate email format
    if (!validator.isEmail(email)){
        return res.status(400).json({message: 'Invalid email adress'});
    }

    try{
        //check if user exists
        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        //Generate JWT Token
        const token = jwt.sign(
            {   
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1hr'}
        )

        res.json({token, user: {id: user._id, email: user.email, role: user.role} });

    }catch (error){
        res.status(500).json({message: 'Server error'});
    }

});

module.exports = router;