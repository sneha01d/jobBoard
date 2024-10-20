router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});
