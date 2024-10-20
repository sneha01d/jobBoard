const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// User routes
app.use('/api/users', userRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('JobHub API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
