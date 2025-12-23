const pool = require('../config/db');

exports.getAllMentors = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mentors');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.bookSession = async (req, res) => {
  try {
    const { mentor_id, project_id, notes } = req.body;

    // In a real app, we would check for availability, but for now just book it.
    const [result] = await pool.query(
      'INSERT INTO mentorship_sessions (mentor_id, project_id, notes, status) VALUES (?, ?, ?, ?)',
      [mentor_id, project_id, notes, 'scheduled']
    );

    res.status(201).json({ message: 'Session booked successfully', sessionId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
