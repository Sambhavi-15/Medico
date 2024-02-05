// Routes/Signup.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path based on your project structure

// POST /signup - Handle user signup
router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      userType: req.body.userType,
      speciality: req.body.speciality,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
