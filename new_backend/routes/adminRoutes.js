// File: routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Reservation = require('../models/reservation');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      adminId: admin.adminId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all reservations (admin only)
router.get('/reservations', async (req, res) => {
  try {
    const { adminId, password } = req.query;

    // Verify admin credentials
    const admin = await Admin.findOne({ adminId });
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    // Get all reservations
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;