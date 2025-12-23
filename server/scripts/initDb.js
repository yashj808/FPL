const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const runSqlFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  // MySQL driver doesn't support multiple statements in one query by default unless configured.
  // But we can split by semicolon.
  const statements = sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  for (const statement of statements) {
    await pool.query(statement);
  }
};

const initDb = async () => {
  try {
    console.log('Initializing database...');
    // Enable multiple statements for the connection pool if needed,
    // or just run them one by one as implemented above.

    await runSqlFile(path.join(__dirname, '../database/schema.sql'));
    console.log('Schema created.');

    await runSqlFile(path.join(__dirname, '../database/seed.sql'));
    console.log('Seed data inserted.');

    console.log('Database initialization complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

initDb();
