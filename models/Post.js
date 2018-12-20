const Sequelize = require('sequelize');
const PostTypes = require('../constants/PostTypes');

const PostModel = {
  tableName: 'post',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    subtitle: Sequelize.TEXT,
    content: Sequelize.TEXT,
    posted: Sequelize.DATE,
    nsfw: Sequelize.BOOLEAN,
    type: Sequelize.ENUM(Object.values(PostTypes)),
  },
};

module.exports = PostModel;
