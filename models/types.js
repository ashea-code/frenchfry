const Sequelize = require('sequelize');
const PropTypes = require('prop-types');

ModelAttributeTypes = {
  STRING: {
    sql: Sequelize.STRING,
    react: PropTypes.string,
   },
  TEXT: {
    sql: Sequelize.TEXT,
    react: PropTypes.string,
  },
  INTEGER: {
    sql: Sequelize.INTEGER,
    react: PropTypes.number,
  },
  FLOAT: {
    sql: Sequelize.FLOAT,
    react: PropTypes.number,
  },
  BOOLEAN: {
    sql: Sequelize.BOOLEAN,
    react: PropTypes.bool,
  },
  DATE: {
    sql: Sequelize.DATE,
    react: PropTypes.string,
  },
  ENUM: {
    sql: Sequelize.ENUM,
    react: PropTypes.string,
  },
};

module.exports = {
  ModelAttributeTypes,
};
