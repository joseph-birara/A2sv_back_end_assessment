const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Middleware function to authenticate users
const auth = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if the token is present
    if (!token) {
      return res.status(401).send({ error: 'Authorization token missing' });
    }

    // Verify the token
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token data:', data); // Log token data for debugging

    // Find the user associated with the token
    const user = await User.findOne({ _id: data.userId });
    console.log('Found user:', user); // Log the found user for debugging

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Authentication error:', error);

    // Send a 401 Unauthorized response if authentication fails
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

module.exports = auth;
