const express = require('express');
const router = express.Router();
const { pool } = require('../db');

const questionToColumnMap = {
  0: 'interests',
  1: 'partner_qualities',
  2: 'free_time_preference',
  3: 'long_term_goals',
  4: 'conflict_handling',
  5: 'ideal_date',
  6: 'physical_attraction',
  7: 'communication_style',
  8: 'family_role',
  9: 'marriage_views'
};

// create a ping pong route
router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post('/store', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { userId, answers, timestamp } = req.body;

    // Validate required fields
    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body format'
      });
    }

    // Convert answers array to ordered values matching our prepared statement
    const answerValues = new Array(Object.keys(questionToColumnMap).length).fill(null);
    answers.forEach(answer => {
      if (answer.selectedOptions && answer.selectedOptions.length > 0) {
        const columnIndex = answer.questionId;
        if (columnIndex >= 0 && columnIndex < answerValues.length) {
          // Join multiple selected options with comma
          answerValues[columnIndex] = answer.selectedOptions
            .map(option => option.text)
            .join(', ');
        }
      }
    });

    // Build the query dynamically
    const columnNames = Object.values(questionToColumnMap);
    const placeholders = columnNames.map((_, idx) => `$${idx + 3}`);
    
    const queryText = {
      text: `
        INSERT INTO survey_responses (
          user_id, 
          timestamp, 
          ${columnNames.join(', ')}
        ) 
        VALUES ($1, $2, ${placeholders.join(', ')})
        RETURNING id;
      `,
      values: [userId, timestamp, ...answerValues]
    };

    // Execute the query with the query object
    const result = await client.query(queryText);

    return res.status(201).json({
      success: true,
      message: 'Survey responses stored successfully',
      data: {
        id: result.rows[0].id,
        userId,
        answers: Object.fromEntries(
          Object.entries(questionToColumnMap).map(([key, column]) => [
            column,
            answerValues[parseInt(key)]
          ])
        ),
        timestamp
      }
    });

  } catch (error) {
    console.error('Error storing survey responses:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message // Adding error message for debugging
    });
  } finally {
    client.release();
  }
});

module.exports = router; 