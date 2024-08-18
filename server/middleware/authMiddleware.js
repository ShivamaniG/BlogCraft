const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const HttpError = require('../models/errorModel'); // Import HttpError model from your error handling file

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new HttpError('Authentication token missing or invalid', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token data to the request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return next(new HttpError('Authentication failed', 401));
    }
};

module.exports = authenticate;
