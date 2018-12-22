const Sequelize = require('sequelize');

const TagModel = {
  tableName: 'tag',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { unique: true, type: Sequelize.STRING },
    nsfw: Sequelize.BOOLEAN,
  },
};

module.exports = TagModel;
