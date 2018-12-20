const Sequelize = require('sequelize');

const SitePropsModel = {
  tableName: 'site',
  schema: {
    siteTitle: Sequelize.STRING,
    siteDescription: Sequelize.TEXT,
  },
};

module.exports = SitePropsModel;
