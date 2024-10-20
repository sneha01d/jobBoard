const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock user data (replace this with your database)
let users = [];

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '30d' });
};

// User Registration
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and add to the "database"
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    // Respond with a JWT
    res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id),
    });
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find((user) => user.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid email or password' });
    }
};

// Get User Profile (Protected Route)
exports.getUserProfile = (req, res) => {
    const user = users.find((user) => user.id === req.user.id);
    if (user) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
