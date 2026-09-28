import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    serverTime: new Date().toISOString(),
    service: 'School Management System API',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 School Management System API running at http://localhost:${PORT}`);
});
