const Sequelize = require('sequelize');

const CollectionModel = {
  tableName: 'collection',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    subtitle: Sequelize.STRING,
  },
};

module.exports = CollectionModel;
