const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace(`Bearer`, ``);
    if (!token){
        return res.status(401).json({message: 'No token!, Authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({message: 'Token is not valid'});
    }
};

const adminOnly = (req,res,next) => {
    if (req.user.role != 'Admin'){
        return res.status(403).json({message: 'Access denied, Admin only'});
    }
    next();
};

module.exports = {
    auth, 
    adminOnly
};