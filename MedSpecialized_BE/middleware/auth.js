const jwt = require('jsonwebtoken');

//Initialize header for authentication
const auth = (req, res, next) => {
    // Extract the token from the 'Authorization' header, removing the 'Bearer ' prefix
    const token = req.header('Authorization')?.replace(/^Bearer /, '');

    // Check if the token is missing
    if (!token){
        return res.status(401).json({message: 'No token!, Authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the JWT_SECRET from environment variables

        req.user = decoded;    // Attach the decoded user data (e.g., user ID and role) to the request object
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