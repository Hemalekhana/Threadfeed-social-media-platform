const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from the request header
    const authHeader = req.header('Authorization');
    console.log("Received Token:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied, No token Provided" });
    }

    // Extract the token after "Bearer "
    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
