const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Create new user and save to database
    user = new User({
      username,
      email,
      password,
      phoneNumber,
    });

    await user.save();

    // Create and return JWT
    const token = jwt.sign({ id: user._id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });
    res.status(201).send({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
