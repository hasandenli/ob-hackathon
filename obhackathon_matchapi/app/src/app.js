const express = require('express');
const app = express();
const surveyRoutes = require('./routes/survey');
const matchesRoutes = require('./routes/matches');
const { initDb } = require('./db');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/', surveyRoutes);
app.use('/', matchesRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 