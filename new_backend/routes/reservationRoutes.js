// File: routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Create a new reservation
router.post('/send', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, date, time } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields'
      });
    }

    // code for time checking


    // Create reservation
    const newReservation = await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: newReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;