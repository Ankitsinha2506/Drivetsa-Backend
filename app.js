import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

export default app;
