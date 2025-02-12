const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticateToken;
// In the above code, we define a middleware function authenticateToken that checks if the request has a valid JWT token in the Authorization header. If the token is valid, the user object is added to the request object and the next middleware function is called. If the token is invalid, an error message is sent back to the client.