const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const initDb = async () => {
  const client = await pool.connect();
  try {
    // Enable vector extension if not exists
    await client.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

    // Create survey_responses table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        interests TEXT,
        partner_qualities TEXT,
        free_time_preference TEXT,
        long_term_goals TEXT,
        conflict_handling TEXT,
        ideal_date TEXT,
        physical_attraction TEXT,
        communication_style TEXT,
        family_role TEXT,
        marriage_views TEXT,
        response_vector vector(10),
        timestamp TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create basic indexes for survey_responses
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_survey_responses_user_id ON survey_responses(user_id);
      CREATE INDEX IF NOT EXISTS idx_survey_responses_timestamp ON survey_responses(timestamp);
    `);

    // Create matches table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        matched_user_id TEXT NOT NULL,
        match_score FLOAT NOT NULL,
        vector_similarity FLOAT NOT NULL,
        common_interests TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, matched_user_id)
      );
    `);

    // Add vector columns to matches table if they don't exist
    await client.query(`
      DO $$ 
      BEGIN 
        BEGIN
          ALTER TABLE matches ADD COLUMN user_vector vector(10);
        EXCEPTION
          WHEN duplicate_column THEN NULL;
        END;
        
        BEGIN
          ALTER TABLE matches ADD COLUMN matched_user_vector vector(10);
        EXCEPTION
          WHEN duplicate_column THEN NULL;
        END;
      END $$;
    `);

    // Create basic indexes for matches
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_matches_user_id ON matches(user_id);
      CREATE INDEX IF NOT EXISTS idx_matches_score ON matches(match_score DESC);
    `);

    // Create vector indexes after ensuring columns exist
    await client.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_matches_user_vector') THEN
          CREATE INDEX idx_matches_user_vector ON matches USING ivfflat (user_vector vector_cosine_ops);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_matches_matched_vector') THEN
          CREATE INDEX idx_matches_matched_vector ON matches USING ivfflat (matched_user_vector vector_cosine_ops);
        END IF;
      END $$;
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Function to check if DB is initialized
const checkDbInitialized = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'survey_responses'
      );
    `);
    return result.rows[0].exists;
  } finally {
    client.release();
  }
};

module.exports = { pool, initDb, checkDbInitialized }; 