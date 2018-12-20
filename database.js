const Sequelize = require('sequelize');

const User = require('./models/User');

class Database {
  constructor(databasePath = 'frenchfry-data.sqlite') {
    this.database = new Sequelize({
      dialect: 'sqlite',
      storage: databasePath,
      operatorsAliases: false,
    });
  }

  runMigration() {
    this.database.define(User.tableName, User.schema);
    this.database.sync();
  }
}

module.exports = Database;
