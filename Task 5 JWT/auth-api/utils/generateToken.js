const jwt = require('jsonwebtoken');

/**
 * Generates a short-lived access token.
 * Payload includes tokenVersion so we can invalidate all outstanding tokens
 * for a user (e.g. on logout-everywhere or password change) by bumping it.
 */
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
}

/**
 * Generates a longer-lived refresh token, stored as an httpOnly cookie.
 */
function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
}

module.exports = { generateAccessToken, generateRefreshToken };
