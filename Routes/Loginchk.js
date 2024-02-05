// Routes/Loginchk.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path based on your project structure

// POST /login - Handle user login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user with the provided email in the database
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({ message: 'Login successful', userId: user._id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
