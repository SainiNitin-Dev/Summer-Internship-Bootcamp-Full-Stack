const express = require('express');
const rateLimit = require('express-rate-limit');
const { signup, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Basic brute-force protection on auth endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window on these routes
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later' },
});

// Public routes
router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);

// Private routes (require a valid access token)
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
