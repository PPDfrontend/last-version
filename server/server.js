// server.js
import express from 'express';
import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);       // for login/register
app.use('/api/search', searchRoutes);   // for doctor search

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
