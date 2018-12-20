const Sequelize = require('sequelize');

const UserModel = {
  tableName: 'user',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    displayname: Sequelize.STRING,
    passwordHash: Sequelize.STRING,
    username: Sequelize.STRING,
    birthday: Sequelize.DATE,
  },
};

module.exports = UserModel;
