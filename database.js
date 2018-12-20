const Sequelize = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'frenchfry-data.sqlite',
  operatorsAliases: false,
});

module.exports = database;
