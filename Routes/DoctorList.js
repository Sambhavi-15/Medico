const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');





router.get('/', async (req, res) => {
    const { specialty } = req.query;
  
    try {
      // Fetch users with the specified specialty from the database
      const doctors = await User.find({ userType: 'doctor', speciality: specialty });
  
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  module.exports = router;