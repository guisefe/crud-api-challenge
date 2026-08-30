const dotenv = require('dotenv');

const app = require('./app');
const connectDB = require('./config/db');

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

function validateConfiguration() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters');
  }
}

async function start() {
  validateConfiguration();
  await connectDB();
  return app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Unable to start the API:', error.message);
    process.exit(1);
  });
}

module.exports = { start, validateConfiguration };
