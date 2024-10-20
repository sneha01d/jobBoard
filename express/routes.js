const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// User login
router.post('/login', loginUser);

// User profile (protected route)
router.get('/profile', protect, getUserProfile);

module.exports = router;
