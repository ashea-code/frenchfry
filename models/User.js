const Sequelize = require('sequelize');

const User = {
  tableName: 'user',
  schema: {
    email: Sequelize.STRING,
    displayname: Sequelize.STRING,
    passwordHash: Sequelize.STRING,
    username: Sequelize.STRING,
    birthday: Sequelize.DATE,
  },
};

module.exports = User;
