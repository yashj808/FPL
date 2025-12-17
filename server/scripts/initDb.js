const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const runSqlFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  await pool.query(sql);
};

const initDb = async () => {
  try {
    console.log('Initializing database...');
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
