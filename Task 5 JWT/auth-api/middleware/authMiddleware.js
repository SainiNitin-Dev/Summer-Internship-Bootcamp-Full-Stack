const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Verifies the JWT access token sent in the Authorization header
 * (format: "Bearer <token>") and attaches the authenticated user to req.user.
 *
 * Rejects the request if:
 *  - no token is provided
 *  - the token is invalid or expired
 *  - the user no longer exists
 *  - the token's tokenVersion doesn't match the user's current tokenVersion
 *    (this is what makes logout / token invalidation actually work)
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired, please log in again' });
      }
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
    }

    if (user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({ success: false, message: 'Token has been invalidated, please log in again' });
    }

    req.user = user; // full user document (password excluded via select:false)
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
};

module.exports = { protect };
