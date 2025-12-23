const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all problems (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let query = 'SELECT * FROM problems';
    let params = [];
    let conditions = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }
    if (difficulty) {
      conditions.push('difficulty = ?');
      params.push(difficulty);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get problem by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM problems WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
