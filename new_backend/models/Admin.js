// File: models/Admin.js
require('dotenv').config();
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Initialize with the admin credentials from .env
const Admin = mongoose.model('Admin', adminSchema);

// Add the default admin if it doesn't exist
const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ adminId: process.env.ADMIN_ID });
    if (!adminExists) {
      await Admin.create({
        adminId: process.env.ADMIN_ID,
        password: process.env.ADMIN_PASSWORD
      });
      console.log('Default admin created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

initializeAdmin();

module.exports = Admin;