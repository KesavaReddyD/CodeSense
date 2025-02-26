// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
// import questionRoutes from './routes/question.js';
// import submissionRoutes from './routes/submission.js';

// Initialize Express app
const app = express();

const corsconfig = {
  origin: "http://localhost:5173",
  credentials: true
}

// Middleware
app.use(cors( corsconfig )); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use('/api/auth', authRouter); // Authentication routes
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

export default app;
