const Database = require('./database');

// Sync database schema
const db = new Database();
db.runMigration();
