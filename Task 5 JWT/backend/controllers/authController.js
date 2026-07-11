const validator = require('validator');
const User = require('../models/User');
const validatePassword = require('../utils/validatePassword');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const isProduction = process.env.NODE_ENV === 'production';

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction, // requires HTTPS in production
  sameSite: 'strict',
  path: '/api/auth', // scope the cookie to auth routes only
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, keep in sync with JWT_REFRESH_EXPIRES_IN
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // --- Basic presence validation ---
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are all required' });
    }

    // --- Email format validation ---
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    // --- Password strength validation ---
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ success: false, message: passwordCheck.message });
    }

    // --- Email uniqueness check ---
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }

    // Password is hashed automatically by the pre-save hook in the User model.
    const user = await User.create({ name: name.trim(), email, password });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user, // toJSON() on the model strips the password hash
        accessToken,
      },
    });
  } catch (error) {
    // Handle race-condition duplicate key errors from the unique index
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }
    console.error('Signup error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error during signup' });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and issue tokens
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Explicitly select password since the schema excludes it by default.
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    // Use a generic message for both "no user" and "wrong password" to avoid
    // leaking which emails are registered (user enumeration protection).
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Log out the current user: clears the refresh cookie AND bumps
 *          tokenVersion so any previously-issued access tokens are invalidated
 *          immediately (rather than staying valid until they naturally expire).
 * @access  Private (requires valid access token)
 */
const logout = async (req, res) => {
  try {
    req.user.tokenVersion += 1;
    await req.user.save();

    res.clearCookie('refreshToken', { path: '/api/auth' });

    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error during logout' });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Example protected route returning the authenticated user's profile
 * @access  Private
 */
const getMe = async (req, res) => {
  return res.status(200).json({ success: true, data: { user: req.user } });
};

module.exports = { signup, login, logout, getMe };
