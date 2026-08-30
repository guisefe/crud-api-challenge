const cors = require('cors');
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '32kb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'crud-api-challenge' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
