const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/:speciality', async (req, res) => {
    const speciality = req.params.speciality;
  
    try {
      // Fetch users with the specified specialty from the database
      const doctors = await User.find({ userType: 'doctor', speciality: speciality });
  
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Fetch user information based on user ID (replace with your actual logic)
      const user = await User.findById(userId);
  
      if (user) {
        res.json({
          name: user.name,
          email: user.email,
          contact: user.contact,
          userType: user.userType,
          speciality: user.speciality,
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  


  module.exports = router;