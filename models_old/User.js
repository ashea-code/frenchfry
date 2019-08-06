const Sequelize = require('sequelize');

const UserModel = {
  tableName: 'user',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { unique: true, type: Sequelize.STRING },
    displayname: Sequelize.STRING,
    passwordHash: Sequelize.STRING,
    username: { unique: true, type: Sequelize.STRING },
  },
};

module.exports = UserModel;
