const { pool, checkDbInitialized, initDb } = require('./db');

// Convert text answers to embedding vector
const textToEmbedding = (answers) => {
  const vectorDimensions = 10; // One dimension per question type
  const vector = new Array(vectorDimensions).fill(0);

  // Weight factors for different answer types
  const weights = {
    interests: 1.5,        // Higher weight for interests
    partner_qualities: 1.3, // Important for matching
    free_time_preference: 1.0,
    long_term_goals: 1.2,
    conflict_handling: 1.1,
    ideal_date: 0.8,
    physical_attraction: 0.9,
    communication_style: 1.2,
    family_role: 1.0,
    marriage_views: 1.4    // Higher weight for important life views
  };

  // Convert answers to normalized vector components
  Object.entries(answers).forEach(([field, value], index) => {
    if (value) {
      const answerValues = value.split(', ');
      // Create a normalized component for this answer dimension
      const component = answerValues.reduce((sum, answer) => {
        // Create a deterministic value between 0 and 1 for each answer
        let hash = 0;
        for (let i = 0; i < answer.length; i++) {
          hash = ((hash << 5) - hash) + answer.charCodeAt(i);
          hash = hash & hash;
        }
        return sum + (Math.abs(hash) / (2 ** 32));
      }, 0) / answerValues.length;

      // Apply field weight
      vector[index] = component * (weights[field] || 1.0);
    }
  });

  // Normalize the final vector
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  const normalizedVector = vector.map(v => magnitude ? v / magnitude : 0);
  
  // Format vector for PostgreSQL: [x,y,z,...]
  return `[${normalizedVector.join(',')}]`;
};

// Process a single survey response
const processSurveyResponse = async (client, surveyResponse) => {
  const {
    id,
    user_id,
    interests,
    partner_qualities,
    free_time_preference,
    long_term_goals,
    conflict_handling,
    ideal_date,
    physical_attraction,
    communication_style,
    family_role,
    marriage_views
  } = surveyResponse;

  try {
    // Create embedding vector from answers
    const answers = {
      interests,
      partner_qualities,
      free_time_preference,
      long_term_goals,
      conflict_handling,
      ideal_date,
      physical_attraction,
      communication_style,
      family_role,
      marriage_views
    };

    const embedding = textToEmbedding(answers);

    // Update survey_responses with embedding vector
    await client.query(
      `UPDATE survey_responses 
       SET response_vector = $1::vector 
       WHERE id = $2`,
      [embedding, id]
    );

    // Find similar profiles using vector similarity
    const similarProfiles = await client.query(`
      WITH user_interests AS (
        SELECT unnest(string_to_array($2, ', ')) AS interest
      )
      SELECT 
        sr.user_id,
        sr.interests,
        1 - (sr.response_vector <=> $1::vector) as similarity,
        array(
          SELECT ui.interest 
          FROM user_interests ui 
          WHERE ui.interest = ANY(string_to_array(sr.interests, ', '))
        ) as common_interests
      FROM survey_responses sr
      WHERE sr.user_id != $3
        AND sr.response_vector IS NOT NULL
      ORDER BY sr.response_vector <=> $1::vector
      LIMIT 50
    `, [embedding, interests || '', user_id]);

    // Update matches table with vector-based similarities
    for (const match of similarProfiles.rows) {
      await client.query(`
        INSERT INTO matches (
          user_id,
          matched_user_id,
          match_score,
          vector_similarity,
          common_interests
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id, matched_user_id) 
        DO UPDATE SET
          match_score = $3,
          vector_similarity = $4,
          common_interests = $5,
          created_at = CURRENT_TIMESTAMP
      `, [
        user_id,
        match.user_id,
        match.similarity * 100,
        match.similarity,
        match.common_interests
      ]);
    }

    console.log(`Updated matches for user ${user_id}`);

  } catch (error) {
    console.error(`Error processing survey response ${id}:`, error);
    throw error;
  }
};

// Main worker function
const processUnvectorizedResponses = async () => {
  const client = await pool.connect();
  
  try {
    console.log('Worker started processing survey responses...');

    // Get unprocessed responses
    const result = await client.query(`
      SELECT * FROM survey_responses 
      WHERE response_vector IS NULL 
      ORDER BY timestamp ASC
    `);

    console.log(`Found ${result.rows.length} unprocessed responses`);

    // Process each response
    for (const response of result.rows) {
      try {
        await processSurveyResponse(client, response);
        console.log(`Processed survey response for user: ${response.user_id}`);
      } catch (error) {
        console.error(`Error processing survey response for user ${response.user_id}:`, error);
      }
    }

    console.log('Finished processing survey responses');

  } catch (error) {
    console.error('Worker error:', error);
  } finally {
    client.release();
  }
};

// Run worker every minute
const startWorker = async () => {
  try {
    // Check if DB is initialized
    const isInitialized = await checkDbInitialized();
    if (!isInitialized) {
      console.log('Database not initialized. Initializing...');
      await initDb();
    }

    console.log('Starting survey processing worker...');
    setInterval(processUnvectorizedResponses, 60000);
    processUnvectorizedResponses(); // Run immediately on start
  } catch (error) {
    console.error('Failed to start worker:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startWorker();
} else {
  module.exports = {
    startWorker,
    processUnvectorizedResponses
  };
} 