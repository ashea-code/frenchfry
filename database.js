const Sequelize = require('sequelize');
const logger = require('node-color-log');

const config = require('./config');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: config.databaseFilePath,
  operatorsAliases: false,
  logging: logger.debug.bind(logger),
});

module.exports = database;
