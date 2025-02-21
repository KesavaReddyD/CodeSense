// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
// const authRoutes = require('./routes/auth');
// const questionRoutes = require('./routes/question');
// const submissionRoutes = require('./routes/submission');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
// app.use('/api/auth', authRoutes); // Authentication routes
// app.use('/api/questions', questionRoutes); // Question-related routes
// app.use('/api/submissions', submissionRoutes); // Submission-related routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;