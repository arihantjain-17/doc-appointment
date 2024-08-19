const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Changed to lowercase
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer token"

  if (token == null) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    
    req.user = user; // Attach user information to the request object
    next();
  });
};

module.exports = authMiddleware;
 