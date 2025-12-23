const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const problemRoutes = require('./routes/problems');
const projectRoutes = require('./routes/projects');
const mentorRoutes = require('./routes/mentors');
const userRoutes = require('./routes/users');

app.use('/api/problems', problemRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/users', userRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Welcome to ProjNavigator API');
});

// Database connection test route
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected successfully', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
