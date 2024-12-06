const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get only matched user IDs for a user
router.get('/matches/:userId', async (req, res) => {
  const client = await pool.connect();
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    // Get only matched_user_id from matches table
    const matches = await client.query(`
      SELECT matched_user_id
      FROM matches
      WHERE user_id = $1
      ORDER BY match_score DESC
      LIMIT $2;
    `, [userId, limit]);

    return res.json({
      success: true,
      data: {
        matched_users: matches.rows.map(match => match.matched_user_id),
        total: matches.rows.length
      }
    });

  } catch (error) {
    console.error('Error getting matches:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  } finally {
    client.release();
  }
});

module.exports = router; 