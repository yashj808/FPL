const pool = require('../config/db');

exports.updateProfile = async (req, res) => {
  try {
    const { user_id, skill_level, domain_interest } = req.body;

    await pool.query(
      'UPDATE users SET skill_level = ?, domain_interest = ? WHERE id = ?',
      [skill_level, JSON.stringify(domain_interest), user_id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if(rows.length === 0) return res.status(404).json({error: 'User not found'});
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
